window.addEventListener("load", function() {
    //create a global variable to store username json
    let usernameJsonGlobal;
    
    //async function to retrieve username json 
    async function fetchUsername() {
        const response = await fetch("./getAllUsernames");
        const usernameJson = await response.json();  
        usernameJsonGlobal = usernameJson;
        return usernameJsonGlobal;
    }   
    
    fetchUsername();
    
    //select what user has typed into the input field and comparing it to existing usernames. 
    const usernameInput = document.querySelector("#txtUsername");
    
    usernameInput.addEventListener("input", function(){
        
        usernameInput.style.border = "5px solid green";
        usernameJsonGlobal.forEach(function(user){
            if (usernameInput.value == user.username) {
            document.querySelector("#unique-user-note").innerHTML = "this username name has been taken, please try something else";
            usernameInput.style.border = "5px solid red";
            }
        })
    
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
    