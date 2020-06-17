'use strict';

const {
  LegacyInjectContextTransform,
  InjectContextTransform
} = require('./lib/inject-context');
const VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: require('./package').name,
  setupPreprocessorRegistry(type, registry) {
    if (type !== 'parent') {
      return;
    }
    registry.add('htmlbars-ast-plugin', {
      name: 'inject-context',
      plugin: this._buildAstPlugin()
    });
  },

  _buildAstPlugin() {
    const checker = new VersionChecker(this.project);
    const emberVersion = checker.for('ember-source');
    return emberVersion.gte('3.17.0')
      ? InjectContextTransform
      : LegacyInjectContextTransform;
  }
};
