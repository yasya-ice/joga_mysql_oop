const express = require('express');
const router = express.Router();

const ArticleController = require('../controllers/article');
const articleController = new ArticleController();

router.get('/', (req, res) => articleController.getAllArticles(req, res));
router.get('/article/:slug', (req, res) => articleController.getArticleBySlug(req, res));

module.exports = router;