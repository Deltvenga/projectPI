const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.SERVER_PORT || 3001;

const app = new express();
app.use(cors());

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:lazeradmin@cluster0.dkanu.mongodb.net/moneyKeeper', {
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
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/Users'));

start();
