'use strict'
const usersService=require('../services/users');
const util=require('../util/util');
module.exports={
    login:async (req,res)=>{
        var {user}=req.body;
          if(!user||!user.username||!user.password){
            res.status(400).end();
        }else{
            //console.log("USERRRR",user);
            var isLogin= await usersService.login(user);
            var tokenData = { id: isLogin.id, username: user.username,role:isLogin.role};
            res.send( (isLogin)?{token:util.generateTocken(tokenData)}:{error: 'usuario o contraseña inválidos'});
        }
     },

    listAll: async (req,res)=>{
       res.send( await usersService.listAll() ) ;
    },
    add:async (req,res)=>{
        if(!req.body.user){
            res.status(400).end();
        }else{
           res.send( await usersService.add(req.body.user) ) ;
        }
       
    },
    update:async (req,res)=>{
        if(!req.body.user||!req.body.user.id){
            res.status(400).end();
        }else{
        res.send( await usersService.update(req.body.user) ) ;
        }
    },
    delete: async(req,res)=>{
        if(!req.params.id){
            res.status(400).end();
        }
        var user=await usersService.findById(req.params.id);
        if(!user.id){
            res.status(400).send({"error":"Registro No Encontrado!"});
        }else{
            var deleted= await usersService.delete(user);
            var output=(deleted.affectedRows&&deleted.affectedRows>0)?user:deleted;
        res.send( output) ;
        }
    },
    findById:async (req,res)=>{
        if(!req.params.id){
            res.status(400).end();
        }else{
        res.send(await usersService.findById(req.params.id)) ; 
        }
    },
    addDefault: async ()=>{
        var user={
            username:'lgaleano',
            password:'1234',
            role:"ROLE_ADMIN"
        }
        var user_db = await usersService.findByUsername(user.username);
        
        if(user_db.id){ 
            
            return {'info':'Usuario Default ya existe'};
        }
        return await usersService.add(user);
    }
  

};