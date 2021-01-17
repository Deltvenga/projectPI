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

router.post('/loginUser',(req, res) => {
    console.log(req.query);
    user.find({email: req.query.email}).then (result => {
        console.log(result);
        if(result[0].password !== req.query.password) {
            res.send({error: "Wrong password"});
        } else {
            res.send(result[0]);
        }
    });
});

router.post('/createUser',async (req, res) => {
   const newUser = new user({
       name: req.query.userName,
       email: req.query.email,
       password: req.query.userPassword,
       emailConfirmed: false
   });
   console.log(req.query);
   await newUser.save().then((data) => {
       console.log(data);
       res.send(data);
   });
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
        res.send('Mark update');
    });
    console.log(objectId);
});

router.post('/getStatistic', async(req,res) => {
    let statistic = {
        january: [],
        february:[],
        march:[],
        april:[],
        may:[],
        june:[],
        july:[],
        august:[],
        september:[],
        october:[],
        november:[],
        december:[]
    }
    user.find({_id: req.query.userId}).then (result => {
        result.marks.forEach((value) => {
            let mark = JSON.parse(value);
            switch (mark.date.getMonth()) {
                case 0:
                    statistic.january.push(mark);
                    break;
                case 1:
                    statistic.february.push(mark);
                    break;
                case 2:
                    statistic.march.push(mark);
                    break;
                case 3:
                    statistic.april.push(mark);
                    break;
                case 4:
                    statistic.may.push(mark);
                    break;
                case 5:
                    statistic.june.push(mark);
                    break;
                case 6:
                    statistic.july.push(mark);
                    break;
                case 7:
                    statistic.august.push(mark);
                    break;
                case 8:
                    statistic.september.push(mark);
                    break;
                case 9:
                    statistic.october.push(mark);
                    break;
                case 10:
                    statistic.november.push(mark);
                    break;
                case 11:
                    statistic.december.push(mark);
                    break;
            }
        });
        res.send(statistic);
    });
})


module.exports = router;