import { helper } from '@ember/component/helper';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';

export default helper(function(params/*, hash*/) {
  let [context] = params;
  assert('You must provide a context to `context-id` helper. Try `{{context-id this}}`.', isNone(context) === false);
  return guidFor(context);
});
