const ArticleModel = require('../models/article');
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
    async updateArticle(req, res) {
        try {
            const articleId = req.params.id;
            const articleData = req.body;

            await articleModel.update(articleId, articleData);

            res.status(200).json({
                message: `Article with ID ${articleId} updated successfully.`,
                article: { id: articleId, ...articleData }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
     async deleteArticle(req, res) {
        try {
            const articleId = req.params.id;

            const affectedRows = await articleModel.delete(articleId);

            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Article not found' });
            }

            res.status(200).json({
                message: `Article with ID ${articleId} deleted successfully.`
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = articleController;