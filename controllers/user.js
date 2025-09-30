const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const userModel = new UserModel();

class UserController {
    async register(req, res) {
        try {
            const existingUser = await userModel.findOne(req.body.username);
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            if (req.body.password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters long' });
            }

            const cryptPassword = await bcrypt.hash(req.body.password, 10);
            const userData = {
                username: req.body.username,
                email: req.body.email,
                password: cryptPassword
            };
            
            const registeredId = await userModel.create(userData);

            if (registeredId) {
                const user = await userModel.findById(registeredId);
                req.session.user = {
                    username: user.username,
                    user_id: user.id
                };
                res.json({ 
                    message: 'New user is registered', 
                    user: req.session.user 
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    async login(req, res) {
        try {
            const user = await userModel.findOne(req.body.username);
            if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            req.session.user = {
                username: user.username,
                user_id: user.id
            };

            res.json({ 
                    message: 'User is logged in', 
                    user: req.session.user 
                });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async logout(req, res) {
        try {
            if (!req.session) {
                return res.status(200).json({ message: 'Already logged out' });
            }
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ message: 'Could not log out. Please try again.' });
                }
                res.json({ message: 'User is logged out' });
            });
        }   catch (error) {     
            res.json({ message: 'Internal server error' });
        }   
    } 
}

module.exports = UserController;