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

function localStoragePosts(){
	if (!localStorage.posts)
		{
			//default to empty array
			localStorage.posts= JSON.stringify([]);
		}
	return JSON.parse(localStorage.posts);
}


function createPost(){
	var divPost=document.createElement("div");
	
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
		post_list.splice(selectedPost[0].index,1);
		localStorage.selectedPosts= JSON.stringify([]);
		storePost(post_list);
		window.location.assign("indexPage.html");
	});
	
	var edit_button=document.createElement("button");
	edit_button.innerHTML="Edit";
	divPost.appendChild(edit_button);
	edit_button.addEventListener("click",function(){
		window.location.assign("forum.html");
	});
	
	post.appendChild(divPost);
	
	//work from here
}