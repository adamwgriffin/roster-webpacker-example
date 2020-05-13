const { environment } = require('@rails/webpacker')
const merge = require('webpack-merge')
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)

// Use Dart-implementation of Sass (default is node-sass)
const sassLoaderOptions = {
  /* https://github.com/webpack-contrib/sass-loader/issues/804#issuecomment-586095020
  webpackImporter: false fixes an issue between dart-sass and sass-loader */
  webpackImporter: false,
  includePaths: ['./node_modules'],
  implementation: require('sass'),
  fiber: require('fibers')
}
// Get the default webpacker sass-loader config
const sassLoaderConfig = environment.loaders.get('sass').use.find(el => el.loader === 'sass-loader')
sassLoaderConfig.options = merge(sassLoaderConfig.options, sassLoaderOptions)

module.exports = environment
