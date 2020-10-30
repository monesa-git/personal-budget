const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const mongoose = require("mongoose")
const nameModel = require("./public/models/names_schema")

var validator = require('validator');

const bodyParser = require('body-parser');

const { requestBody, validationResult, body, header, param, query } = require('express-validator');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { res, req } = require("express");

let url = 'mongodb://localhost:27017/chart_dataset';

app.use(cors());

// app.use('/',express.static('public'));

const fs = require('fs');
const { request } = require('http');

app.get('/getBudget', (req, res) => {
    mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => {
            console.log("Connected to the Database");
            nameModel.find({})
                .then((data) => {
                    mongoose.connection.close();
                    console.log("Disconnected from Database");
                    return res.status(200).send(data);
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                });
        })
        .catch((connectionError) => {
            console.log(connectionError);
        });
});

app.post('/putBudget', (req, res) => {

    // console.log(req.body.color);
    // console.log(validator.isHexColor(req.body.color));
    // console.log(req.body.color.length);
    console.log(req.body.color.includes("#"));
    if(!req.body.color.includes("#")){
        return res.status(400).send("Color must include # value");
    }
    if(req.body.color.length != 7){
        return res.status(400).send("Color length must be atleast 6");
    }
    if(!validator.isHexColor(req.body.color)){
        return res.status(400).send("Color must be a Hexadecimal value");
    }
    
        mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(() => {
                try {
                    var data = {};
                    data.title = req.body.title;
                    data.budget = req.body.budget;
                    data.color = req.body.color;

                    let newData = new nameModel(data);

                    nameModel.insertMany(newData)
                        .then((newData) => {
                            // console.log(newData);
                            mongoose.connection.close();
                            return res.status(400).send("Record inserted Successfully");
                        })
                        .catch((connectionError) => {
                            mongoose.connection.close();
                            return res.status(400).json({ "error": connectionError.toString() });
                        });
                } catch (error) {
                    mongoose.connection.close();
                    return res.status(400).json({ "error": error.toString() });
                }
            })
            .catch((connectionError) => {
                mongoose.connection.close();
                return res.status(400).json({ "error": connectionError.toString() });
            });
    
});

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:3000');
});