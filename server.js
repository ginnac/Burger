//require packages installed (needed in server.js file):
var express = require("express");
var app = express();
//mysql and handlebars is not going to be be used in this file
//for now i am requiring them here:

var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');