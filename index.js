const express = require('express')
const expressSession = require('express-session');
const app = new express()

const path = require('path')
const ejs = require('ejs')

var favicon = require('serve-favicon');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:admin1234@cluster0.pnoir.mongodb.net/bayanihan?retryWrites=true&w=majority", {useNewUrlParser: true})

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
//app.use(authmiddleware);

app.disable('x-powered-by')

const homeController = require('./controller/homecontroller')
app.get('/', homeController)

const registrationController = require('./controller/registrationcontroller')
app.post('/registrationtype', registrationController.getRegistrationType)
app.post('/registration',registrationController.post)

const loginController = require('./controller/logincontroller')
app.get('/login', loginController)

const logOutController = require('./controller/logoutcontroller')
app.get('/logout', logOutController)

const detailController = require('./controller/detailcontroller')
app.get('/detail/:id', detailController)

app.post("/savelistingtodonor",async (req,res)=>{
  console.log(req.body);
  //update the listing.how about error on update? TODO
  await Listing.updateOne( { _id : req.body.listing_id},{$set: {donorid:req.body.donor_id,status:4,modifiedon:Date.now()}}); 
  res.json({ result: 'OK' })
})

const loginUserController = require('./controller/loginusercontroller')
app.post('/users/login',loginUserController)

//api for constant data point
const dataController = require('./controller/datacontroller')
app.get('/api/getcountry',dataController.country)


//testing form
//app.get('/registration1',(req,res) => {
  //res.render('registration1')
//})
//end test form



app.use(function(req,res){
  res.status(404).render('notfound');
});

app.listen(4000, ()=>{
  console.log('App listening on port 4000')
})