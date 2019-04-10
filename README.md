# README

An example of having multiple autonomous javascript apps runnning in Rails using webpacker

# How to start the server with webpacker
```
rails server
```

For Webpack Dev Server with hot reloading
```
./bin/webpack-dev-server
```

# Notes

* Importing babel polyfill is necessary in order for es6/es7 to work correctly in the project it's included by default with webpacker. In order to get it working you need to import it within each entry point (pack) like so:
```
import "@babel/polyfill" instead
```
