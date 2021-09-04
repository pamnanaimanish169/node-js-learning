// Import express package
const express   =   require('express');
// Use the express package in a variable.
const   app =   express();

// required for Session
var cookieSession   =   require('cookie-session');
app.use(cookieSession({
    name    :   'session',
    keys    :   ['NodeJs9799530SecretKey515'],
    maxAge  :   365 *   24  *   60  *   60  *   1000
}));

// Configure i18n options, module is used for multi language site 
var i18n            =   require("i18n");
i18n.configure({
    locales :   ['en'],
    defaultLocale   :   'en',
    directory   :   __dirname   +   '/locales',
    directoryPermissions    :   '755',
    autoRealod  :   true,
    updateFiles :   false
});
app.use(i18n.init);

// Set breadcrumbs home information
var breadcrumbs = require('express-breadcrumbs');
app.use(breadcrumbs.init());
app.use(breadcrumbs.setHome());

/** Mount the breadcrumbs at `/admin` */
app.use('/admin', breadcrumbs.setHome({
    name: 'Home',
    url: '/admin'
}));

// Form Input validation
var expressValidator = require('express-validator');
app.use(expressValidator());

/** bodyParser for node js */
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true,
	limit	: '50mb',
    parameterLimit : 1000000
}));
app.use(bodyParser.json());

/**  read cookies (needed for auth) */
var cookieParser = require('cookie-parser');
app.use(cookieParser());

/** Initialize Ejs Layout  */
var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

/** Used for create thumbs of images */
var	qt = require('quickthumb');
app.use('/public/',qt.static(__dirname + '/public',{type:'resize'}));

/** Set publically accessable folder */
// This is used so that only public folder can be used to display over browser
app.use(express.static(__dirname + '/public'));

/** Use to upload files */
var	fileUpload = require('express-fileupload');
app.use(fileUpload());

/**  This module is used for flash messages in the system */
var flash  = require('express-flash');
app.use(flash());

// including .env file
require('dotenv').config();

// PORT
const port  =   5000;

app.get('/',    (req,   res)    =>  {
    res.sendFile('index.html',  {root   :   __dirname});
});

app.listen(port,    ()  =>  {
    console.log(`Server is running on ${port}`);
});