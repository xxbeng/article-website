let articleIdGlobal;

window.addEventListener("load", function() { 
    async function fetchChildComment(articleId) {
        articleIdGlobal = articleId;
        const response = await fetch(`./articlecomment-${articleId}`);
        const childCommentJson =  await response.json();
    
        return childCommentJson;
    }
    
    function displayChildComment (comment, level, element) {
        let newelement = document.createElement("div");
        newelement.innerHTML =  `
        <table class="commentsTable">
        <thead>
            <tr>
                <th>Date / Time</th>
                <th>User</th>
                <th>Content</th>
            </tr>
        </thead>
        <tbody>
            
            <table id="eachComment">
            <tr>
                <td>${comment.datenTime}</td>
                <td>${comment.userId}</td>
                <td>${comment.content}</td>
            </tr>
            
            <tr>
                <td>
                <button onclick="commentReply(this)" id="reply-${comment.id}">reply</button>
    
                <form id="form-${comment.id}" action="./commentToComment-${articleIdGlobal}-${comment.id}" method="post" style="display: none;">
                    <div id="commentSection">
                        <textarea name="comment" id="tinyComment"></textarea>
                    </div>
                    <button type="submit">Add Comment</button>
                </form> 
                </td>      
            </tr>
            
            </table>
        `
        newelement.style.marginLeft = `${level * 50}px`;
        element.appendChild(newelement); 
       
    
        
        if (comment.childComments) {
            comment.childComments.forEach(comment => displayChildComment(comment, level+1, element)); 
        }
    }
    
    async function loadChildComment() {
        const element = document.getElementById("childComment")
        const articleId = window.location.href.split("-")[1];
        const childComments = await fetchChildComment(articleId);
        for (const childComment of childComments) {
            displayChildComment (childComment, 0, element);
        }
        
    }
    
    loadChildComment();
});

function commentReply(element) {
    const receiverId = element.id.split("-")[1];
    const form =  document.querySelector(`#form-${receiverId}`);
    form.style.display = "";

}