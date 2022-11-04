const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
    dest: "temp"
});
const fs = require("fs");

const { verifyAuthenticated, addUserToLocals } = require("../middleware/auth-middleware.js");

const articlesDao = require("../modules/articles-dao.js");
const commentDao = require("../modules/comments-dao.js");
//const { appendConstructorOption } = require("jimp/types/index.js");

// Whenever we navigate to /, verify that we're authenticated. If we are, render the home view.
router.get("/", async function (req, res) {

    const articles = await articlesDao.retrieveAllArticles();
    res.locals.articles = articles;
    res.locals.homePage = true;
    res.locals.title = 'Home';

    res.render("home"); //home needs modification - article-display as reference maybe?
});

//verify user logged in before loading user articles
router.get("/myProfile", verifyAuthenticated, async function (req, res) {

    //insert code to load user articles in their profile page
    const user = res.locals.user;
    const articles = await articlesDao.retrieveArticlesByUser(user.id);
    res.locals.articles = articles;
    res.locals.profilePage = true;
    res.locals.title = 'My Profile';

    res.render("article-display");
});

//verify user logged in before creating article
router.get("/newArticle", async function (req, res) {

    res.locals.newArticlePage = true;
    res.locals.title = 'Create New Article';

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
    res.locals.title = article.title;

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

//click to view one article in page (set up for comments)
router.get("/article-*", async function (req, res) {
    const url = req.originalUrl;
    const urlArray = url.split("-");
    const articleId = urlArray[1];
    const article = await articlesDao.retrieveArticle(articleId);
    res.locals.article = article;

    const comments = await commentDao.retrieveAllCommentsByArticle(articleId);
    res.locals.comments = comments;

    res.render("single-article");
});


//upload image to files when user adds to their article
router.post("/uploadImage", upload.single("file"), function(req, res) {
    const fileInfo = req.file;
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/${fileInfo.originalname}`;
    fs.renameSync(oldFileName,newFileName);
    const imgUrl = {
        location: `/images/${fileInfo.originalname}`
    };

    res.json(imgUrl);
    
});

//comment on article
router.post("/comment-*", async function (req, res) {
    
    const user = res.locals.user;
    const url = req.originalUrl;
    const urlArray = url.split("-");
    const articleId = urlArray[1];

    const comment = {
        content: req.body.comment,
        articleId: parseInt(articleId),
        userId: user.id
    };

    await commentDao.createComment(comment);
    res.setToastMessage("Comment has been posted!");

    res.redirect(`./article-${articleId}`);

});



module.exports = router;