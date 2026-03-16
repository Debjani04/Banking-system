require("dotenv").config()
const mongoose = require("mongoose");

async function connectionDB() {
   await mongoose.connect(process.env.MONGO_URI)
   console.log("Database is connected")
}

module.exports = connectionDB ;
