#Final project; Team project-group-charcoal-caterpillars
==========================================================================================

## Brief introduction of webapp
Our webapp has been designed for users who are interested in writing down and noting the things going on in their life. It is a diverse blog that allows for any one to express their interests and post whatever it is that they're feeling!

## Description of the extent to which your team has completed the compulsory features

1: Users are able to easily create a new account in the webapp by inputting a unique username, password, first name, last name, date of birth, and a description about themselves.

2: Users who are creating an account and inputting a username will get a green valid box to show their username is unique and valid immediately, and if not a red box will appear as well as a message indicating username already exists.

3: Two password input boxes have been added to confirm password during the account creation stage. Passwords must match to be able to proceed, if it doesn't, users will get a message saying it does not match.

4: During the account creation stage, there are six default icons users can select from to use as their icon image.

5: The webapp has a login and log out button located on the right hand side of the nav bar. If not logged in, the log in will be visible, if user is logged in, the log out button will be visible instead.

6: bcrypt npm package has been installed and password has been hashed to ensure user passwords are encrypted and safely stored in database.

7: (both logged in and not) whoever accesses the site will be directed to the home page where all articles are viewable. Once logged in, 'my profile' button will appear on the nav bar, and users are then able to navigate to their own profile page where they can access their own articles.

8: When a user is logged in, they will also notice a 'create article' button on the nav bar that will allow them to create new articles. When they navigate to an article which they're the author of, they will also see an Edit and Delete button on the right side of the article to make modifications or delete.

9: There are three tinymce init text areas - the main editor in the create article page, the title and description in-line text box in the create article page, and the comment input box. Images can easily be uploaded or dragged into textbox through tinymce and stored in the server using multer.

10: In the nav bar, there is also a My Details page, and it allows users to customise their personal details - username, first name, last name, birth date, description and icon. Users can also change their password, also having to enter their new password twice before they can submit the change. User's will also see a delete account button where users can delete their personal data as well as all the articles the user has created.

11: The website is responsive where users who are viewing the webapp on a smaller screen will see a compressed version of the site. This includes the nav bar becoming a drop down list, and multi-columned pages become single columned.

## Description of the extra features 
The extra feature implemented in this is the comment feature when an article is navigated to. A text box is available for users who are logged in to add a comment. Users are also able to comment on another comment in the article. Users can add as many comments as they wish and can reply to as many as they wish.

## Instructions of database file (project-database.db file) 
When you open SQLite, click Open Database and find the project-database.db file in the project-group-charcoal-caterpillars folder. Alternatively, if it is not available, click New Database and create a database file in the project-group-charcoal-caterpillars folder and name it as project-database.db. Select SQL file 'project-database-init-script.sql' from sql folder.

## Prior to running webapp, run and install below

run npm install
run sql data - named: sql/project-database-init-script.sql
run npm start


## Anything special to run your webapp, other thanrunning npm start?
Nothing else is required besides the above

## Existing username and password

1. username = user1, password = password!
2. username = user2, password = password!
3. username = user3, password = password!

## Any other instructions / comments you wish to make to your markers
Have fun with our well functioned webapp!

