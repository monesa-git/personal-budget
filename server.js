const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// app.use('/',express.static('public'));

const fs = require('fs');



app.get('/budget',(req, res) => {
    fs.readFile('dataset.json', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
 });

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:3000');
});