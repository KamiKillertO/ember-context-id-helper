/* eslint-env node */
'use strict';

/*
  ```hbs
  {{context-id}}
  ```
  becomes
  ```hbs
  {{#let (generate-context this) as |__context__|}}
    {{context-id __context__}
  {{/let}}
  ```

  If context is already provided nothing happen
  ```hbs
  {{context-id context}}
  ```
  becomes
  ```hbs
  {{context-id context}
  ```
*/
function buildTransform(blockType) {
  return class InjectContextTransform {
    transform(ast) {
      let wrapWithGenerateContext = false;
      function transformNode(node) {
        if (node.path.original === 'context-id' && node.params.length === 0) {
          wrapWithGenerateContext = true;
          node.params.push({
            data: false,
            original: '__context__',
            parts: ['__context__'],
            this: false,
            type: 'PathExpression'
          })
        }
      }

      this.syntax.traverse(ast, {
        SubExpression: transformNode,
        MustacheStatement: transformNode,
      });


      if(wrapWithGenerateContext) {
        const originalBody = ast.body;
        ast.body = [{
          type: 'BlockStatement',
          path: {
            type: 'PathExpression',
            original: 'let',
            this: false,
            parts: ['let'],
            data: false,
          },
          params: [{
            type: 'SubExpression',
            path: {
              type: 'PathExpression',
              original: 'generate-context',
              this: false,
              parts: ['generate-context'],
              data: false,
            },
            params: [{
              type: 'PathExpression',
              original: 'this',
              this: true,
              parts: [],
              data: false
            }],
            hash: { type: 'Hash', pairs: [] },
          }],
          hash: { type: 'Hash', pairs: [] },
          program: {
            type: blockType,
            body: originalBody,
            blockParams: ['__context__'],
            chained: false,
          },
          inverse: null,
          openStrip: { open: false, close: false },
          inverseStrip: { open: false, close: false },
          closeStrip: { open: false, close: false },
        }];
      }

      return ast;
    }
  }
}

// ember updated glimmer in 3.17.
// and this glimmer update changed the type from
// 'Program' to 'Block'.
// so we can construct both versions here.
module.exports = {
  LegacyInjectContextTransform: buildTransform('Program'),
  InjectContextTransform: buildTransform('Block'),
}
