const mongoose=require('mongoose');

const hospitalsSchema=new mongoose.Schema(
    {
        name: {
            type:String,
            required:true
        },
        city: {
            type:String,
            required:true
        },
        totalBeds: {
            type: String,
            required: true
        },
        availableBeds: {
            type: String,
            required:true
        }     
    }
);
const Hospitals=mongoose.model("Hospitals",hospitalsSchema);
module.exports=Hospitals;
