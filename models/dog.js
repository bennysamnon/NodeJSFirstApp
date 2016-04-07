var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var dogSchema = new Schema({
   name: String,
   age: Number,
   type: String
});

module.exports =  mongoose.model('Dog', dogSchema)
