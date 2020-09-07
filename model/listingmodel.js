const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Listingchema = new Schema({
userid: String,
listingno:{ type: Number, default: 0 },
age: { type: Number, default: 0 },
occupation: String,
isemployed : Boolean,
title: String,
detailedtext : String,
activefrom : Date,
activeto : Date,
status : { type: Number, default: 3 }, //1 approved, 2 rejected, 3 unverified,4 found donor match
donorid: String,//if status is 4
approverid : String,
createdon: Date,
modifiedon: Date,
});

const Listing = mongoose.model('Listing',Listingchema); 

module.exports = Listing