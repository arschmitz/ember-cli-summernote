/* eslint-env node */
'use strict';

var path = require('path');
var fastbootTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-cli-summernote',

  options: {
    nodeAssets: {
      summernote: {
        vendor: {
          include: [
            'dist/summernote.js',
            'dist/summernote.css',
            'dist/font/summernote.eot',
            'dist/font/summernote.ttf',
            'dist/font/summernote.woff'
          ],
          processTree(input) {
            return fastbootTransform(input);
          },
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
    app.import('vendor/summernote/dist/summernote.css');
    app.import('vendor/summernote/dist/summernote.js');
    app.import('vendor/summernote/dist/font/summernote.eot', { destDir: 'assets/font' });
    app.import('vendor/summernote/dist/font/summernote.ttf', { destDir: 'assets/font' });
    app.import('vendor/summernote/dist/font/summernote.woff', { destDir: 'assets/font' });

    // Include Summernote Lang file.
    if (config.lang) {
      if (config.lang === 'en-US') {
        return;
      }
      app.import(`vendor/summernote/lang/summernote-${config.lang}.js`);
    }
  }

};
