const express = require('express');
var bodyParser = require('body-parser');

const mongoose = require('mongoose')
const route = require('./routes/route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', route);

mongoose.connect("mongodb+srv://TSDB:TSDB123@cluster0.s97ln.mongodb.net/chat", { useNewUrlParser: true })
    .then(() => console.log('Encrypted Chat Server - DB connected'))
    .catch(err => console.log(err))
  

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});