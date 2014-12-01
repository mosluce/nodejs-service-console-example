/**
 * Created by mosluce on 14/12/1.
 */
var express = require('express'), app = express();
var routers_dir = './app/routers';

exports = module.exports = function(passport) {
    app.get('/', function(req, res) {
        res.render('index');
    });
    return app;
};