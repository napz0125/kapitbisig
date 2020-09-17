const loginPage = (req, res) =>{
    const invalidLogin = "" ;   
    res.render('login',{invalidLogin})    
}

const User = require('../model/usermodel')
const bcrypt = require('bcrypt')

const loginLogic = (req, res) => {
    const { userid, password } = req.body; 
    var invalidLogin = "" ;   
        User.findOne({ email: userid }, (error, user) => {        
            if (user) {
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) { 
                        req.session.userId = user._id
                        req.session.usertype = user.usertype
                          
                        if (req.body.rememberme) {
                            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
                          } else {
                            req.session.cookie.expires = false; // Cookie expires at end of session
                          }

                        if(user.usertype == 3 || user.usertype ==4 )//admin
                           res.redirect('/listing')
                        else
                           res.redirect('/mylisting')//donor and beneficiary
                    }
                    else {
                        invalidLogin ="Invalid username/email and/or password";
                        res.render('login',{invalidLogin});
                    }
                })
            }
            else {
                invalidLogin ="User does not exist.";//possible vector attack!                                                
                res.render('login',{invalidLogin})
            }
        })
    }    

exports.loginPage = loginPage
exports.loginLogic = loginLogic


