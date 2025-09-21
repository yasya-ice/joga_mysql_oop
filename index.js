const express = require('express');

const app = express();
app.use(express.json());

const articleRouter = require('./routers/article');
const authorRouter = require('./routers/author');

app.use('/', articleRouter);
app.use('/author/', authorRouter);

app.listen(3025, () => {
    console.log('Server running on http://localhost:3025');
});