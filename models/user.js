var mongoose        = require("mongoose"),
    passportLocalMG = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String, 
    password: String
});

UserSchema.plugin(passportLocalMG); 

module.exports = mongoose.model("User", UserSchema);