const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const userModel = new UserModel();

class UserController {
    async register(req, res) {
        try {
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
}

module.exports = UserController;