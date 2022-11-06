Final project &ndash; A personal blogging system &ndash; Starter project
==========
This repository contains a starting point for your team's final project.

Your team should update this README to include the information required, as presented in the project handout available on Canvas.

// requirement in project handout
In addition to your source code, your team repo should also include the following:
1. An SQL script with your CREATE TABLE statements and any initialization data;
2. A README.md file containing the following information:

a. A brief introduction to your webapp

Our webapp has been designed for users who are interested in writing down and noting the things going on in their life. It is a diverse blog that allows for any one to express their interests and post whatever it is that they're feeling!

b. A description of the extent to which your team has completed the compulsory
features

Feature One: Users are able to easily create a new account in the webapp by inputting a unique username, password, first name, last name, date of birth, and a description about themselves.
Feature Two: Users who are creating an account and are inputting a username will get a green valid box to show their username is unique and valid immediately, and if not a red box will appear as well as a message indicating username already exists.
Feature Three: Two password input boxes have been added to confirm password during the account creation stage. Passwords must match to be able to proceed, if it doesn't, users will get a message saying it does not match.
Feature Four: During the account creation stage, there are six default icons users can select from to use as their icon image
Feature Five: The webapp has a login and log out button located on the right hand side of the nav bar. If not logged in, the log in will be visible, if user is logged in, the log out button will be visible instead
Feature Six: bcrypt npm package has been installed and password has been hashed to ensure user passwords are encrypted and safe
Feature Seven: Users (both logged in and not) who access the site will be directed to the home page where all articles are viewable. Once logged in, a my profile button will appear on the nav bar, and users are then able to navigate to their own profile page where they can access their own articles.
Feature Eight: When a user is logged in, they will also notice a 'create article' button on the nav bar that will allow them to create new articles. When they navigate to an article which they're the author of, they will also see an Edit and Delete button on the right side of the article to make modification or delete.
Feature Nine: There are three tinymce init text areas - the main editor in the create article page, the title and description in-line text box in the create article page, and the comment input box.
Feature Ten: In the nav bar, there is also a My Details page, and it allows users to customise their personal details - username, first name, last name, birth date, description and icon. Users can also change their password, also having to enter their new password twice before they can submit the change. User's will also see a delete account button where users can delete their personal data as well as all the articles the user has created.
Feature Eleven: The website is responsive where users who are viewing the webapp on a smaller screen will see a compressed version of the site. This includes the nav bar becoming a drop down list, and multi-columned pages become single columned.

c. A description of the extra features your team has implemented

The extra feature implemented in this is the comment feature when an article is navigated to. A text box is available for users who are logged in to add a comment. Users are also able to comment on another comment in the article. Users can add as many comments as they wish and can reply to as many as they wish.

d. Instructions on what the database file (*.db file) should be named

When you open SQLite, click Open Database and find the project-database.db file in the project-group-charcoal-caterpillars folder. Alternatively, if it is not available, click New Database and create a database file in the project-group-charcoal-caterpillars folder and name it as project-database.db

e. Does the marker need to do anything prior to running your webapp, other
than npm install?

run npm install
run sql data - named: sql/project-database-init-script.sql
run npm start

f. Does the marker need to do anything special to run your webapp, other than
running npm start?

Nothing else is required besides the above

g. At least one username / password combination for an existing user in your
system with some already-published articles

1. username = user1, password = password!
2. username = user2, password = password!
3. username = user3. password = password!

h. Any other instructions / comments you wish to make to your markers