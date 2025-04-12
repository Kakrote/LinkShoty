const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

const connectDB=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        if(!conn){
            console.log("connection not fit check the code")
        }
        console.log("connected to database")
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports=connectDB