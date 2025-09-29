const BaseSQLModel = require('./base');

class UserModel extends BaseSQLModel {
    constructor() {
        super('users');
    }
}

module.exports = UserModel;