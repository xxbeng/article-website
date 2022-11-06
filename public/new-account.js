window.addEventListener("load", function() {
    //create a global variable to store username json
    let usernameJsonGlobal;
    
    //async function to retrieve username json 
    async function fetchUsername() {
        const response = await fetch("./getAllUsernames");
        const usernameJson =  await response.json();  
        usernameJsonGlobal = usernameJson;
        return usernameJsonGlobal;
    }   
    
    fetchUsername();
    
    //select what user has typed into the input field and comparing it to existing usernames. 
    const usernameInput = document.querySelector("#txtUsername");
    
    usernameInput.addEventListener("input", function(){
            usernameInput.style.border = "5px solid green";
            document.querySelector("#unique-user-note").innerHTML='';
            
        usernameJsonGlobal.forEach(function(user){
            if (usernameInput.value == user.username) {
            document.querySelector("#unique-user-note").innerHTML = "This username name has been taken, please try something else";
            usernameInput.style.border = "5px solid red";
            }
        })
    
    });
    
   
    // select password the user has entered in the password and re-enter password field
    const passwordInput = document.querySelector("#txtPassword");
    const rePasswordInput = document.querySelector("#txtRePassword");
    const submitButton = document.querySelector("#submitButton");
    //Check if re-entered password is the same as the password entered when the user has completed the change of re-password field. 
    //i.e. when user has clicked other field
    
    rePasswordInput.addEventListener("change", function(){
        if (passwordInput.value !== rePasswordInput.value) {
            document.querySelector("#password-check-note").innerHTML = "The re-entered password does not match the password you created, please try again"
            submitButton.disabled = true;
        
        }
    
        else{
            document.querySelector("#password-check-note").innerHTML = "";
            submitButton.disabled = false;
            
        }
    });
    
    //display all avatar icons for user to select. Whatever the user has clicked will replace user's profile image.
    const profileImg = document.querySelector("#profileImg");
    const avatarImg = document.querySelectorAll(".avatar");
    const avatarImgLink = document.querySelector("#profileAvatar");
    
    avatarImg.forEach(function(img) {
        img.addEventListener("click", function(){
            profileImg.src = img.src;
            avatarImgLink.value = img.src;
        })
    });
    
    
    
});
   
