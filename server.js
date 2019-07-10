require('dotenv/config');
server = require('./app/index');
server.listen(3000,()=>{
    console.log("Servicio api rest Iniciado!!");
});
