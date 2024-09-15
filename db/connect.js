const mongoose = require('mongoose')

const connectDB = async (url) => {

  try {
    await mongoose.connect(url, {});
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  } catch (error) {
    console.error('COULD NOT CONNECT TO DATABASE:', error.message);
  }

}

module.exports = connectDB
