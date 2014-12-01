/**
 * Created by mosluce on 14/12/1.
 */

var LocalStrategy = require('passport-local').Strategy;
var Auth = require('../app/models/auth.js');
var Client = require('node-rest-client').Client;

exports = module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function(id, done) {
        Auth.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        var client = new Client();

        client.post('http://klcc-user-provider.azurewebsites.net/login', {
            data: {
                username: username,
                password: password
            },
            headers:{"Content-Type": "application/json"}
        }, function(data, res) {
            if(res.statusCode == 200) {
                data = JSON.parse(data);

                if(data.success = true) {
                    Auth.findOne({username: username}, function(err, auth) {
                        if(err) return done(err);
                        if(auth) return done(null, auth);
                        auth = new Auth();
                        auth.username = username;
                        auth.name = data.data.name;
                        auth.save(function(err) {
                            if(err) return done(err);
                            return done(null, auth);
                        });
                    });
                }
            }

            return done(null, false, req.flash('failed', 'login failed'));
        });
    }));
};