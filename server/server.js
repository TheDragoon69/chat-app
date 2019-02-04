const path = require('path');
const express = require('express');

const app = express();

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.get('/', function(req, res){
    res.sendFile('index');
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);


