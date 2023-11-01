const mongoose = require('mongoose')
const DB_URL = "mongodb+srv://rizwanshoeb20596:Grapes123@cluster0.delxs.mongodb.net/collaborationDb"

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(DB_URL)
        conn.connectDB
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }

    catch (error){
        console.error(error)
        process.exit(1);
    }
}

module.exports = connectDB;
