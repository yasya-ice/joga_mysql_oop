const articleDbModel = require('../../models/article');
const authorDbModel = require('../../models/author');
const articleModel = new articleDbModel();
const authorModel = new authorDbModel();

class adminArticleController {
    
    async getAdminArticles(req, res) {
        try {
            const articles = await articleModel.findAll();
            res.render('admin/view', { articles: articles });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch articles' });
        }
    }

    async getCreateNewArticle(req, res) {
        try {
            res.render('admin/create');
        } catch (error) {
            res.status(500).json({ error: 'Failed to load create article form' });
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
            res.redirect('/admin');
            
        } catch (error) {
            res.status(500).json({ error: 'Failed to create article' });
        }
    }

    async getEditArticle(req, res) {
        try {
            const articleId = req.params.id;
            const article = await articleModel.findById(articleId);
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }
            if(article.author_id !== null){
                const author = await authorModel.findById(article.author_id); 
                article.author = author;
            } else {
                const authors = await authorModel.findAll();
                article.authors = authors;
            }           
            res.render('admin/edit', { article: article });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }   

    async updateArticle(req, res) {
        try {
            const articleId = req.params.id;
            const articleData = req.body;

            await articleModel.update(articleId, articleData);
            res.redirect('/admin');
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

            res.redirect('/admin');
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}

module.exports = adminArticleController;