import { helper } from '@ember/component/helper';
import { isNone } from '@ember/utils';

class DummyContext {
  constructor() {
    this.dummyId = dummy_context_count++;
  }
}
let dummy_context_count = 0;
/**
 * Gerenate a string `__DUMMY-CONTEXT-X__` if the context provided is none otherwise it return the provided context.
 * The context returned will be used by the `context-id` helper to generate unique ids
 */
export default helper(function(params/*, hash*/) {
  let [context] = params;
  if (isNone(context) === true) {
    return new DummyContext()//`__DUMMY-CONTEXT-${dummy_context_count++}__`
  }
  return context;
});
