const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = new express();

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:'+process.env.dbAdmin+'@cluster0.dkanu.mongodb.net/users', {
            useNewUrlParser: true,
            useFindAndModify:false,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log('Server has been started...');
        })
    } catch (error) {
        console.log(error);
    }
}
app.use('/', require('./routes/users'));

start();
