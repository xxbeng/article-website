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
const { emitWarning } = require("process");
// const { appendConstructorOption } = require("jimp/types/index.js");

// Whenever we navigate to /, verify that we're authenticated. If we are, render the home view with all articles.
router.get("/", async function (req, res) {

    // res articles info to home page
    const articles = await articlesDao.retrieveAllArticles();
    res.locals.articles = articles;
    res.locals.homePage = true;

    // // res username of articles 
    // const articleCard = res.locals.articles;
    // const articleUsername = await articlesDao.getUsernameByArticleUserId(articleCard.userId);
    // res.locals.username = articleUsername;

    // console.log(articleCard);
    // console.log(articleCard.userId);
    // console.log(articleUsername);

    res.locals.title = 'Home';
    res.render("home");
});


//verify user logged in before loading user articles in profile
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
router.get("/newArticle", verifyAuthenticated, async function (req, res) {

    res.locals.newArticlePage = true;
    res.locals.title = 'Create New Article';

    res.render("new-article");

});

//add new article only if title has been inputted and redirect to profile
router.post("/newArticle", async function (req, res) {

    const user = res.locals.user;
    const article = {
        title: req.body.title,
        content: req.body.content,
        userId: user.id,
        articleDescription:req.body.articleDescription,
    };



    if (article.title == '') {
        res.locals.newArticle = article;
        res.locals.toastMessage = "Your title cannot be empty!";
        
        res.render("new-article");
    }
    else {
        await articlesDao.createArticle(article);

        res.setToastMessage("Your article has been published!");

        res.redirect("./myProfile");
    }
});

//edit article - get specific article details into text editor for modification purposes
router.get("/edit", async function (req, res) {
    
    const articleId = req.query.articleId;

    const article = await articlesDao.retrieveArticle(articleId);
    res.locals.article = article;
    res.locals.title = article.title;

    res.render("new-article");

});

//save changes made to an existing article title and content to db and show new article when redirected to profile page
router.post("/edit", async function (req, res) { 

    const articleId = req.query.articleId;
    const retrievedArticle = await articlesDao.retrieveArticle(articleId);
    
    const article = {
        id: retrievedArticle.id,
        title: req.body.title,
        content: req.body.content,
        articleDescription:req.body.articleDescription,
    };

    await articlesDao.updateArticle(article);

    res.setToastMessage("Your article has been edited successfully!");

    res.redirect("./myProfile");
});

//delete selected article and all comments associated with that article
router.get("/delete", async function (req, res) {

    const articleId = req.query.articleId;

    await commentDao.deleteAllCommentsByArticle(articleId);
    await articlesDao.deleteArticleByUser(articleId);
    
    res.redirect("./myProfile");
});

//click to view one article in page (set up for comments)
router.get("/article", async function (req, res) {

    const user = res.locals.user;
    const articleId = req.query.articleId;
    const article = await articlesDao.retrieveArticle(articleId);
    res.locals.article = article;
    if (user) {
        if (user.id == article.userId) {
            res.locals.isUserArticle = true;
        }
        else {
            res.locals.isUserArticle = false;
        };
    } 
    else {
        res.locals.isUserArticle = false
    };

    const comments = await commentDao.retrievRootCommentByArticle(articleId);

    res.locals.comments = comments;
    res.locals.title =" Single Article";
    res.render("single-article");
});

//send all the child comments as a Json to client side
router.get("/articlecomment", async function (req, res) {
    const articleId = req.query.articleId;

    const comments = await commentDao.retrievRootCommentByArticle(articleId);
    async function FindChildComment(comment){

        const childComment = await commentDao.retrieveCommentReplyComment(comment.id)

        if (childComment.length !== 0) {
            comment.childComments = childComment; 
            for (const comment of childComment){
                await FindChildComment(comment);
            }
         
        }

        
    }

    for (const comment of comments){
        await FindChildComment(comment);
    }

    res.locals.comments = comments;
    
    res.json(comments);
});


//upload image to files when user adds to their article
router.post("/uploadImage", upload.single("file"), function(req, res) {
    const fileInfo = req.file;
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/articles/${fileInfo.originalname}`;
    fs.renameSync(oldFileName,newFileName);
    const imgUrl = {
        location: `/images/articles/${fileInfo.originalname}`
    };

    res.json(imgUrl);
    
});

//comment on article and redirect to article to see new comment added
router.post("/comment", async function (req, res) {
    try
    {const user = res.locals.user;

    const articleId = req.query.articleId;

    const comment = {
        content: req.body.comment,
        articleId: articleId,
        userId: user.id,
        username: user.username
    };

    await commentDao.createComment(comment);
    res.setToastMessage("Comment has been posted!");

    
    res.redirect(`./article?articleId=${articleId}`);
    
    }
    
    catch(err) {
       res.setToastMessage("You need to login to be able to comment!");
        res.redirect("/login"); 
    }
    
});

//when a comment to comment is created, add it into database and redirect to see comment added
router.post("/commentToComment", async function (req, res) {
        try{
        const user = res.locals.user;
        const articleId = req.query.articleId;
    

        const comment = {
        content: req.body.comment,
        articleId: parseInt(articleId),
        userId: user.id,
        username: user.username
        };

        const senderId = await commentDao.createComment(comment);
        const receiverId = req.query.commentId;
        await commentDao.createCommentToComment(receiverId,senderId);
        
        res.redirect(`./article?articleId=${articleId}`); 
    }
    catch(err) {
        res.setToastMessage("You need to login to be able to comment!");
         res.redirect("/login"); 
     }
    
});



module.exports = router;