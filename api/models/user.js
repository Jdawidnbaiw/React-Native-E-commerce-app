const mongose = require("mongoose");

const userSchema = new mongose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    verificationToken:String,
    addresses:[{
        name:String,
        mobileNo:String,
        houseNo:String,
        street:String,
        landmark:String,
        city:String,
        country:String,
        postalCode:String,
    }],
    orders:[{
        type:mongose.Schema.Types.ObjectId,
        ref:"Order",
    }],
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

const User = mongose.model("User",userSchema);

module.exports = User