const SQL = require("sql-template-strings");
const { retrieveArticlesByUser } = require("./articles-dao.js");
const dbPromise = require("./database.js");

//insert comment created into the database
async function createComment(comment) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        insert into comments (content, articleId, userId)
        values(${comment.content}, ${comment.articleId}, ${comment.userId})`
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

async function createCommentToComment(cReceiverId, cSenderId) {
    const db = await dbPromise;

    await db.run(SQL`
    insert into cToC (cReceiverId, cSenderId)
    values(${cReceiverId}, ${cSenderId})`
    );
}

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
module.exports = {
    createComment,
    retrievRootCommentByArticle,
    createCommentToComment,
    retrieveCommentReplyComment
};