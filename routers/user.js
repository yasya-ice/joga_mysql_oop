const express = require('express');
const router = express.Router();

const userControllerClass  = require('../controllers/user');
const userController = new userControllerClass();

router.post('/register', (req, res) => {
    userController.register(req, res);
});

module.exports = router;