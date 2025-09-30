const articleDbModel = require('../models/article');
const authorDbModel = require('../models/author');
const articleModel = new articleDbModel();
const authorModel = new authorDbModel();

class articleController {
    async getAllArticles(req, res) {
        try {
            const articles = await articleModel.findAll();
            res.render('index', { articles: articles });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch articles' });
        }
    }

    async getArticleBySlug(req, res) {
        try {
            const article = await articleModel.findOne(req.params.slug);
            const author = await authorModel.findById(article.author_id);
            article.author = author;
            res. render('article', { article: article });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch article data' });
        }
    };
}

module.exports = articleController;