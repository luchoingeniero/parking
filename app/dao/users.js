'use strict'
const connection=require('./dao');
const table="users";
module.exports={

    listAll:()=>{ return connection.findAllTable(table);},
    findById:(id)=>{ return connection.findByIdTable(table,id);},
    findByUsername:(username)=>{return connection.findOneByColumnTable(table,"username",username); },
    delete:(user)=>{return connection.deleteByColumn(table,"id",user.id);},
    add:(user)=>{return connection.createByObject(table,user);},
    update:(user)=>{ return connection.updateByObject(table,user);  }

};