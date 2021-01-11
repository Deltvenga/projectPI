const express = require('express');
const router = express.Router();
const user = require('../models/User');
const mongoose = require('mongoose');

let users = null;
let currentUser = null;
router.get('/getAllUsers', (req, res) => {
    user.find({}).then(result => {
        res.send(result);
        users = result;
        console.log(result);
    });
});

router.post('/getUserInfo',(req, res) => {
   user.find({_id: req.query.userId}).then (result => {
      res.send(result);
      console.log(result);
   });
});

router.post('/createUser',async (req, res) => {
   const newUser = new user({
       name: req.query.userName,
       password: req.query.userPassword,
   });
   await newUser.save();
});

router.post('/updateMarks', async (req, res) => {
    let userId = req.query.userId;
    let objectId = mongoose.Types.ObjectId(userId);
    user.updateOne({
        _id: objectId
    }, {
        icon: 'testosososos',
        marks: req.query.userMarks
    }).then(result => {
        console.log(result);
    });
    console.log(objectId);
});


module.exports = router;