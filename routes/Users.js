const express = require('express');
const router = express.Router();
const user = require('../models/User');

let users = null;
let currentUser = null;
router.get('/getAllUsers', (req, res) => {
    user.find({}).then(result => {
        res.send(result);
        users = result;
        console.log(result);
    });
});

router.get('/getUserInfo',(req, res) => {
   user.find({_id: req.body.userId}).then (result => {
      res.send(result);
   });
});

router.post('/createUser',async (req, res) => {
   const newUser = new user({
       name: req.body.userName,
       password: req.body.userPassword,
       marks: req.body.userMarks
   });
   await newUser.save();
   res.redirect('/')
});




module.exports = router;