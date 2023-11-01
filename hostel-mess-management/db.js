///Atlas connection
const mongoose = require("mongoose");
require("dotenv").config();

const atlasConnectionString = process.env.ATLAS_CONNECTION_STRING;

const connectToMongo = () => {
  mongoose
    .connect(atlasConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB Atlas:", err.message);
    });
};

module.exports = connectToMongo;

///Local connection

// const mongoose = require('mongoose');

// const mongoURI = "mongodb://127.0.0.1:27017/railway?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1"

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Connected to Mongo Successfully");
//     })
// }

// module.exports = connectToMongo;

///////////////////////////////////////////////////////////////
