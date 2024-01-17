const mongoose = require('mongoose');

const connect = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`bağlandı`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect