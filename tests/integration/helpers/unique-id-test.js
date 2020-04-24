import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, setupOnerror, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { resetOnerror } from '@ember/test-helpers';
import { guidFor } from '@ember/object/internals';


module('Integration | Helper | unique-id', function(hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(function() {
    resetOnerror();
  })

  test('generate a unique id for the context provided', async function(assert) {
    let context = {};
    this.set('context', context);
    await render(hbs`{{unique-id context}}`)
    // guidFor always return the same id for the same input
    let uniqueId = guidFor(context);

    assert.equal(this.element.textContent.trim(), uniqueId);
  })

  test('It generate unique id for template only components', async function(assert) {
    await render(hbs`<TemplateOnlyInput @label="Foo"/>`)

    assert
      .dom('input')
      .hasAttribute('id', /^ember.*/)
  });

  test('Generate an unique for each instance of the same component', async function(assert) {
    await render(hbs`
      <MyInput @label="Foo"/>
      <MyInput @label="Bar"/>
    `);

    assert
      .dom('input')
      .exists({ count: 2 }, 'Two inputs are rendered');
    assert
      .dom('label')
      .exists({ count: 2 }, 'Two label are rendered');
    const inputs = findAll('input');
    const labels = findAll('label');
    assert.notEqual(inputs[0].id, inputs[1].id, 'Inputs have different ids');
    assert
      .notEqual(
        labels[0].getAttribute('for'),
        labels[1].getAttribute('for'),
        'Labels have different ids'
      );
    assert
      .equal(inputs[0].id, labels[0].getAttribute('for'), 'Label "for" attribute has the same value has input "id" attribute');
  })

  test('Require a context', async function(assert) {
    assert.expect(1);

    setupOnerror(function(error) {
      assert
        .equal(error.message, 'Assertion Failed: You must provide a context to `unique-id` helper. Try `{{unique-id this}}`.', 'Error is thrown');
    });

    await render(hbs`{{unique-id}}`)
  })

});
