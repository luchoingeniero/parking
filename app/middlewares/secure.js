const util=require('../util/util');

module.exports=function (req,res,next){
    if(req.url.startsWith(process.env.PATH_SECURE)){
        var token = req.headers['authorization']
         if(!token){
                res.status(401).send({
                error: "Es necesario el token de autenticación"
            })
        return
        }

    token = token.replace('Bearer ', '');// reemplazamos el texto que le pone el navegador
    
    var callback=(err, user)=>{
              if (err) {
                res.status(401).send({
                  error: 'Token inválido'
                })
              } else {
            //console.log("DATA_USER",user);
                    next();
              };
    }
    util.verifyTocken(token,callback);
    }else{ next();}
}