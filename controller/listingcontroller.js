
//todo : lazy loading needed here.dont want to send all data at once!!
//TODO bug if item return only one. its not an array.
const alllisting = async (req, res) =>{
    const Listing = require('../model/listingmodel');
    const pending  =  await Listing.find(( { $or: [ { status: 3 }, { status: 5 } ] } )).populate('userinfo');
    const rejected  =  await Listing.find({status:2}).populate('userinfo');  
    const approved  =  await Listing.find(( { $or: [ { status: 1 }, { status: 4 } ] } )).populate('userinfo');
    
    var userType = 0;    
    if(req.session.usertype!=undefined)
       userType = req.session.usertype           
          
    res.render('listing',{pending,rejected,approved,userType})    
}

const assignReviewer = async (req,res) =>{

    const Listing = require('../model/listingmodel');       
    var list =  await Listing.findOneAndUpdate({ _id  :  req.params.listingid}, { $set: { reviewerid: req.params.reviewerid ,status:5} });    
    if(list)
      res.render('detail',{list,_user,userType,loggedinUser}) 
}

const mylist = async (req, res) =>{
    const Listing = require('../model/listingmodel');

    var userid = req.session.userId;
    var userType = req.session.usertype;
    
    if(req.session.usertype!=undefined)
       userType = req.session.usertype           
        
    if(userType != 1)
    {
        const myBeneficiary  =   await Listing.find(( { $and: [ { status: 4 }, { donorid: userid } ] } )).populate('userinfo');
        const rejected  =  await Listing.find({status:2}).populate('userinfo');  
        const approved  =  await Listing.find(( { status:1})).populate('userinfo');
        const mylisting = null     
        res.render('mylisting',{myBeneficiary,rejected,approved,mylisting,userType})    
    }
    else
    {
        const mylisting  =  await Listing.findOne({ userinfo : userid  }).populate('userinfo');
        const approved = null;
        const rejected = null                
        res.render('mylisting',{mylisting,approved,rejected,userType})   //only one listing per user (beneficiary).hmmmmmm..for now. this is a one time help.
    } 
}

exports.alllisting = alllisting;
exports.assignReviewer = assignReviewer
exports.getMyList = mylist;
