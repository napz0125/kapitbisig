module.exports = async (req, res) =>{
    const Listing = require('../model/listingmodel');
    const approvedListing  =  await Listing.find({status:1});  
    var userType = 0;    
    if(req.session.usertype!=undefined)
       userType = req.session.usertype  //0 anon, 1 in need, 2 donor, 3 admin/verifier 4 super admin  
       
    res.render('home',{approvedListing,userType})    
}
