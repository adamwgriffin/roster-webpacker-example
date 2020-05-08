const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)

// Get the actual sass-loader config
const sassLoader = environment.loaders.get('sass')
const sassLoaderConfig = sassLoader.use.find(function(element) {
  return element.loader == 'sass-loader'
})

// Use Dart-implementation of Sass (default is node-sass)
const options = sassLoaderConfig.options
/* https://github.com/webpack-contrib/sass-loader/issues/804#issuecomment-586095020
webpackImporter: false fixes an issue between dart-sass and sass-loader */
options.webpackImporter = false
options.includePaths = ['./node_modules']
options.implementation = require('sass')
options.fiber = require('fibers')

module.exports = environment
