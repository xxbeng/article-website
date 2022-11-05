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
        insert into users (username, password, fname, lname, dateOfBirth, description, icon) values(${user.username}, ${user.password}, ${user.fname}, ${user.lname}, ${user.dateOfBirth}, ${user.description},${user.icon})`);

    // Get the auto-generated ID value, and assign it back to the user object.
    user.id = result.lastID;
}

/**
 * Gets the user with the given username from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} username the user's username
 */
 async function retrieveUserByUsername(username) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from users
        where username = ${username}`);

    return user;
}

/**
 * Updates the given user in the database, not including auth token
 * 
 * @param user the user to update
 */
 async function updateUser(user) {
    const db = await dbPromise;

    await db.run(SQL`
        update users
        set username = ${user.username}, password = ${user.password},
            fname = ${user.fname}, lname = ${user.lname}, dateOfBirth = ${user.dateOfBirth}, description = ${user.description}, authToken = ${user.authToken}, icon = ${user.icon}
        where id = ${user.id}`);
}

/**
 * Gets an array of all users from the database.
 */
 async function retrieveAllUsers() {
    const db = await dbPromise;

    const users = await db.all(SQL`select * from users`);

    return users;
}

async function retrieveAllUsernames() {
    const db = await dbPromise;

    const usernames = await db.all(SQL`select username from users`);
    
    return usernames;
}

/**
 * Gets the user with the given authToken from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} authToken the user's authentication token
 */
 async function retrieveUserWithAuthToken(authToken) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from users
        where authToken = ${authToken}`);

    return user;
}

/**
 * Updates password with given user,
 * 
 * @param user the user to update
 */
 async function updatePassword(newPassword,id) {
    const db = await dbPromise;

    await db.run(SQL`
        update users
        set password = ${newPassword}
        where id = ${id}`);
}


/**
 * Updates the given user in the database, not including auth token
 * 
 * @param user the user to update
 */

 async function updateUserInformation(user,id) {
    const db = await dbPromise;

    await db.run(SQL`
        update users
        set username = ${user.username}, 
            fname = ${user.fname}, lname = ${user.lname}, dateOfBirth = ${user.dateOfBirth}, description = ${user.description},icon = ${user.icon}
        where id = ${id}`);
}

/**
 * delete userinfo from user id
 */
 async function deleteUser(id) {
    const db = await dbPromise;

    await db.run (
        SQL`delete from users
        where id = ${id}`
    );
}

/**
 * Check if username is already taken in database
 */
 async function checkUsernameAvailable(username) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        SELECT *
        from users
        where username = ${username};`
    );

    return user;
}

// Export functions.
module.exports = {
    createUser,
    retrieveUserByUsername,
    updateUser,
    retrieveAllUsers,
    retrieveUserWithAuthToken,
    updatePassword,
    updateUserInformation,
    retrieveAllUsernames,
    deleteUser,
    checkUsernameAvailable
};

