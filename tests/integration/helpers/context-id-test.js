import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, /*setupOnerror,*/ findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
// import { resetOnerror } from '@ember/test-helpers';
import { guidFor } from '@ember/object/internals';
import Ember from 'ember';

module('Integration | Helper | context-id', function(hooks) {
  setupRenderingTest(hooks);

  // hooks.afterEach(function() {
  //   resetOnerror();
  // })

  test('generate a unique id for the context provided', async function(assert) {
    let context = {};
    this.set('context', context);
    await render(hbs`{{context-id context}}`)
    // guidFor always return the same id for the same input
    let uniqueId = guidFor(context);

    assert.equal(this.element.textContent.trim(), uniqueId);
  })

  test('It generate unique id for template only components', async function(assert) {
    this.owner.register('template:components/foo', hbs`<span id="{{context-id}}-span">Hello world</span>`);
    await render(hbs`<Foo/>`)

    assert
      .dom('span')
      .hasAttribute('id', /^ember[\d]+-span/)
  });

  test('Generate an unique for each instance of the same component', async function(assert) {
    this.owner.register('template:components/foo', hbs`<span id="{{context-id}}-span">Hello world</span>`);
    await render(hbs`<Foo/><Foo/>`);

    assert
      .dom('span')
      .exists({ count: 2 }, 'Two span are rendered');
    const span = findAll('span');
    assert.notEqual(span[0].id, span[1].id, 'Both span have different ids');
  })

  test('Use `this` as context by default', async function(assert) {
    await render(hbs`{{context-id}}`);

    let uniqueId = guidFor(this);
    assert.equal(this.element.textContent.trim(), uniqueId);
  })

  test('Require a non empty context', async function(assert) {
    assert.expect(1);
    // setupOnerror(function(error) {

    Ember.onerror = function(error) {
      assert
        .equal(error.message, 'Assertion Failed: You must provide a context to `context-id` helper. Try `{{context-id this}}`.', 'Error is thrown');
      Ember.onerror = () => {} // onerror is called twice
      // temporary fix see https://github.com/emberjs/ember-test-helpers/issues/768
    }

    await render(hbs`{{context-id this.context}}`)
  })
});
