const express=require('express');
const morgan=require('morgan');
const parser=require('body-parser');
const { loginRoutes,usersRoutes }=require('./routes/index');
const app=express();
app.set('json spaces',4);
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended:false}));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET,PUT, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    if(req.method=='OPTIONS'){
        res.status(200).end();
    }else{
    next();
    }
});

app.use('/auth',loginRoutes);
app.use(require('./middlewares/secure'));
app.use(process.env.PATH_SECURE+'/users',loginRoutes);
//aqui las rutas seguras
app.use(require('./middlewares/404'));



module.exports = app;