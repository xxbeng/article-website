let articleIdGlobal;

window.addEventListener("load", function() { 
    async function fetchChildComment(articleId) {
        articleIdGlobal = articleId;
        const response = await fetch(`./articlecomment?articleId=${articleId}`);
        const childCommentJson =  await response.json();
    
        return childCommentJson;
    }
    
    function displayChildComment (comment, level, element) {
        let newelement = document.createElement("div");
        newelement.innerHTML =  `
        <table class="comments-table">

        <tbody>
            
            <tr>
                <td>${comment.content}</td>
            </tr>
            <tr>
                <td class="comment-content">${comment.datenTime}</td>
                <td></td>
                <td class="comment-content">By user: ${comment.username}</td>
                <td></td>
                <td class="comment-content">User Id: ${comment.userId}</td>
            </tr>
                
            <tr>
                <td>
                <button onclick="commentReply(this)" id="reply-${comment.id}">reply</button>
    
                <form id="form-${comment.id}" action="./commentToComment?articleId=${articleIdGlobal}&commentId=${comment.id}" method="post" style="display: none;">
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
        const articleId = window.location.href.split("=")[1];
        const childComments = await fetchChildComment(articleId);
        for (const childComment of childComments) {
            displayChildComment (childComment, 0, element);
        }
        
    }
    
    loadChildComment();

    
});

function commentReply(replyElement) {
    const receiverId = replyElement.id.split("-")[1];
    const form =  document.querySelector(`#form-${receiverId}`);
    form.style.display = "";
}