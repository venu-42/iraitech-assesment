const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./routers/userRouter')

const app = express();

// middlewares 
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'));
}

// routes
app.use('/api/v1/user',userRouter)

app.use((err,req,res,next)=>{
    // global error handler
    
    res.status(err.statusCode||500).json({
        status:'error',
        message:err.message|| 'something went wrong'
    })
})


module.exports = app;