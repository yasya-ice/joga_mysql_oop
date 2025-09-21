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

     async createNewArticle(req, res) {
        try {
            const newArticle = {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,
                published: new Date().toISOString().slice(0, 19).replace('T', ' '),
                author_id: req.body.author_id
            };
            const insertId = await articleModel.create(newArticle);
            const createdArticle = await articleModel.findById(insertId);
            res.status(201).json({ article: createdArticle });
            
        } catch (error) {
            res.status(500).json({ error: 'Failed to create article' });
        }
    }
}

module.exports = articleController;