const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.get('/', (req, res) => {
    user.find({}).then(result => {
        res.send(result[0].name);
        console.log(result[0].name);
    });
});


module.exports = router;