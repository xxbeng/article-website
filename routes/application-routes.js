const express = require("express");
const router = express.Router();

const { verifyAuthenticated, addUserToLocals } = require("../middleware/auth-middleware.js");

const usersDao = require("../modules/users-dao.js");
const articlesDao = require("../modules/articles-dao.js");

// Whenever we navigate to /, verify that we're authenticated. If we are, render the home view.
router.get("/", async function (req, res) {

    const articles = await articlesDao.retrieveAllArticles();
    res.locals.articles = articles;
    res.locals.homePage = true;

    res.render("article-display"); //home needs modification - article-display as reference maybe?
});

// navigate to update personal information page, add user info to input value using'addUserToLocals'
router.get("/updateAccount",addUserToLocals, function(req, res){
  
    res.render("update");
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


//BELOW NEEDS TO REVIEW
//req updated info from update form and update to database
router.post("/updateAccount", async function (req,res){
    
    const userInfo = res.locals.user;

    const newUserInfo = {
        username: req.body.username,
        // password: userInfo.password,
        fname: req.body.fname,
        lname: req.body.lname,
        dateOfBirth: req.body.dateOfBirth,
        description: req.body.description,
        // authToken: userInfo.authToken,
    };
    console.log(newUserInfo);
    
        await usersDao.updateUserInfomation(newUserInfo,userInfo.id);
        // res.locals.user = newUserInfo;
        res.setToastMessage("Your personal information is updated!"); //the tosemessage needs to be in profil handlebars
        res.redirect("/updateAccount"); //this can be direct to my profil, (done by annie)

});

//navigate to updatepassword page
router.get("/updatePassword", function(req, res){
  
    res.render("updatePassword");

});

// password update
router.post("/updatePassword", async function(req, res){
  
    //verify password
    //hash password
    //update database

});

module.exports = router;