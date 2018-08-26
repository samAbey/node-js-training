const express = require('express');
const { validateCustomer, Customer } = require('../models/customer');
const router = express.Router();

router.get('/', async (req, res) => {

    const customers = await Customer.find().sort('name');

    res.send(customers);

});

router.post('/', async (req, res) => {
    
    const { error } = validateCustomer(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let customer = new Customer(req.body);

    customer = await customer.save();

    if (!customer) {
        return res.status(500).send('Oops, Something went wrong.');
    }

    res.send(customer);

});

router.put('/:id', async (req, res) => {

    const { error } = validateCustomer(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    if(!updatedCustomer) {
        return res.status(404).send(`The customer with provided id ${req.params.id} does not exist.`);
    }

    res.send(updatedCustomer)

    
});

router.delete('/:id', async (req, res) => {

    const removedCustomer = await Customer.findByIdAndRemove(req.params.id);
    

    if (!removedCustomer) {
        return res.status(404).send(`The customer with provided id ${req.params.id} does not exist.`);
    }

    res.send(removedCustomer);

});

router.get('/:id', (req, res) => {

    Customer.findById(req.params.id)
        .then(customer => {
            res.send(customer)
        })
        .catch(error => {
            res.status(404).send('Customer does not exist.');
        });

});


module.exports = router;