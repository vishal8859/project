const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");

// MONGO_DB_URI= "mongodb+srv://amit:v8z4OLmvTWIeT6BC@cluster0.1rts2gy.mongodb.net/?retryWrites=true&w=majority"
// "mongodb://localhost:27017/jobPortal"
 URI = "mongodb://amit:v8z4OLmvTWIeT6BC@ac-izxfgoi-shard-00-00.1rts2gy.mongodb.net:27017,ac-izxfgoi-shard-00-01.1rts2gy.mongodb.net:27017,ac-izxfgoi-shard-00-02.1rts2gy.mongodb.net:27017/?ssl=true&replicaSet=atlas-10eb45-shard-0&authSource=admin&retryWrites=true&w=majority";
// MongoDB
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// initialising directories
if (!fs.existsSync("./public")) { 
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = 4444;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
