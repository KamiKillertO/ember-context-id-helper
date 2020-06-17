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
<label for="{{context-id this}}-input">Input Label</label>
<input id="{{context-id this}}-input" type="text"/>
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
<label for="emberxx1-input">Input Label</label>
<input id="emberxx1-input" type="text"/>
<label for="emberxx2-input">Input Label</label>
<input id="emberxx2-input" type="text"/>
```

By default `context-id` will use a component/template `this` as context but you can also manually provide a context if you want.
A context can be any object, string, number, Element, or primitive, however we recommend not using a string or a number because `context-id` will generate the same id for the same value.
For example if you you modify the previous example like this:

```hbs
// components/my-input.hbs
<label for="{{context-id "my-input"}}-input">Input Label</label>
<input id="{{context-id "my-input"}}-input" type="text"/>
```

All uses of `MyInput` will generate an input with the same id.

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
