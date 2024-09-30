const PORT = 3000;

const express = require('express');
const morgan = require('morgan'); //For debugging and monitoring
const mongodb = require('mongodb');
const mongoose = require('mongoose')

const app = express();

const dbURI = 'mongodb+srv://slowmonkey:test123456@slowmonkey.8xls6.mongodb.net/productivity?retryWrites=true&w=majority&appName=SlowMonkey';
mongoose.connect(dbURI)
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err))


// Register view engine
app.set('view engine', 'ejs');

// Middleware & Static for permissions - Makes files in public folder accessible
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true})); //POST undefined if you leave this out

app.use(morgan('dev'));


// 404 
app.use((req, res) => {
    res.status(404).render('404', { name: '404'})
});