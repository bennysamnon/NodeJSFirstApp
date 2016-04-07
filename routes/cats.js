var _ = require('lodash');
var Cat = require('../models/cat.js');

module.exports = function (app) {
    
    /* Create */
    app.post('/cat', function (req, res) {
        var newCat = new Cat(req.body);
        newCat.save(function (err) {
            if(err)
            {
                 res.json({info: 'cat created failed', error: err});   
            };
               res.json({info: 'cat created successfully'}); 
        });
       
    });
    
    /* Read */
    app.get('/cat', function (req, res) {
        
        Cat.find({}, function (err, cats) {
            if(err)
            {
                res.json({info: 'error during find cats', error: err});   
            };
            res.json({info: 'cat found successfully', cats: cats});   
        })
    })
    
    app.get('/cat/:id', function (req, res) {
        Cat.find({id: req.id}, function (err, cats) {
            if(err)
            {
                res.json({info: 'error during find cats', error: err});   
            };
            res.json({info: 'cat found successfully', cats: cats});   
        })
    })
}