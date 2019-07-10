const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const SECRET_KEY=process.env.SECRET_KEY | 'MY_SECRETE';
module.exports={
    generateHash:(password)=>{
        var salt = bcrypt.genSaltSync(5);
        return bcrypt.hashSync(password, salt);
    },
    compareHash:(password,hash)=>{
       return  bcrypt.compareSync(password,hash);
    },
    generateTocken:(tokenData)=>{
       return  jwt.sign(tokenData, SECRET_KEY, {
                 expiresIn: 60 * 60 * 24 // expires in 24 hours
              });
    },
    verifyTocken:(token,callback)=>{
        jwt.verify(token,SECRET_KEY,callback);
    }
    
   
}