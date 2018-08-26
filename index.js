const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

// Connect mongoose
mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
    .then(() => {
        console.log('Connected to mongo DB.');
    }).catch(err => {
        console.error(`An unexpected error occured: ${err}`);
    });

const app = express();
app.use(express.json());


app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
    console.clear()
});