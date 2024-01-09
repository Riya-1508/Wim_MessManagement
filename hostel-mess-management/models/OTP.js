const mongoose = require("mongoose");
const mailSender = require("../utils/sendEmail");


const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60, //5 mins time
    }
});

//middleware
// before each OTP document is saved, an email will be sent using the sendVerificationEmail function with the  OTP and email address.
async function sendVerificationEmail(email,otp) {
    try{
        const mailResponse = await mailSender(email,"Verification email from VJTI mess ",otp);
        console.log("email sent successfully!",mailResponse);
    }
    catch(error) {
        console.log("error while sending email",error);
        throw error;
    }
}

OTPSchema.pre('save',async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
});

module.exports = mongoose.model("OTP",OTPSchema);