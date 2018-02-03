var post=document.getElementById("postDetail");

var selectedPost=[];
selectedPost=localSelectedPost();

var post_list=[];
post_list=localStoragePosts();


createPost();


function newLine( postDiv ){
	var newLine=document.createElement("br");
	postDiv.appendChild(newLine);
}

function storePost( post_list ){
	localStorage.posts=JSON.stringify(post_list);
}

function localSelectedPost(){
		if (!localStorage.selectedPosts)
		{
			//default to empty array
			localStorage.selectedPosts= JSON.stringify([]);
		}
	return JSON.parse(localStorage.selectedPosts);
}


function horizontalLine( postDiv ){
	var horizontalLine=document.createElement("hr");
	horizontalLine.setAttribute("style","color:black");
	postDiv.appendChild(horizontalLine);
}


function localStoragePosts(){
	if (!localStorage.posts)
		{
			//default to empty array
			localStorage.posts= JSON.stringify([]);
		}
	return JSON.parse(localStorage.posts);
}
var commentId=0;
var comments=[];
comments=storeIntoLocalStorage();
var flag=0;
var comment_box=0;
var view_comment=0;
function createPost(){
	var divPost=document.createElement("div");
	divPost.setAttribute("id","divPost");
	var title_tag=document.createElement("label");
	title_tag.setAttribute("style","color:blue");
	title_tag.innerHTML="Title : ";
	divPost.appendChild(title_tag);
	
	var title=document.createElement("label");
	title.innerHTML=post_list[selectedPost[0].index].title;
	divPost.appendChild(title);
	
	newLine(divPost);
	newLine(divPost);
	
	var body_tag=document.createElement("label");
	body_tag.setAttribute("style","color:blue");
	body_tag.innerHTML="Body : ";
	divPost.appendChild(body_tag);
	
	var body=document.createElement("label");
	body.innerHTML=post_list[selectedPost[0].index].body;
	divPost.appendChild(body);
	
	newLine(divPost);
	newLine(divPost);
	
	var delete_button=document.createElement("button");
	delete_button.innerHTML="Delete";
	divPost.appendChild(delete_button);
	delete_button.addEventListener("click",function(){
		DeleteAllComment();
		post_list.splice(selectedPost[0].index,1);    //delete comments of this post
		localStorage.selectedPosts= JSON.stringify([]);
		storePost(post_list);
		storeCommentsIntoLocalStorage(comments);
		window.location.assign("indexPage.html");
	});
	
	var edit_button=document.createElement("button");
	edit_button.innerHTML="Edit";
	divPost.appendChild(edit_button);
	edit_button.addEventListener("click",function(){
		window.location.assign("forum.html");
	});
	
	post.appendChild(divPost);
	newLine(divPost);
	//newLine(divPost);
	//newLine(divPost);
	horizontalLine(divPost);
	//newLine(divPost);
	//newLine(divPost);
	var viewComment=document.createElement("a");
	viewComment.setAttribute("id","viewComment");
	viewComment.innerHTML="View Comment";
	viewComment.style.fontSize="19px";
	viewComment.style.cursor="pointer";
	divPost.appendChild(viewComment);
	viewComment.addEventListener("click",function(event){
		if(view_comment==0){
			viewComment.innerHTML="Hide Comment";
			createComment();
			view_comment=1;
		}
		else if(view_comment==1 && viewComment.innerHTML==="Hide Comment")
		{
			viewComment.innerHTML="View Comment";
			commentDiv.parentNode.removeChild(commentDiv);
			addComment.parentNode.removeChild(addComment);
			view_comment=0;
		}
	});
}
function DeleteAllComment()
{
	for(var i=comments.length-1;i>=0;i--)
{
	if(post_list[selectedPost[0].index].id===comments[i].PostId)
	{
	comments.splice(i,1);
	}
}
}
function storeIntoLocalStorage()
{
	if (!localStorage.comments)
{
localStorage.comments = JSON.stringify([]);
}
return JSON.parse(localStorage.comments);
}

//anup's code


function createComment()
{
	var divPost=document.getElementById("divPost");
	
	var commentDiv=document.createElement("div");
	commentDiv.setAttribute("id","commentDiv");
	divPost.appendChild(commentDiv);
	//newLine(divPost);
	//newLine(divPost);
for(var i=0;i<comments.length;i++)
{
	if(post_list[selectedPost[selectedPost.length-1].index].id===comments[i].PostId)
	{
	commentId=comments[i].CommentId;
	AddToCommentDom(comments[i]);
	}
}
var addComment=document.createElement("button");
	addComment.setAttribute("id","addComment");
	addComment.innerHTML="Add Comment";
	divPost.appendChild(addComment);
	//newLine(divPost);
		
		
	addComment.addEventListener("click",function(event){
		if(comment_box==0){
		flag=0;
		hideAllBtn();
		createPostComment();
		comment_box=1;
		}
});
	
		//newLine(divPost);
		}
function createPostComment()
	{
	var postCommentDiv=document.createElement("div");
	postCommentDiv.setAttribute("id","postCommentDiv");
	postCommentDiv.style.backgroundColor="lightgray";
    postCommentDiv.style.width="621px";
    postCommentDiv.style.height="202px";
	postCommentDiv.style.marginTop="20px";
	divPost.appendChild(postCommentDiv);
	newLine(postCommentDiv);
	var comment=document.createElement("textarea");
	comment.setAttribute("id","comment");
	comment.placeholder="Add your comment....";
	comment.setAttribute("type","text");
	comment.style.marginLeft="43px";
	comment.style.height="125px";
	comment.style.width="526px";
	postCommentDiv.appendChild(comment);
	comment.focus();
	newLine(postCommentDiv);
	newLine(postCommentDiv);
	
	var cancelBtn=document.createElement("button");
	cancelBtn.setAttribute("id","cancelBtn");
	cancelBtn.style.marginLeft="44px";
	cancelBtn.innerHTML="Cancel";
	postCommentDiv.appendChild(cancelBtn);
	
	var postbtn=document.createElement("button");
	postbtn.setAttribute("id","postbtn");
	if(flag==0)
	{
	postbtn.innerHTML="Post";
	
		}
		if(flag==1)
		{
			postbtn.innerHTML="Update";
		}
	postCommentDiv.appendChild(postbtn);
	cancelBtn.addEventListener("click",function(event){
		comment_box=0;
		visibleAllBtn();
		deleteDiv();
	});
	if(flag==0)
	{
	postbtn.addEventListener("click",function(event){
	
	if(!comment.value){
		alert("Comment can't be empty");
	}else{
			comment_box=0;
		commentId++;
		AddToCommentArray();
		deleteDiv();
		visibleAllBtn();
		storeCommentsIntoLocalStorage(comments);
	}
	});
	}
	}
	function deleteDiv()
	{
		var childNodes=postCommentDiv.childNodes;
	for(var i=0;childNodes.length>0;)
	{
		postCommentDiv.removeChild(childNodes[i]);
	}
	postCommentDiv.parentNode.removeChild(postCommentDiv);
	}
function AddToCommentDom(obj)
	{
		var commentDiv=document.getElementById("commentDiv");
		
		var createNewDiv=document.createElement("div");
		createNewDiv.setAttribute("id",commentId);

				//newLine(createNewDiv);
				//newLine(createNewDiv);
				
				newLine(createNewDiv);
		var commentValue=document.createElement("label");
		commentValue.innerHTML=obj.value;
		createNewDiv.appendChild(commentValue);
		
		newLine(createNewDiv);
		var cEdit=document.createElement("a");
		cEdit.setAttribute("id","cEdit");
		cEdit.innerHTML="Edit";
		cEdit.style.cursor="pointer";
		createNewDiv.appendChild(cEdit);
			
		cEdit.addEventListener("click",function(event){
			var targetParent=event.target.parentNode;
			var index=getIndex(parseInt(targetParent.id));
			flag=1;
			hideAllBtn();
			document.getElementById("addComment").style.visibility="hidden";
			createPostComment();
			document.getElementById("comment").value=comments[index].value;
			var getIdOfPost=document.getElementById("postbtn");
		getIdOfPost.addEventListener("click",function(event){
		commentValue.innerHTML=document.getElementById("comment").value;
		comments[index].value=document.getElementById("comment").value;
		deleteDiv();
		visibleAllBtn();
		cEdit.focus();
			document.getElementById("addComment").style.visibility="visible";
		storeCommentsIntoLocalStorage(comments);
		
		});
	var getIdOfCancelBtn=document.getElementById("cancelBtn");
	getIdOfCancelBtn.addEventListener("click",function(event){
			visibleAllBtn();
			cEdit.focus();
			document.getElementById("addComment").style.visibility="visible";
	});
		});
		
		var cDelete=document.createElement("a");
		cDelete.setAttribute("id","cDelete");
		cDelete.innerHTML="Delete";
		cDelete.style.cursor="pointer";
		cDelete.style.marginLeft="28px";
		createNewDiv.appendChild(cDelete);
		
		cDelete.addEventListener("click",function(event){
			var targetParent=event.target.parentNode;
			var index=getIndex(parseInt(targetParent.id));
			removeFromCommentArray(index);
			targetParent.parentNode.removeChild(targetParent);
			storeCommentsIntoLocalStorage(comments);
		});
		horizontalLine(createNewDiv);
			commentDiv.appendChild(createNewDiv);
	}
	function removeFromCommentArray(index)
	{
		comments.splice(index,1);
		storeCommentsIntoLocalStorage(comments);
	}
	function getIndex(id)
	{
		for(var i=0;i<comments.length;i++)
		{
			if(post_list[selectedPost[selectedPost.length-1].index].id===comments[i].PostId)
			if(comments[i].CommentId===id)
				return i;
		}
	}
	function AddToCommentArray()
	{
		var obj=new Object();
		obj.PostId=post_list[selectedPost[selectedPost.length-1].index].id;
		obj.CommentId=commentId;
		obj.value=document.getElementById("comment").value;
		comments.push(obj);
		AddToCommentDom(obj);
		console.log(comments);
		storeCommentsIntoLocalStorage(comments);
	}
	function storeCommentsIntoLocalStorage(comments)
	{
		localStorage.comments=JSON.stringify(comments);
	}
	function hideAllBtn()
	{
		for(var i=1;i<=commentId;i++)
		{
			
			var a=document.getElementById(i);
			if(a!=null)
			{
			var b=a.getElementsByTagName("a");
			b[0].style.visibility="hidden";
			b[1].style.visibility="hidden";
			}
		}
	}
	function visibleAllBtn()
	{
		for(var i=1;i<=commentId;i++)
		{
			
			var a=document.getElementById(i);
			if(a!=null)
			{
			var b=a.getElementsByTagName("a");
			b[0].style.visibility="visible";
			b[1].style.visibility="visible";
			}
		}
	}