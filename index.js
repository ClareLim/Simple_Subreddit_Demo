const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');
console.log(redditData)

//express.static is something known as a middleware;
//app.use will execute every single req, then we pass in an arg of the folder that we want to serve our assets from
//here we are telling Express that we want to use a directory called public to serve any images or CSS files or scripts and that directory will be in the root directory of our application.
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
// path has a method on it called join, taking current directory name where the file is located, index.js and I am joining that path, the full path to get there, with /views. 
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', { cats })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('not found', { subreddit })
    }
    console.log(data);
    res.render('subreddit', { ...data });
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { num, title: 'random' }) // key value pair
})

app.listen(3000, () => {
    console.log("Listening on Port 3000")
})