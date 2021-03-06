const mongoose = require('mongoose')

const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:true
    });
console.log('mongo connected')

}

module.exports = connectDB;

