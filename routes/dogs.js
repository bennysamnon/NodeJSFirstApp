var _ = require('lodash');
var Dog = require('../models/dog.js');

module.exports = function (app) {
    
    /* Create */
    app.post('/dog', function (req, res) {
        var newDog = new Dog(req.body);
        newDog.save(function (err) {
            if(err)
            {
                 res.json({info: 'dog created failed', error: err});   
            };
               res.json({info: 'dog created successfully'}); 
        });
       
    });
    
    /* Read */
    app.get('/dog', function (req, res) {
        
        Dog.find({}, function (err, dogs) {
            if(err)
            {
                res.json({info: 'error during find dogs', error: err});   
            };
            
            setTimeout(function() {
                res.json({info: 'dog found successfully', dogs: dogs});  
            }, 5000);
            //res.json({info: 'dog found successfully', dogs: dogs});   
        })
    })
    
    app.get('/dog/:id', function (req, res) {
       Dog.find({id: req.id}, function (err, dogs) {
            if(err)
            {
                res.json({info: 'error during find dogs', error: err});   
            };
            res.json({info: 'dog found successfully', dogs: dogs});   
        })
    })
}