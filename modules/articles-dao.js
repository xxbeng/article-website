const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");


/// create article in db
async function createArticle(article) {
    const db = await dbPromise;

    await db.run(
        SQL`INSERT INTO articles (title, content, userId, articleDescription) VALUES
        (${article.title}, ${article.content}, ${article.userId}, ${article.articleDescription})`
    );
};

//get all articles by specific user from db
async function retrieveArticlesByUser(userId) {
    const db = await dbPromise;

    const articles = await db.all (
        SQL`SELECT *
        FROM articles
        WHERE userId = ${userId}
        ORDER BY timestamp DESC`
    );

    return articles;
};

//retrieve all articles by timestamp order
async function retrieveAllArticles() {
    const db = await dbPromise;

    const articles = await db.all (
        SQL`SELECT *
        FROM articles
        ORDER BY timestamp DESC`
    );

    return articles;
};

//retrieve specific article with article id
async function retrieveArticle(articleId) {
    const db = await dbPromise;

    const article = await db.get (
        SQL`SELECT * 
        FROM articles
        WHERE id = ${articleId}`
    );

    return article;
};

//edit existing article
async function updateArticle(article) {
    const db = await dbPromise;

    await db.run(
        SQL`update articles
        set title = ${article.title}, content = ${article.content}, articleDescription = ${article.articleDescription}
        where id = ${article.id}`
    );
};

//delete a single article
async function deleteArticleByUser(id) {
    const db = await dbPromise;

    await db.run (
        SQL`DELETE FROM articles
        WHERE id = ${id}`
    );
};

//delete all articles from user
async function deleteAllArticlesByUser(userId) {
    const db = await dbPromise;

    await db.run (
        SQL`DELETE FROM articles
        WHERE userId = ${userId}`
    );
};





module.exports = {
    createArticle,
    retrieveArticlesByUser,
    retrieveAllArticles,
    retrieveArticle,
    updateArticle,
    deleteArticleByUser,
    deleteAllArticlesByUser,
    // getUsernameByArticleUserId
};