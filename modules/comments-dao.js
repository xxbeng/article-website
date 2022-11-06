const SQL = require("sql-template-strings");
const { retrieveArticlesByUser } = require("./articles-dao.js");
const dbPromise = require("./database.js");

//insert comment created into the database
async function createComment(comment) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        insert into comments (content, articleId, userId, username)
        values(${comment.content}, ${comment.articleId}, ${comment.userId},${comment.username})`
        );

   
    return result.lastID;
};

//get all comments in one article
async function retrievRootCommentByArticle(articleId) {
    const db = await dbPromise;

    const comments = await db.all (
        SQL`SELECT *
        FROM comments
        WHERE articleId = ${articleId}
        AND id NOT IN (select cSenderId from cToC)
        ORDER BY datenTime DESC`
    );

    return comments;
}

// add comment to comment into database
async function createCommentToComment(cReceiverId, cSenderId) {
    const db = await dbPromise;

    await db.run(SQL`
    insert into cToC (cReceiverId, cSenderId)
    values(${cReceiverId}, ${cSenderId})`
    );
}

//select child comments
async function retrieveCommentReplyComment (id){
    const db = await dbPromise;
    const repliedComments = await db.all (
        SQL`SELECT *
        FROM comments
        WHERE id in 
        (select cSenderId from cToC 
            WHERE cReceiverId =${id})
        ORDER BY datenTime DESC`
    );

    return repliedComments;
}

//delete ALL comments from article by articleId
async function deleteAllCommentsByArticle(articleId) {
    const db = await dbPromise;

    await db.run (
        SQL`DELETE FROM comments
        WHERE articleId = ${articleId}`
    );
}

module.exports = {
    createComment,
    retrievRootCommentByArticle,
    createCommentToComment,
    retrieveCommentReplyComment,
    deleteAllCommentsByArticle
};