const jwt = require('jsonwebtoken')

const maxAge = 5*24*60*60
function createToken(id){
    return jwt.sign({id},"Yums already going fast.",{
        expiresIn:maxAge
    })
}

exports.GetToken = createToken