const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users');

console.log("usuario creado!!",usersController.addDefault());// agregar usuario por default
        router.route('/login')
        .post(usersController.login);
        

module.exports=router;