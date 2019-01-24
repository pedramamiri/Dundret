const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const path       = require('path');
const paypal       = require('paypal-rest-sdk');
const cors = require('cors');

require('dotenv').config();

const app = express();

//app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.all('', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  //Auth Each API Request created by user.
  next();
  });

//routers
const skis = require('./routes/api/skis')
const pay  = require('./routes/api/pay')

// body parser middleware
app.use(bodyParser.json())

// mongo connect
mongoose
    .connect(process.env._mongoURI, { useNewUrlParser: true })
    .then(()=>console.log('mongo db is connected...'))
    .catch((err)=>console.log(err))

//Paypal configuration
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env._client_id,
  'client_secret': process.env._client_secret
});  

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.all('', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  //Auth Each API Request created by user.
  next();
  });

// use routes
// @route /api/skis
app.use('/api/skis',skis)
// @route /api/pay
app.use('/api/pay',pay)


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


