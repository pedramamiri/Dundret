const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const path       = require('path');
require('dotenv').config();

const app = express();

//routers
const skis = require('./routes/api/skis')

// body parser middleware
app.use(bodyParser.json())

// mongo connect
mongoose
    .connect("mongodb://p.a.r:pedrammardep1368@ds137913.mlab.com:37913/mern", { useNewUrlParser: true })
    .then(()=>console.log('mongo db is connected...'))
    .catch((err)=>console.log(err))

// use routes
// @route /api/skis
app.use('/api/skis',skis)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  });  
}


// PORT
const port = process.env.PORT || 5000

//Listening...
app.listen(port, ()=>console.log(`server started on port ${port}`))


