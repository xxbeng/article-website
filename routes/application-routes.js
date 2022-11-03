const express = require("express");
const router = express.Router();

const { verifyAuthenticated, addUserToLocals } = require("../middleware/auth-middleware.js");

const articlesDao = require("../modules/articles-dao.js");

// Whenever we navigate to /, verify that we're authenticated. If we are, render the home view.
router.get("/", async function (req, res) {

    const articles = await articlesDao.retrieveAllArticles();
    res.locals.articles = articles;
    res.locals.homePage = true;

    res.render("article-display"); //home needs modification - article-display as reference maybe?
});

//verify user logged in before loading user articles
router.get("/myProfile", verifyAuthenticated, async function (req, res) {

    //insert code to load user articles in their profile page
    const user = res.locals.user;
    const articles = await articlesDao.retrieveArticlesByUser(user.id);
    res.locals.articles = articles;
    res.locals.profilePage = true;

    res.render("article-display");
});

//verify user logged in before creating article
router.get("/newArticle", async function (req, res) {

    res.locals.newArticlePage = true;

    res.render("new-article");

});

//add new article and redirect to profile
router.post("/newArticle", async function (req, res) {

    const user = res.locals.user;

    const article = {
        title: req.body.title,
        content: req.body.content,
        userId: user.id
    };

    await articlesDao.createArticle(article);

    res.redirect("./myProfile");
});

//edit article - get article details into text editor
router.get("/edit-*", async function (req, res) {
    
    const url = req.originalUrl;
    const urlArray = url.split("-");
    const articleId = urlArray[1];

    const article = await articlesDao.retrieveArticle(articleId);
    res.locals.article = article;

    res.render("new-article");

});

//edit article - update in db
router.post("/edit-*", async function (req, res) { 
    const url = req.originalUrl;
    const urlArray = url.split("-");
    const articleId = urlArray[1];

    const retrievedArticle = await articlesDao.retrieveArticle(articleId);
    
    const article = {
        id: retrievedArticle.id,
        title: req.body.title,
        content: req.body.content
    };

    await articlesDao.updateArticle(article);

    res.redirect("./myProfile");
});

//delete article selected
router.get("/delete-*", async function (req, res) {
    const url = req.originalUrl;
    const urlArray = url.split("-");
    const articleId = urlArray[1];

    await articlesDao.deleteArticle(articleId);

    res.redirect("./myProfile");
});




module.exports = router;