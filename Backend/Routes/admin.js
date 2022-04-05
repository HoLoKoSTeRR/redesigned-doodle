const express = require('express')
const Admin = require('../models/admin')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const admin = new Admin({
        username: req.body.username,
        password: hash
      });

      Admin.findOne({username:{$eq:req.body.username}}).then(user1=>{
        if(user1){
          return res.status(401).json({
            message: "Admin Already Exist"
          })
        }

        admin.save().then(result => {
          if(!result){
            return res.status(500).json({
              message: "Error Creating USer"
            })
          }
          res.status(201).json({
            message: "User created!",
            result: result
          });
      })
        })   
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });;
    })
   
  });


  router.post("/login", (req, res, next) => {
    let fetchedUser;
  
    Admin.findOne({username:{$eq:req.body.username}}).then(user=>{
      if(!user){
        return res.status(401).json({
          message: "Auth failed no such user"
        })
      }
      fetchedUser=user;
      return bcrypt.compare(req.body.password, user.password);
    }).then(result=>{
      console.log(fetchedUser)
      if(!result){
        return res.status(401).json({
          message: "Auth failed inccorect password"
        })
      }
      const token = jwt.sign(
        { username: fetchedUser.username, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(e=>{
     
      console.log(e)
    
    })
  })
module.exports = router