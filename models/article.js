const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel {
    constructor() {
        super('article');
    }

    async findOne(slug) {
        const result = await super.findOne('slug', slug);
        return result;
    }
} 

module.exports = ArticleModel;