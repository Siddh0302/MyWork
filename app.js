require('./config');
const express = require("express");
const multer = require("multer")();
const mongoose = require('mongoose');
const datas = require('./data');
const alert =require ("alert")
const validatePhoneNumber = require('validate-phone-number-node-js');
const app = express();
const cors = require("cors");
const { MinKey } = require('mongodb');
app.use(cors())
app.use(express.json())
// app.use('/', datas);
const port = 5555


app.post("/post", multer.any(), async (req, resp) => {
  try {
    let users = await datas(req.body)
    let phone = users.phone
    let password = users.password
    if (password.length < 8) {
      // resp.status(400).send('Password must be at least 8 characters long');
      alert('Password should be Greaterthan 8 Characters');
    }
    else if  (req.body.password != req.body.confirmpassword) {
      // resp.status(400).send ('Password did not Match.Try again '); 
      alert('Password did not Match.Try again');
      // alert("Sign Up successfully");
      console.log("Password did not Match.Try again");
    }
    else if (phone.length < 10) {
      // resp.status(400).send('number should be of 10 characters');
      alert('Phone Number should be of 10 Digits');
      console.log('number should be of 10 characters');
    }
    else {
      // console.log(phone)
      let data = await users.save()
      resp.sendFile(__dirname + "/home/home.html");
      alert("Sign Up successfully");
      console.log(data);
    }
  } catch (error) {
    console.log(error)
    resp.send(error.errors)
  }
});



app.get("/get", async (req, resp) => {
  let data = await datas.find()
  // resp.get(data)  
  resp.sendFile(__dirname + "/index.html");
  console.log('respond added successfuly')
  // res.render('index', { title: 'Signup Form' });
});
app.get("/about", async (req, resp) => {
  let data = await datas.find()
  resp.sendFile(__dirname + "/home/abouthtml.html");
  console.log('respond added successfuly') 
});
app.get("/about1", async (req, resp) => {
  let data = await datas.find()
  resp.sendFile(__dirname + "/home/aboutcss.html");
  console.log('respond added successfuly') 
});
app.get("/about2", async (req, resp) => {
  let data = await datas.find()
  resp.sendFile(__dirname + "/home/aboutjs.html");
  console.log('respond added successfuly') 
});



app.listen(port, () => {    
  console.log(`http://localhost:${port}/get `)
});
