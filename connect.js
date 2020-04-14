// const MongoClient = require('mongodb').MongoClient,format = require('util').format;
//
// MongoClient.connect('mongodb://localhost:27017', function (err,db){
//   if(err){
//     throw err
//   } else {
//     console.log("Connected")
//   }
//
//   db.close();
//
//
// })
//
//

// import mongooseconst mongoose = require('mongoose');// load env variablesconst dotenv = require('dotenv');dotenv.config() //db connectionmongoose.connect(  process.env.MONGO_URI,  {useNewUrlParser: true}).then(() => console.log('DB Connected')) mongoose.connection.on('error', err => {  console.log(`DB connection error: ${err.message}`)});


const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // cors allows app to run on multiple ports?
const expressValidator = require('express-validator');

//IMPORT ROUTES
const setRoutes = require('./routes')
// const userRoutes = require('./routes/user')
// const categoryRoutes = require('./routes/category')
// const productRoutes = require('./routes/product')
// const braintreeRoutes = require('./routes/braintree');
// const orderRoutes = require('./routes/order');

//APP
const app = express();

//// database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
    })
  .then(()=> console.log("DB Connected"));

//MIDDLEWARES
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// app.use(expressValidator());



//ROUTES MIDDLEWARE
app.get('/', (req, res) =>{
  res.send('Hello from Node JS');
})
app.use("/data", setRoutes)
// app.use("/api", userRoutes)
// app.use("/api", categoryRoutes)
// app.use("/api", productRoutes)
// app.use("/api", braintreeRoutes)
// app.use("/api", orderRoutes)

const port = process.env.PORT || 8000
// use 8000 if there is no env file



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:js8808*@cluster0-bwrug.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("PhilconcreteWebsite").collection("members");
  // perform actions on the collection object
  client.close();
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
