const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel {
    constructor() {
        super('article');
    }

    async findOne(slug) {
        const result = await super.findOne('slug', slug);
        return result;
    }

    async findMany(author) {
        const result = await super.findMany('author_id', author.id);
        return result;
    }
} 

module.exports = ArticleModel;