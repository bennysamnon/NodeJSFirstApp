var r = require('request').defaults({
    json:true
});

var async = require('async');
var redis = require('redis');

//get redis client
var client = redis.createClient({host:`127.0.0.1`, port:`6379`});
//client.set(["some other key", "some val"]);

module.exports = function (app) {
   
     /* Read */
    app.get('/pets', function (req, res) {
       
        // This will return a JavaScript String
        client.get("/pets", function (err, reply) {
            if(reply != null)
            {
                res.json(JSON.stringify(reply));
                console.log('{/pets} data is get from redis cache');
                return;
            }
            else
            {
                async.parallel([
                        function(callback){
                            r({uri:'http://127.0.0.1:3000/cat'}, function (error, response, body) {
                                if(error)
                                {
                                    callback({service: 'cat', error: error}); 
                                }
                                
                                if(!error && response.statusCode == 200){
                                    callback(null, body);
                                }else{
                                    callback(response.statusCode);
                                }
                                })
                        },
                        function(callback){
                            r({uri:'http://127.0.0.1:3001/dog'}, function (error, response, body) {
                                if(error)
                                {
                                    callback({service: 'dog', error: error}); 
                                }
                                
                                if(!error && response.statusCode == 200){
                                    callback(null, body);
                                }else{
                                    callback(response.statusCode);
                                }
                                })
                        }
                        ],
                        // optional callback
                        function(err, results){           
                            // the results array will equal ['one','two'] even though
                            // the second function had a shorter timeout.
                            if(!err)
                            {
                                console.log('{/pets} data is set on redis cache');
                                client.setex("/pets", 5, JSON.stringify(results));
                            }
                                
                            res.json({
                                    error:err,
                                    results:results
                                });
                        });
            }
                            
        });
        
       
    })
    
    app.get('/ping', function (req, res) {
        res.json({pong: Date.now()});
    })
    
}