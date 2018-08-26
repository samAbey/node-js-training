const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');

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
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});