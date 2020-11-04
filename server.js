const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
    });

const db = require("./config/keys").mongoURI;


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));






const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
