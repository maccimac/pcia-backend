const express = require ('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const expressValidator = require('express-validator')

const allRoutes = require('./routes')


const app = express()


mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useCreateIndex: true
})
.then(
  () =>console.log("DB Connected")
)

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


// app.use(expressValidator());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});


app.use("/data", allRoutes)

const port = process.env.PORT

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})
