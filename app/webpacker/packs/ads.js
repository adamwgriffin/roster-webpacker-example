/* importing babel polyfill is necessary in order for es6/es7 to work correctly in the project
it's included by default with webpacker.

in the future they will be using babel 7, in which case we will need to change this to
import "@babel/polyfill" instead */
import "@babel/polyfill"
import '../ads/src/main'
