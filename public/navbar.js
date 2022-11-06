window.addEventListener("load", function() {
//navbar dropdpwn when responsive
const icon = document.querySelector(".icon");
const navbar = document.querySelector("#navbar");

console.log (icon,navbar);

icon.addEventListener("click", function(){
    if (navbar.className === "topnav") {
        navbar.className += " responsive";
    } 
    else{
        navbar.className = "topnav";
    }
});
});