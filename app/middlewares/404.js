module.exports=function (req,res){
    res.status(404).send({"error":"Recurso Solicitado no Encontrado!!"});
    res.end();
    
}