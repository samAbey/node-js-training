const express = require('express');
const  { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');

const router = express.Router();

router.get('/', (req, res) => {

    Movie.find().sort('title').then(movies => {
        res.send(movies);
    }).catch(err => {
        res.status(500).send('Internal Server Error');
    })
    
});

router.get('/:id', (req, res) => {

    Movie.findById(req.params.id).then(movie => {
        res.send(movie);
    }).then(err => {
        res.status(404).send('Movie not found');
    });

});

router.post('/', (req, res) => {

    const { error } =  validateMovie(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);

        console.log(req.body)

        console.log(`Errrrrror: ${error}`);
    }

    Genre.findById(req.body.genreId).then( genre => {

        const { body } = req;

        let movie = new Movie({
            title: body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: body.numberInStock,
            dailyRentalRate: body.dailyRentalRate
        });
        
        movie.save().then(movie => {
            res.send(movie);
        }).catch(err => {
            res.status(500).send('Internal Server error')
        });

    }).catch(err => {
        res.status(400).send('Invalid genre');
    });


});

router.put('/:id', (req, res) => {

    const { error } =  validateMovie(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    Genre.findById(req.body.genreId).then(genre => {

        const { body } = req;

        let movie = {
            title: body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: body.numberInStock,
            dailyRentalRate: body.dailyRentalRate
        };

        Movie.findByIdAndUpdate(req.params.id, movie, {new: true}).then(movie => {
            res.send(movie);
        }).catch(err => {
            res.status(400).send('Invalid movie id')
        });

    }).catch(err => {
        res.status(400).send('Invalid genre');
    });
    

});

router.delete('/:id', (req, res) => {

    Movie.findByIdAndRemove(req.params.id).then(movie => {
        res.send(movie);
    }).catch(err => {
        res.status(400).send('Invalid movie id')
    }); 

});

module.exports = router;

