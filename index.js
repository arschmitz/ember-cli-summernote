/* eslint-env node */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-cli-summernote',

  options: {
    nodeAssets: {
      summernote: {
        vendor: {
          include: ['dist/summernote.js', 'dist/summernote.css'],
          processTree(input) {
            return fastbootTransform(input);
          },
        },
        public: {
          include: [
            'dist/font/summernote.eot',
            'dist/font/summernote.ttf',
            'dist/font/summernote.woff'
          ]
        }

      }
    }
  },

  included: function(app) {
    this._super.included(app);

    var options = app.options['ember-cli-summernote'] || {};  // This options are from the ember-cli-build.js
    var projectConfig = this.project.config(app.env); // This projectConfig is from the consuming app's environment.js
    var config = projectConfig['ember-cli-summernote'] || { lang: 'en-US' };

    // Include Summernote.
    app.import('vendor/summernote/summernote.css');
    app.import('vendor/summernote/summernote.min.js');
    app.import('public/summernote/font/summernote.eot');
    app.import('public/summernote/font/summernote.ttf');
    app.import('public/summernote/font/summernote.woff');

    // Include Summernote Lang file.
    if (config.lang) {
      if (config.lang === 'en-US') {
        return;
      }
      app.import(`vendor/summernote/lang/summernote-${config.lang}.js`);
    }
  }

};
