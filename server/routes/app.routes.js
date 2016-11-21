'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

// registering new user
router.post('/register', function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
        // if user is already there, we shouldn't create a new  account
        if (user) {
            res.json({
                success: false,
                message: 'User already exists'
            });

        // else create a new user
        } else {
            User.create({
                email: req.body.email,
                password: req.body.password,
                config: {
                    apiSetup: false,
                    userType: 'user',
                    shopifyApi: {}
                }
            }, function(err, user) {
                if (err) {
                    res.json(err);
                } else {
                    res.json({
                        success: true,
                        message: 'User succesfully created'
                    });
                }
            });
        }
    });
});

// logging in
router.post('/login', function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
        // if we can find user
        if (user) {
            User.authenticate(req.body.email, req.body.password, function(error, user) {
                // if authenticate method provides error
                if (error || !user) {
                    res.json({
                        success: false,
                        message: 'Incorrect Email/Password'
                    });
                } else {
                    // SUCCESS: create a session and assign it to the user's ID
                    // this is done on the server side so so clients can't see this.
                    var token = jwt.sign(
                        user,
                        config.secret, {
                            expiresIn: "7d"
                        }
                    );

                    res.json({
                        success: true,
                        token: token,
                        user: {
                            email: user.email,
                            config: user.config
                        }
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: 'Incorrect Email/Password'
            });
        }
    });
});

// team functionality
var publicRoutes = require('./public.routes');
router.use('/public', publicRoutes);


// verify a json web token
router.get('/verify', function(req, res, next) {
    var token = req.headers.token;
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Error: jwtoken invalid',
                });
            } else {
                res.json({
                    success: true,
                    message: 'Success! JWtoken Valid',
                    user: {
                        email: decoded._doc.email,
                        config: decoded._doc.config
                    }
                });
            }
        });
    } else {
        res.json({
            success: false,
            message: 'Error: No jwtoken supplied'
        });
    }
});



// protected routes middleware
// everything below is protected
router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.token;

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Error: jwtoken invalid'
                });
            }
            // success:
            else {
                let decoded = jwt.decode(token);

                // save these in every subsequent request
                req.config = decoded._doc.config;
                req.user_id = decoded._doc._id;
                req.email = decoded._doc.email;
                req.shopifyAPI = decoded._doc.config.shopifyAPI;
                next();
            }
        });
    } else {
        res.status(403).json({
            succes: false,
            message: 'No token provided'
        });

        console.log("Error: no token provided");
    }
});

// get user config
router.get('/config', function(req, res, next) {
    User.findById(req.user_id, function (err, user) {
        if (err) {
            res.status(400).json({
                success: false,
                message: "Could not retrieve user"
            });
        } else {
            res.json({
                success: true,
                data: user
            });
        }
    });
});

router.post('/config', function(req, res, next) {
    User.findById(req.user_id, function (err, user) {
        if (err) {
            res.status(400).json({
                success: false,
                message: "Could not retrieve user"
            });
        } else {

            for (var key in req.body.config) {
              if (req.body.config.hasOwnProperty(key)) {
                user.config[key] = req.body.config[key];
              }
            }

            user.markModified('config');

            user.save(function (err, user) {
                if (err) {
                    res.json({
                        success: false,
                        messsage: "Error saving into DB"
                    });
                }

                else {
                    res.json({
                        success: true,
                        message: "User Updated",
                        data: user.config
                    });
                }
            });
        }
    });
});

// team functionality
var teamRoutes = require('./teams.routes');
router.use('/', teamRoutes);

module.exports = router;