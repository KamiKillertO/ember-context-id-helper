/* eslint-env node */
'use strict';

/*
  ```hbs
  {{context-id}}
  ```
  becomes
  ```hbs
  {{context-id this}
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

class InjectContextTransform {
  transform(ast) {
    function transformNode(node) {
      if (node.path.original === 'context-id' && node.params.length === 0) {
          node.params.push({
            data: false,
            original: 'this',
            parts: [],
            this: true,
            type: 'PathExpression'
          })
        }
    }

    this.syntax.traverse(ast, {
      SubExpression: transformNode,
      MustacheStatement: transformNode,
    });

    return ast;
  }
}

module.exports = InjectContextTransform
