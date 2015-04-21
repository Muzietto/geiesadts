
require.config({
  'paths': {
    'mocha': './lib/mocha',
    'chai': './lib/chai',
    'sinon': './lib/sinon-1.11.1'
  },
  shim: {
    'mocha': {
        init: function () {
            this.mocha.setup('bdd');
            return this.mocha;
        }
    }
  }
});

define(['chai', 'mocha'], (function(chai, mocha) {
    require(['./geiesadts_test'], function(require) {
      mocha.run();
    });
}));
