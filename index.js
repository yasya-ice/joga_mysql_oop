const express = require('express');

const app = express();
app.use(express.json());

const articleRouter = require('./routers/article');
app.use('/', articleRouter);

app.listen(3025, () => {
    console.log('Server running on http://localhost:3025');
});