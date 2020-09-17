const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Listingchema = new Schema({
    _id: Schema.Types.ObjectId,
    listingno:{ type: Number, default: 0 },
    age: { type: Number, default: 0 },
    occupation: String,
    isemployed : Boolean,
    needtype: String,//Grocery, Medicines, Clothes, Other Goods (Please specify)
    detailedtext : String,//other goods detail
    activefrom : Date,
    activeto : Date,
    status : { type: Number, default: 3 }, //1 approved, 2 rejected, 3 unverified,4 found donor match, 5 under review
    donorid: { type: Schema.Types.ObjectId, ref: 'User' },//if status is 4
    approverid : String,
    createdon: Date,
    modifiedon: Date,
    userinfo: { type: Schema.Types.ObjectId, ref: 'User' },    
    //vote_type : 1 - approve. 2 - reject : detail will be mandatory. 3 - Other - neutral : just comment
    voter : [{ by : {type : Schema.Types.ObjectId} , detail : String , vote_type : {Number}}],
    minimum_votes : {type : Number},//this goes to config. Lets put this to at least 2 approve votes then dynamically increase as per user's volume or participation.
    imagepath : [String]
});

const Listing = mongoose.model('Listing',Listingchema); 

module.exports = Listing