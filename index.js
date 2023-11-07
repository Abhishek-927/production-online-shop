//import package
const express = require("express");
const dotenv = require("dotenv");
const { signinRequired, isAdmin } = require("./middlewares/authMiddle");
const cors = require("cors");
const path = require("path");

//import modules
const connectToDB = require("./db");

//config with environment veriable
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./frontend/build")));

//all api call
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/category", require("./routes/categoryRoute"));
app.use("/api/v1/product", require("./routes/productRoute"));

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

//listening on server
connectToDB().then(() =>{
  app.listen(PORT, () => {
    console.log(`server runnig at localhost:`, PORT);
  })
})

