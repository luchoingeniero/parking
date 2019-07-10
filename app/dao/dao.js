'use strict' 
var mysql = require('mysql');
var connection = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   port: process.env.DB_PORT
});

connection.connect((error)=>{
        if(error){
            throw error;
         }
         /*else{
            console.log('Conexion correcta.');
         }*/
    });

var objectToData=(object,typeOut="_CREATE")=>{
   var columns=[];
   var params=[];
   var data=[];
   for (let i in object) {
      params.push("?");
      columns.push( (typeOut=="_CREATE")?i: (i+"=?") );
      data.push(object[i]);
      
   }
   return {columns,params,data};
} 

var conn={
    findAllTable:(table)=>{
       return conn.query("select * from "+table);
    },
    findOneByColumnTable:(table,column,value)=>{
      return new Promise((resolve, reject) => {
         conn.query("select * from "+table+" where "+column+"=?",[value])
         .then((data)=>{ 
            //console.log("DATA",data);
            resolve(data[0]?data[0]:{});
         
         })
         .catch(reject);
      });
    },
    findOneByContainsColumnTable:(table,column,value)=>{
      return new Promise((resolve, reject) => {
         conn.query("select * from "+table+" where "+column+" like '%?%'",[value])
         .then((data)=>{resolve(data[0])})
         .catch(reject);
      });
    },
    findByIdTable:(table,id)=>{
      return conn.findOneByColumnTable(table,"id",id);
    },
    findAllByColumnTable:(table,column,value)=>{
      return conn.query("select * from "+table+" where "+column+"=?",[value]);
    },
    findAllByContainsColumnTable:(table,column,value)=>{
      return conn.query("select * from "+table+" where "+column+"like '%?%'",[value]);
    },
    deleteByColumn:(table,column,value)=>{
      const sql="delete  from "+table+" where "+column+"=?;";
      return  new Promise((resolve, reject) => {
          conn.query(sql,[value])
          .then((data)=>{resolve(data)})
          .catch(resolve);
      });
    },
    createByObject:(table,object)=>{
      var objData=objectToData(object);
      var sql="insert into "+table+" ("+objData.columns.join()+") values("+objData.params.join()+")";
     // console.log(sql);
      return  new Promise((resolve, reject) => {
                  conn.query(sql,objData.data)
                  .then((data)=>{object.id=data.insertId;  resolve(object)})
                  .catch(resolve);
               });

    },
    updateByObject:(table,object)=>{
      var id=object.id;
      delete  object.id;
      var objData=objectToData(object,"_UPDATE");
      var sql="update "+table+" set "+objData.columns.join()+" where id=? ";
      //console.log(sql);
      objData.data.push(id);
      object.id=id;
      return  new Promise((resolve, reject) => {
                  conn.query(sql,objData.data)
                  .then((data)=>{if(data.affectedRows>0){resolve(object)} else {
                     resolve({error:"No existe el item a actualizar!"});
                  }})
                  .catch(resolve);
               });
    },
    query:(query,data=[])=>{
       
     return    new Promise((resolve, reject) => {
          
            connection.query(query, data, function(error, result){
                if(error){
                    console.log(error);
                   reject(error);
                }else{
                    console.log(result);
                    
                   resolve(result);
                }
            
             }
          );
          
          
          });
          

          
    }
}



module.exports=conn;