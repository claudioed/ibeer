'use strict';

var userService = require('../services/user-service');

exports.addUser = function(req, res,next){
    userService.addUser(req.body).then(function(newUser){
        res.status(201).json(newUser).end();
    }).fail(function(failInsertUser){
        res.status(403).json({ error: failInsertUser}).end();
    });
};