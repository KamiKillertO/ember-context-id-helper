'use strict';

module.exports = {
  extends: 'octane',
  rules: {
    'no-implicit-this': {
      allow: ['context-id']
    },
    'no-curly-component-invocation': {
      allow: ['context-id']
    }
  }
};
