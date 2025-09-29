const express = require('express');
const router = express.Router();

const userControllerClass  = require('../controllers/user');
const userController = new userControllerClass();

router.post('/register', (req, res) => {
    userController.register(req, res);
});

router.post('/login', (req, res) => {
    userController.login(req, res);
});

router.post('/logout', (req, res) => {
    userController.logout(req, res);
});

module.exports = router;