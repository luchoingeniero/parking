'use strict'
const usersDao=require('../dao/users');
const util=require('../util/util');
module.exports={
    login:async (user)=>{
        var result= await usersDao.findByUsername(user.username); 
        if(!result||!result.id){return false; }
        return (util.compareHash(user.password, result.password)?result:false);
      },
    listAll:usersDao.listAll,
    findById:usersDao.findById,
    findByUsername:usersDao.findByUsername,
    delete:usersDao.delete,
    add:(user)=>{
      user.password=util.generateHash(user.password);
      return usersDao.add(user);
    },
    update:usersDao.update
};