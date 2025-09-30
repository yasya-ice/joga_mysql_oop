const BaseSQLModel = require('./base');
const RoleModel = require('./role');
const roleModel = new RoleModel();

class UserModel extends BaseSQLModel {
    constructor() {
        super('users');
    }
    async findOne(username) {
        const result = await super.findOne('username', username);
        return result;
    }
    async setRole(userId, roleId) {
        const sql = `INSERT INTO user_roles SET role_id = ?, user_id = ?`;
        const result = await this.executeQuery(sql, [roleId, userId]);
        return result.affectedRows > 0;
    }   

    async updateRole(userId, roleId) {
        const sql = `UPDATE user_roles SET role_id = ?, user_id = ?`;
        const result = await this.executeQuery(sql, [roleId, userId]);
        return result.affectedRows > 0;
    }

    async getRoles(userId) {
        const roles = await roleModel.findMany(userId);
        const roleNames = [];
        for (const role of roles) {
            const roleName = await roleModel.getRoleName(role.role_id);
            if (roleName) {
                roleNames.push(roleName);
            }
        }
        return roleNames;
    }
}

module.exports = UserModel;