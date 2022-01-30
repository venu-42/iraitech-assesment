const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:`./config.env`})

const DB_URI = process.env.DB.replace('<password>',process.env.DB_PASSWORD) ;


mongoose.connect(DB_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(()=>{
    console.log('database connected succesfully!');
})
.catch(err=>{
    console.log("data connection unsuccesfull!\n",err);
})

const app = require('./app.js');

const server = app.listen(process.env.PORT,()=>{
    console.log(`app listening on PORT ${process.env.PORT}`);
});