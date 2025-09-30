const express = require('express');
const router = express.Router();

const articleControllerClass  = require('../../controllers/admin/article');
const articleController = new articleControllerClass();

const { authRequired, requireRole } = require('../../auth/auth');

router.get('/', authRequired, requireRole('admin'), (req, res) => {
    articleController.getAdminArticles(req, res);
});

router.get('/article/create', (req, res) => {
    articleController.getCreateNewArticle(req, res);
});

router.post('/article/create', (req, res) => {
    articleController.createNewArticle(req, res);
});

router.get('/edit/:id', (req, res) => {
    articleController.getEditArticle(req, res);
});


router.post('/article/edit/:id', (req, res) => {
    articleController.updateArticle(req, res)
});

router.post('/article/delete/:id', (req, res) => {
    articleController.deleteArticle(req, res)
});

module.exports = router;