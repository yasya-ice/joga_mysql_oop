const articleDbModel = require('../models/article');
const articleModel = new articleDbModel();

class articleController {
    async getAllArticles(req, res) {
        try {
            const articles = await articleModel.findAll();
            res.status(201).json({articles: articles } );
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch articles' });
        }
    }

    async getArticleBySlug(req, res) {
        try {
            const article = await articleModel.findOne(req.params.slug);
            res.status(201).json({article: article } );
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch article data' });
        }
    }
}

module.exports = articleController;