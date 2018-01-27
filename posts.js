var post=document.getElementById("post");
var post_array=[];
post_array=localStoragePosts();

var selectedPost=[];
selectedPost=localSelectedPosts();


function localSelectedPosts(){
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

function storePost(post_array){
	localStorage.posts=JSON.stringify(post_array);
}

function newline(field){
	var new_line=document.createElement("br");
	post.appendChild(new_line);
}

var title=document.createElement("label");
title.innerHTML="Title";
title.setAttribute("id","title_id");
post.appendChild(title);

newline(post);

var title_field=document.createElement("input");
title_field.setAttribute("id","title_field_id");
title_field.setAttribute("style","width:350px");
title_field.setAttribute("style","height:35px");
if(selectedPost.length==0)
	title_field.setAttribute("placeholder","Enter title...");
else
	title_field.setAttribute("value",post_array[selectedPost[0].index].title);
post.appendChild(title_field);

newline(post);
newline(post);


var body=document.createElement("label");
body.innerHTML="Body";
body.setAttribute("id","body_id");
post.appendChild(body);

newline(post);

var body_field=document.createElement("textarea");
body_field.setAttribute("id","body_field_id");
body_field.setAttribute("rows","6");
body_field.setAttribute("cols","100");

if(selectedPost.length==0)
	body_field.setAttribute("placeholder","Enter Description...");
else
	body_field.innerHTML=post_array[selectedPost[0].index].body;
post.appendChild(body_field);

newline(post);
newline(post);

var submit_button=document.createElement("button");
submit_button.setAttribute("style","background-color:silver");
submit_button.setAttribute("style","width:200px");
if(selectedPost.length==0)
    submit_button.innerHTML="Post";
else
	submit_button.innerHTML="Update";
submit_button.setAttribute("id","submit_id");
post.appendChild(submit_button);

submit_button.addEventListener("click",function(){
	var obj=new Object();
	if(post_array.length!=0)
		obj.id=post_array[post_array.length-1].id+1;
	else
		obj.id=1;	
	obj.title=document.getElementById("title_field_id").value;
	obj.body=document.getElementById("body_field_id").value;
	if(selectedPost.length==0)
		post_array.push(obj);
	else{
		post_array[selectedPost[0].index].title=title_field.value;
		post_array[selectedPost[0].index].body=body_field.value;
	}
	storePost(post_array);
	window.location.assign("indexPage.html");
});