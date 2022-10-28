const express = require("express");
const router = express.Router();

const { verifyAuthenticated } = require("../middleware/auth-middleware.js");

const usersDao = require("../modules/users-dao.js");

// Whenever we navigate to /, verify that we're authenticated. If we are, render the home view.
router.get("/", verifyAuthenticated, async function (req, res) {

    //insert code to load articles

    res.render("home");
});



module.exports = router;