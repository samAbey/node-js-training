const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

function validateMovie (movie) {

    const validationSchema = {
        "title": Joi.string().min(5).max(255).required(),
        "numberInStock": Joi.number().min(0).max(255).required(),
        "dailyRentalRate": Joi.number().min(0).max(255).required(),
        "genreId": Joi.string().required()
    }

    return Joi.validate(movie, validationSchema);
}

module.exports = {
    Movie,
    validateMovie
}