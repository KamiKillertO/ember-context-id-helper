'use strict';

const InjectContextTransform = require('./lib/inject-context');

module.exports = {
  name: require('./package').name,
  setupPreprocessorRegistry(type, registry) {
    if (type !== 'parent') {
      return;
    }
    let optionalFeatures = this.project.addons.find(a => a.name === '@ember/optional-features');
    if (optionalFeatures && optionalFeatures.isFeatureEnabled('template-only-glimmer-components') === false) {
      registry.add('htmlbars-ast-plugin', {
        name: 'inject-context',
        plugin: InjectContextTransform
      });
    }
  }
};
