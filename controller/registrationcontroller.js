
const getRegistrationType = (req, res) =>{   
    const userType=req.body.usertype;    
    res.render('registration',{userType});    
}

const User = require('../model/usermodel');
const Listing = require('../model/listingmodel');
const post = async(req,res)=> {
    
    User.create(req.body, (error, user) => {
        user.userid= req.body.email,         
        user.firstname=req.body.firstname,
        user.lastname=req.body.lastname,
        user.email=req.body.email,
        user.password=req.body.password,
        user.usertype=req.body.usertype,
        user.phone=req.body.phone,
        user.fbprofile= req.body.fbprofile,
        user.city=req.body.city,
        user.address=req.body.address,
        user.country=req.body.country,
        user.zip=req.body.zip,
        user.createdon= Date.now(),
        user.modifiedon= Date.now()
    })   
     if(req.body.usertype==1) //only usertype 1 can do this
     {         
         const listCount = await Listing.countDocuments({}).exec();
        var isEmployed = req.body.isemployed =="on"? 1 : 0;
        Listing.collection.insertOne({
            userid: req.body.email,
            age: 0,//todo
            listingno : listCount + 1,
            occupation:req.body.occupation,
            isemployed: isEmployed,
            detailedtext:req.body.detailedtext,
            activefrom:req.body.activefrom,
            activeto:req.body.activeto,
            status: 3,//default value => unverified
            createdon: Date.now(),
            modifiedon: Date.now()     
     })                   
    }    
    res.render("modal",{ userType: req.body.usertype,name:req.body.firstname + ' ' + req.body.lastname });//TODO : might not be needed
}

exports.getRegistrationType = getRegistrationType;
exports.post = post;