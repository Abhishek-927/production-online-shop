const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLUS_URL);
    console.log("database connected");
  } catch (error) {
    console.log("Database connection error", error);
  }
};

module.exports = connectToDB;
