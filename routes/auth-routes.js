const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
// require users-dao and articles-dao
const userDao = require("../modules/users-dao.js");
const articlesDao = require("../modules/articles-dao.js");
// require middleware
const { verifyAuthenticated, addUserToLocals } = require("../middleware/auth-middleware.js");

// Account creation
router.get("/newAccount", function (req, res) {
    res.locals.title = 'New Account';
    res.render("new-account");
})

// req account info from input
router.post("/newAccount", async function (req, res) {

    const plainpassword = req.body.password;
    const password = bcrypt.hashSync(plainpassword, saltRounds);
   
    const user = {
        username: req.body.username,
        password: password,
        fname: req.body.fname,
        lname: req.body.lname,
        dateOfBirth: req.body.dateOfBirth,
        description: req.body.description,
        icon: req.body.profileAvatar,
    };

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

    res.json(allUsernames);
})

// Whenever we navigate to /login, if we're already logged in, redirect to "/".
// Otherwise, render the "login" view.
router.get("/login", function (req, res) {

    res.locals.title = 'Log in';

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
    if (user == undefined) {
        res.locals.user = null;
        res.setToastMessage("User does not exist!");
        res.redirect("./login");
    }
    else{
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
    }}
});

// Whenever we navigate to /logout, delete the authToken cookie.
// redirect to "/login", supplying a "logged out successfully" message.
router.get("/logout", function (req, res) {
    res.clearCookie("authToken");
    res.locals.user = null;
    res.setToastMessage("Successfully logged out!");
    res.redirect("./login");
});

// navigate to update personal information page, add user info to input value using'addUserToLocals'
router.get("/updateAccount",addUserToLocals, function(req, res){

    res.locals.title = 'Update Account';
    res.render("update");
});

//  updated info from update form and update to database
router.post("/updateAccount", async function (req,res){
    
    const userInfo = res.locals.user;
    const usernameSubmit = req.body.username;

    // check if username is already taken 
    const checkUser = await userDao.checkUsernameAvailable(usernameSubmit);

    if (checkUser && userInfo.id != checkUser.id) {
        res.setToastMessage("Username exists, please choose another one!");
        res.redirect("./updateAccount");
    }
    else{

        //save new input in array
        const nupdateUserInfo = {
            username: req.body.username,
            fname: req.body.fname,
            lname: req.body.lname,
            dateOfBirth: req.body.dateOfBirth,
            description: req.body.description,
            icon: req.body.profileAvatar,
        };

        //update data base with new info and its original id
        await userDao.updateUserInformation(nupdateUserInfo, userInfo.id);
        res.setToastMessage("Your personal information has been updated!"); 
        res.redirect("/myDetail"); //direct to my detail
    }
});

//navigate to updatepassword page
router.get("/updatePassword", function(req, res){
    
    res.locals.title = 'Update Password';
    res.render("update-password");

});

// password update
router.post("/updatePassword", async function(req, res){
  
    const userInfo = res.locals.user;
    const plainpassword = req.body.password;
    const re_enter = req.body.rePassword;

    //verify password
    if (plainpassword != re_enter){
        res.setToastMessage("Password and re-enter password do not match, please enter again!");
        res.redirect("./updatePassword"); //direct to update password
    }
    
    //hash password and update to database
    else{
        const password = bcrypt.hashSync(plainpassword, saltRounds);
        await userDao.updatePassword(password, userInfo.id);
        res.setToastMessage("Password is updated!");
        res.redirect("./myDetail"); //direct to my detail
    }

});

// navigate to my details page
router.get("/myDetail", addUserToLocals, function(req, res){

    res.locals.myDetailPage = true;
    res.locals.title = 'My Detail';
    res.render("my-detail");

});

// delete account and related articles
router.get("/deleteAccount", async function(req, res){
  
    const userInfo = res.locals.user;
    // await articlesDao.deleteArticle(userInfo.id); //delete all articles relate to user
    await userDao.deleteUser(userInfo.id); //delete user from database

    res.redirect("/");

});

module.exports = router;