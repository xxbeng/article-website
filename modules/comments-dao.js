const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

//insert comment created into the database
async function createComment(content, articleId, userId) {
    const db = await dbPromise;

    await db.run(SQL`
        insert into comments (content, datenTime, articleId, userId)
        values(${content}, datetime('now'), ${articleId}, ${articleId}) `);

}

