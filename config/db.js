const mongoose=require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI)
.then((res)=>{
    console.log("MongoDb is Connected");
}).catch((e)=>{
    console.log(e);
})