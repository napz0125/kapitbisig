module.exports = async (req, res) =>{
    const Listing = require('../model/listingmodel');
    const User = require('../model/usermodel');
    const list  =  await Listing.findById(req.params.id); 
    const _user  =  await User.find({email : list.userid});    
    var userType = 0;    //refer to the loggedin user type
    var loggedinUser =  req.session.userId;
    if(req.session.usertype!=undefined)
       userType = req.session.usertype  //0 anon, 1 in need, 2 donor, 3 admin/verifier 4 super admin  
       
    res.render('detail',{list,_user,userType,loggedinUser})    
}
