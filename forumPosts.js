var all_posts=document.getElementById("forumPost");

var post_list=[];
post_list=localStoragePosts();

var selectedPostIndex=[];
selectedPostIndex=localSelectedPosts();

var createButton=document.createElement("button");
createButton.setAttribute("id","createButton_id");
createButton.setAttribute("style","float:right");
createButton.innerHTML="Create New Post";
all_posts.appendChild(createButton);

createButton.addEventListener("click",function(){
		localStorage.selectedPosts= JSON.stringify([]);
		selectedPostIndex=localSelectedPosts();
		window.location.assign("forum.html");
});

createPost();

function storeSelectedPost(detailed_obj){
	localStorage.selectedPosts=JSON.stringify(detailed_obj);
}

function searchFromPostArray(index){
	for(var i=0;i<post_list.length;i++){
		if(post_list[i].id==index)
			return i;
	}
}


function localStoragePosts(){
	if (!localStorage.posts)
		{
			//default to empty array
			localStorage.posts= JSON.stringify([]);
		}
	return JSON.parse(localStorage.posts);
}


function localSelectedPosts(){
	if (!localStorage.selectedPosts)
		{
			//default to empty array
			localStorage.selectedPosts= JSON.stringify([]);
		}
	return JSON.parse(localStorage.selectedPosts);
}

function newLine( postDiv ){
	var newLine=document.createElement("br");
	postDiv.appendChild(newLine);
}

function horizontalLine( postDiv ){
	var horizontalLine=document.createElement("hr");
	horizontalLine.setAttribute("style","color:black");
	postDiv.appendChild(horizontalLine);
}



function createPost(){
  for(var i=post_list.length-1;i>=0;i--){
	var new_post=document.createElement("div");
	new_post.setAttribute("id",post_list[i].id);
	
	var title=document.createElement("label");
	title.innerHTML=post_list[i].title;
	title.setAttribute("style","color:blue");
	new_post.appendChild(title);
	
	newLine(new_post);
	newLine(new_post);
	
	var body=document.createElement("label");
	body.innerHTML=post_list[i].body;
	new_post.appendChild(body);
	
	newLine(new_post);
	newLine(new_post);
	
	var detail=document.createElement("button");
	detail.innerHTML="Read More";
	new_post.appendChild(detail);
	 detail.addEventListener("click",function(){
		 localStorage.selectedPosts= JSON.stringify([]);
		 selectedPostIndex=localSelectedPosts();
		 var target=event.target.parentNode;
		 var index=searchFromPostArray(parseInt(target.id));
		
		 var objIndex=new Object();
		 objIndex.index=index;
		 selectedPostIndex.push(objIndex);
		 storeSelectedPost(selectedPostIndex);
		 window.location.assign("post_details.html");
	 });
	 
	horizontalLine(new_post);
	
	newLine(new_post);
	newLine(new_post);
	
	all_posts.appendChild(new_post);
	
  }
}