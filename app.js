'use strict';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const exphbs  = require('express-handlebars');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routesController = require('./app/routes/routesController');
const users = require('./app/routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'default',
    layoutsDir: 'app/views/layouts'
}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(favicon(__dirname + '/app/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'app/public')));
    // Disable template caching in browser for dev.
if (app.get('env') !== 'production') {
    app.use((req, res, next) => {
        if (req.accepts('html')) {
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Expires', '0');
        }
        return next();
    });
}
app.use('/', routesController);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') !== 'production') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
