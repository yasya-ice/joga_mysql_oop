const express = require('express');
const sessions = require('express-session');
const hbs = require('express-handlebars');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false 
}));


app.set('views', './views');
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/'
}));

app.use(express.static('public'));

const articleRouter = require('./routers/article');
const authorRouter = require('./routers/author');
const userRoutes = require('./routers/user');

const adminRoutes = require('./routers/admin/article');
app.use('/admin', adminRoutes);

app.use('/', articleRouter);
app.use('/author/', authorRouter);
app.use('/users/', userRoutes);

app.listen(3025, () => {
    console.log('Server running on http://localhost:3025');
});