const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();
// require users-dao
const userDao = require("../modules/users-dao.js");

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

// Account creation
router.get("/newAccount", function (req, res) {
    res.render("new-account");
})

router.post("/newAccount", async function (req, res) {

    const user = {
        username: req.body.username,
        password: req.body.password,
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

module.exports = router;