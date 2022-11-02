const express = require("express");
const router = express.Router();

const { verifyAuthenticated, addUserToLocals } = require("../middleware/auth-middleware.js");

const usersDao = require("../modules/users-dao.js");

// Whenever we navigate to /, verify that we're authenticated. If we are, render the home view.
router.get("/", verifyAuthenticated, async function (req, res) {

    //insert code to load articles

    res.render("home");
});

// navigate to update personal information page, add user info to input value using'addUserToLocals'
router.get("/updateAccount",addUserToLocals, function(req, res){
  
    res.render("update");

});


//BELOW NEEDS TO REVIEW
//req updated info from update form and update to database
router.post("/updateAccount", async function (req,res){
    
    const userInfo = res.locals.user;

    const newUserInfo = {
        username: req.body.username,
        // password: userInfo.password,
        fname: req.body.fname,
        lname: req.body.lname,
        dateOfBirth: req.body.dateOfBirth,
        description: req.body.description,
        // authToken: userInfo.authToken,
    };
    console.log(newUserInfo);
    
        await usersDao.updateUserInfomation(newUserInfo,userInfo.id);
        // res.locals.user = newUserInfo;
        res.setToastMessage("Your personal information is updated!"); //the tosemessage needs to be in profil handlebars
        res.redirect("/updateAccount"); //this can be direct to my profil, (done by annie)

});

//navigate to updatepassword page
router.get("/updatePassword", function(req, res){
  
    res.render("updatePassword");

});

// password update
router.post("/updatePassword", async function(req, res){
  
    //verify password
    //hash password
    //update database

});

module.exports = router;