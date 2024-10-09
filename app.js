require('dotenv').config();

const PORT = 3000;

const express = require('express');
const morgan = require('morgan'); //For debugging and monitoring
const mongodb = require('mongodb');
const mongoose = require('mongoose')
const path = require('path');





const Task = require('./models/tasks')


const app = express();
app.set('views', path.join(__dirname, 'views'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).send('Something went wrong!');
});

// Use environment variables from .env

const dbURI = process.env.MONGO_URI;  // MongoDB URI from .env

mongoose.connect(dbURI)
    .then(result => app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    }))
    .catch(err => console.log('Connection Issues -------->', err));


// Register view engine
app.set('view engine', 'ejs');

// Middleware & Static for permissions - Makes files in public folder accessible
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true})); //POST undefined if you leave this out
app.use(morgan('dev'));

//Get items already stored in db
app.get('/', (req, res) => {
    Task.find()
        .sort({ date: 1 })   // Sort tasks by date
        .then(tasks => {
            res.render('index', { tasks});                
        })
        .catch(err => {
            console.log('Zero tasks found dude!: ', err);
            res.status(500).send('Server Error');
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

// Find and delete entry using id
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id)
        .then(result => {
            res.json( {redirect: '/'});
            console.log('Deleted')
        })
        .catch(err => {
            console.log('Deletion was not successful', err)
            res.status(500).send('Error deleting the task')
        });
});


// 404 
app.use((req, res) => {
    res.status(404).render('404', { name: '404'})
});






