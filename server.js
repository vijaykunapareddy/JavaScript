/**
 * Created by Vijay on 2/24/2017.
 */
var http = require('http');
var module = require('./module1');

http.createServer(module.handleRequest).listen(8000);