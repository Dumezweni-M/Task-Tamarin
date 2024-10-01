const PORT = 3000;


const express = require('express');
const morgan = require('morgan'); //For debugging and monitoring
const mongodb = require('mongodb');
const mongoose = require('mongoose')

const Task = require('./models/tasks')

const app = express();

// Const URI
require('dotenv').config();

const dbURI = process.env.DB_URI;

mongoose.connect(dbURI)
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err))


// Register view engine
app.set('view engine', 'ejs');

// Middleware & Static for permissions - Makes files in public folder accessible
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true})); //POST undefined if you leave this out
app.use(morgan('dev'));



//Get items already stored in db
app.get('/', (req, res) => {
    Task.find()
        .then(tasks => {
            res.render('index', {tasks});
        })
        .catch(err => {
            console.log('Zero tasks found dude!: ', err);
            res.status(500).send('Server Error')
        });
});

// New task entry
app.post('/add-task', (req, res) => {
    const task = new Task(req.body);  // Create a new task from the submitted data

    task.save()
        .then(() => {
            res.redirect('/');  // Redirect to the index page after saving
        })
        .catch((err) => {
            console.log('Error saving task:', err);
            res.status(500).send('Server Error');
        });
});




// 404 
app.use((req, res) => {
    res.status(404).render('404', { name: '404'})
});