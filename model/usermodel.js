const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userid: String,
    firstname: String,
    lastname: String,
    fbprofile : String,
    email : String,
    password:String,//to be improved!
    phone: String,
    address:String,
    city:String,
    country: String,
    zip:String,
    usertype: { type: Number, default: 1 },//1 in need, 2 donor, 3 admin/verifier 4 super admin  
    isblocked : Boolean,//for abusive 
    isactive : Boolean,
    createdon: Date,
    modifiedon: Date
});

const bcrypt = require('bcrypt')
UserSchema.pre('save', function(next){
    const user = this    
    bcrypt.hash(user.password, 10, (error, hash) => {    
    user.password = hash    
    next()    
    })    
})

const User = mongoose.model('User',UserSchema); 

module.exports = User