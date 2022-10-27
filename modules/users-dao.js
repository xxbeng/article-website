const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");


/**
 * Inserts the given user into the database. Then, reads the ID which the database auto-assigned, and adds it
 * to the user.
 * 
 * @param user the user to insert
 */
 async function createUser(user) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        insert into users (username, password, fname, lname, dateOfBirth, description) values(${user.username}, ${user.password}, ${user.fname}, ${user.lname}, ${user.dateOfBirth}, ${user.description})`);

    // Get the auto-generated ID value, and assign it back to the user object.
    user.id = result.lastID;
}



// Export functions.
module.exports = {
    createUser
};

