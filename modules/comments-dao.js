const SQL = require("sql-template-strings");
const { retrieveArticlesByUser } = require("./articles-dao.js");
const dbPromise = require("./database.js");

//insert comment created into the database
async function createComment(comment) {
    const db = await dbPromise;

    await db.run(SQL`
        insert into comments (content, articleId, userId)
        values(${comment.content}, ${comment.articleId}, ${comment.userId})`
        );

};

//get all comments in one article
async function retrieveAllCommentsByArticle(articleId) {
    const db = await dbPromise;

    const comments = await db.all (
        SQL`SELECT *
        FROM comments
        WHERE articleId = ${articleId}
        ORDER BY datenTime DESC`
    );

    return comments;
}

module.exports = {
    createComment,
    retrieveAllCommentsByArticle
};