
const getRegistrationType = (req, res) =>{   
    const userType=req.body.usertype;    
    res.render('registration',{userType});    
}

const User = require('../model/usermodel');
const Listing = require('../model/listingmodel');
const path = require('path');

const post = async(req,res)=> {  

        User.create(req.body, async (error, user) => {
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

        if(req.body.usertype==1) //only usertype 1 can do this
        {            
           const listCount = await Listing.countDocuments({}).exec();
           var isEmployed = req.body.isemployed =="on"? 1 : 0;
          
           let images = req.files;
           let imgArray=[];        
           //gonna be chicken and egg condition!
           for (var i in images['input2[]']) {
                imgArray.push('/upload/' + images['input2[]'][i].name)     
                let image = images['input2[]'][i];       
                image.mv(path.resolve('public/upload',image.name),async (err)=>{                   
            })         
         }
            Listing.collection.insertOne({               
                age: 0,//todo maybe not needed??
                listingno : listCount + 1,
                occupation:req.body.occupation,
                isemployed: isEmployed,
                detailedtext:req.body.detailedtext,
                activefrom:req.body.activefrom,
                activeto:req.body.activeto,
                status: 3,//default value => unverified
                createdon: Date.now(),
                modifiedon: Date.now(),
                userinfo :  user._id,
                needtype : req.body.needtype,
                imagepath : imgArray,
                minimum_votes : 2
           })                                                                                        
        }
    })  
    res.render("modal",{ userType: req.body.usertype,name:req.body.firstname + ' ' + req.body.lastname });
}
exports.getRegistrationType = getRegistrationType;
exports.post = post;