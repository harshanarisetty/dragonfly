module.exports = {
    staticFileGlobs: [
      'build/static/css/**.css',
      'build/static/js/**.js'
    ],
    swFilePath: './build/service-worker.js',
    stripPrefix: 'build/',
    // importScripts: (['./sw.js','./sw-toolbox.js']),
    handleFetch: false
  }