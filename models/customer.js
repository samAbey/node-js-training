const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String, 
        minlength: 5,
        maxlength: 100,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
}));


function validateCustomer(customer) {

    const validationSchema = {
        name: Joi.string().required().min(3),
        phone: Joi.number().required().min(10),
        isGold: Joi.boolean()
    }

    return Joi.validate(customer, validationSchema)
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer
