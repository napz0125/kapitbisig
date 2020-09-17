const User = require('../model/usermodel')
const checkedSession = async (req, res, next) => {    

   next()
}

exports.checkedSession = checkedSession;