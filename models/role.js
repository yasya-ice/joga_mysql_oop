const BaseSQLModel = require('./base');

class RoleModel extends BaseSQLModel {
    constructor() {
        super('user_roles');
    }

    async findById(userId) {
        const result = await super.findOne('user_id', userId);
        return result;
    }

    async findMany(userId) {
        const result = await super.findMany('user_id', userId);
        return result;
    }

    async getRoleName(roleId) {
        const query = `SELECT name FROM roles WHERE id = ?`;
        const results = await this.executeQuery(query, [roleId]);
        return results[0] ? results[0].name : null;
    }

}       

module.exports = RoleModel;