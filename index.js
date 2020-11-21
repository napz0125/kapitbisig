const express = require('express')
const expressSession = require('express-session');
const app = new express()
const fileUpload = require('express-fileupload')

const path = require('path')
const ejs = require('ejs')

var favicon = require('serve-favicon');
const mongoose = require('mongoose');

mongoose.connect("", {useNewUrlParser: true})

const bodyParser = require('body-parser');

app.use(expressSession({
    secret: 'replacewithsupersecretkeyforencrypt'    
    }))
 
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(favicon(path.join(__dirname, '/public', 'img/bayanihan-ngayun2.ico')));

const authmiddleware = require('./middleware/authmiddleware');
app.use(authmiddleware.checkedSession);

app.disable('x-powered-by')

const homeController = require('./controller/homecontroller')
app.get('/', homeController)

const registrationController = require('./controller/registrationcontroller')
app.post('/registrationtype', registrationController.getRegistrationType)

app.use(fileUpload({
  //useTempFiles : true,
  //tempFileDir : path.join(__dirname, '/public/','upload')
  //debug:true
}));

app.post('/registration',registrationController.post)

const loginController = require('./controller/logincontroller')
app.get('/login', loginController.loginPage)
app.post('/users/login',loginController.loginLogic)

const logOutController = require('./controller/logoutcontroller')
app.get('/logout', logOutController)

const detailController = require('./controller/detailcontroller')
app.get('/detail/:id', detailController)

app.post("/savelistingtodonor",async (req,res)=>{
  //update the listing.how about error on update? TODO
  await Listing.updateOne( { _id : req.body.listing_id},{$set: {donorid:req.body.donor_id,status:4,modifiedon:Date.now()}}); 
  res.json({ result: 'OK' })
})

//api for constant data point
const dataController = require('./controller/datacontroller')
app.get('/api/getcountry',dataController.country)

const listingController = require('./controller/listingcontroller')
app.get('/listing',listingController.alllisting);
app.get('/listing/:listingid/:reviewerid',listingController.assignReviewer);
app.get('/mylisting',listingController.getMyList);

//testing form
app.get('/testing',async (req,res) => {
  res.render('testinghere',{list,userType,loggedinUser})   
})
//end test form

app.use(function(req,res){
  res.status(404).render('notfound');
});

app.listen(4000, ()=>{
  console.log('App listening on port 4000')
})
