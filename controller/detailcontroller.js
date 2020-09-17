module.exports = async (req, res) =>{
    const Listing = require('../model/listingmodel');
    const list  =  await Listing.findById(req.params.id).populate('userinfo');    
    var userType = 0;    //refer to the loggedin user type
    var loggedinUser =  req.session.userId;
    if(req.session.usertype!=undefined)
       userType = req.session.usertype  //0 anon, 1 in need, 2 donor, 3 admin/verifier 4 super admin  
       
    res.render('detail',{list,userType,loggedinUser})    
}
