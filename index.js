'use strict';

const InjectContextTransform = require('./lib/inject-context');

module.exports = {
  name: require('./package').name,
  setupPreprocessorRegistry(type, registry) {
    registry.add('htmlbars-ast-plugin', {
      name: 'inject-context',
      plugin: InjectContextTransform
    });
  }
};
