import mongoose from "mongoose";


const connectDB =async (req,res)=>{

    try {

        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connected ${connect.connection.host}`)
    
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;