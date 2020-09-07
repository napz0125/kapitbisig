const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
userid: String,
listingid: String,
imageid : String
});

const Image = mongoose.model('Image',ImageSchema); 

module.exports = Image