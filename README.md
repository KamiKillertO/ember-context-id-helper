ember-context-id-helper
==============================================================================

This addon provides an helper `{{context-id}}` that generate a unique for a specified context.
It take inspirations from [this Pre RFC](https://github.com/emberjs/rfcs/issues/612).

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above

Installation
------------------------------------------------------------------------------

```shell
ember install ember-context-id-helper
```

Usage
------------------------------------------------------------------------------

The `{{context-id}}` generates a unique id for a given context. Because it uses the ember [guidFor](https://api.emberjs.com/ember/3.16/functions/@ember%2Fobject%2Finternals/guidFor) function under the hood, it will always return the same id for the same context.
A use case for `context-id` helper is to programmatically associate labels and input element using the label's `for` attribute and the input's `id` attribute.

```hbs
// components/my-input.hbs
<label for={{context-id this}}>Input Label</label>
<input id={{context-id this}} type="text"/>
```

When used in a template the previous component template will render an input and is associated label.

Using the same component multiple times in the same route template (or inside another component) will render multiple inputs and their associated labels. Every input will have a different id and every label will have the `for` attribute fill out with the id of the associated input.

For exemple the folowing code :

```hbs
<MyInput />
<MyInput />
```

Will render

```hbs
<label for="ember-xx1">Input Label</label>
<input id="ember-xx1" type="text"/>
<label for="ember-xx2">Input Label</label>
<input id="ember-xx2" type="text"/>

```

The `context-id` helper require a context to generate the unique id. A context can be any object, string, number, Element, or primitive, however we recommend not using a string or a number because `context-id` will generate the same id for the same value.
For example if you you modify the previous example like this:

```hbs
// components/my-input.hbs
<label for={{context-id "my-input"}}>Input Label</label>
<input id={{context-id "my-input"}} type="text"/>
```

All uses of `MyInput` will generate an input with the same id.

The easiest way to ensure that components (or route templates) using `context-id` doesn't share the same ids, is to provide the helper with the component/template `this` context.

Limitations
------------------------------------------------------------------------------

You cannot use `{{context-id this}}` in template only glimmer components as they don't have a `this` (see [the feature documentation](https://guides.emberjs.com/release/configuring-ember/optional-features/#toc_template-only-glimmer-components)).

Todo
------------------------------------------------------------------------------

* [ ] Implicitely get current context
* [ ] Make it work with template only glimmer component
    (For thoses component `this` is `undefined`)

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
