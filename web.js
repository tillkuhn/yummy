/* See http://awaxman11.github.io/blog/2014/07/13/how-to-create-an-angular-app-using-yeoman-and-deploy-it-to-heroku/ */
var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
console.log("Serving app, check out http://localhost:"+port+"/index.html#/home");
app.listen(port);
