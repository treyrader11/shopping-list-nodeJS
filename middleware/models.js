'use strict';


var express = require('express');

exports.log = function(request, response, next) {
  console.log("the date is", new Date(), "and this is a", request.method, "method with an endpoint of", request.url);
  next();
}

exports.hello = function(request, response, next) {
  response.write('Hello\n' + 'Trey');
  response.end();
  next();
}

exports.getDate = function(req, res, next) {
  var greeting = "Hey there Trey!\n\n";
  var text = "Today is";
  console.log(greeting, text, new Date());
  next();
}
