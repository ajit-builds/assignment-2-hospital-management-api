const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/hospital_management");

const db=mongoose.connection;

db.on("connected",()=>{
    console.log("MongoDb connected Successfully");
});

db.on("disconnected",()=>{
    console.log("Mongodb disconnected");
});
db.on("error",(error)=>{
    console.log("MongoDB connection error:",error)
});
module.exports=db;