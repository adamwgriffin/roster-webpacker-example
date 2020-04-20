# README

An example of having multiple autonomous javascript apps runnning in Rails using webpacker

# Installation

## Requirements
ruby 2.5.1
node 10.17.0
yarn 1.22.4

run `bundle install`

run `yarn install`

cd into app/webpacker

cd into each project you want to work on, i.e., ads, separate_vue, stimulus, and run `yarn install` there to in order to install dependencies for that particular project.

# How to start the server with webpacker
```
rails server
```

For Webpack Dev Server with hot reloading
```
./bin/webpack-dev-server
```

Visit http://localhost:3000/ just like you normally would. Don't visit the port that webpack-dev-server is running on. Webpacker takes care of proxying the appropriate code to webpack-dev-server.

# Gotachas

In Rails 4, which we are using, you have to run commands that are shown in the docs for Webpacker as `rails webpacker` as `rake webpacker` instead.
