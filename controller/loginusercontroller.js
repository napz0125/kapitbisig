const User = require('../model/usermodel')
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
const { userid, password } = req.body;     
    User.findOne({ email: userid }, (error, user) => {        
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) { 
                    req.session.userId = user._id
                    req.session.usertype = user.usertype
                    res.redirect('/')
                }
                else {
                    res.redirect('/login')
                }
            })
        }
        else {
            res.redirect('/login')
        }
    })
}
