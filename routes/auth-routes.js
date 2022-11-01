const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
// require users-dao
const userDao = require("../modules/users-dao.js");

// Account creation
router.get("/newAccount", function (req, res) {
    res.render("new-account");
})

router.post("/newAccount", async function (req, res) {

    const plainpassword = req.body.password;
    const password = bcrypt.hashSync(plainpassword, saltRounds);

    const user = {
        username: req.body.username,
        password: password,
        fname: req.body.fname,
        lname: req.body.lname,
        dateOfBirth: req.body.dateOfBirth,
        description: req.body.description
    };

    console.log(user);
//make sure the username is unique
    try {
        await userDao.createUser(user);
        res.setToastMessage("Account creation successful. Please login using your new credentials.");
        res.redirect("/login");
    }
    catch (err) {
        res.setToastMessage("That username was already taken! Please use another username");
        res.redirect("/newAccount");
    }

});

//sent to client side all usernames in database
router.get("/getAllUsernames", async function (req, res) {
    const allUsernames = await userDao.retrieveAllUsernames();
    console.log(allUsernames);
    res.json(allUsernames);
})

// Whenever we navigate to /login, if we're already logged in, redirect to "/".
// Otherwise, render the "login" view.
router.get("/login", function (req, res) {

    if (res.locals.user) {
        res.redirect("/");
    }

    else {
        res.render("login");
    }

});



// Whenever we POST to /login, check the username and password submitted by the user.
// If they match a user in the database, give that user an authToken, save the authToken
// in a cookie, and redirect to "/". Otherwise, redirect to "/login", with a "login failed" message.
router.post("/login", async function (req, res) {

    // Get the username and user password submitted in the form
    const username = req.body.username;
    const userPassword = req.body.password;

    // Get user from database by username input 
    const user = await userDao.retrieveUserByUsername(username);

    // If no user exists
    if (!user) {
        res.locals.user = null;
        res.setToastMessage("User does not exist!");
        res.redirect("./login");
    }

    // Compare input password and hashed password
    const isvalid = await bcrypt.compareSync(userPassword, user.password); 

    // if there is a matching user...
    if (isvalid == true) {
        // Auth success - give that user an authToken, save the token in a cookie, and redirect to the homepage.
        const authToken = uuid();
        user.authToken = authToken;
        await userDao.updateUser(user);
        res.cookie("authToken", authToken);
        res.locals.user = user;
        res.redirect("/");
    }

    // Otherwise, if there's no matching user...
    else {
        // Auth fail
        res.locals.user = null;
        res.setToastMessage("Authentication failed!");
        res.redirect("./login");
    }
});

// Whenever we navigate to /logout, delete the authToken cookie.
// redirect to "/login", supplying a "logged out successfully" message.
router.get("/logout", function (req, res) {
    res.clearCookie("authToken");
    res.locals.user = null;
    res.setToastMessage("Successfully logged out!");
    res.redirect("./login");
});




module.exports = router;