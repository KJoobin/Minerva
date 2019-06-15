
function makePost(data) {

  for(var i = 0; i < data.length; i++) {
    list(data[i]);
  }
  postListCk();
}

function list(obj) {
  console.log(obj)
    var div = document.createElement('div');
    div.classList.add('post_list')
    var title = `<div class='title'>${obj.subject}</div>`
    var desc = `<div class='desc'>${obj.content.length > 50 ? obj.content.slice(0,50) + `...` : obj.content }</div>`
    var author = `<div class='author'>${obj.nickname}</div>`
    var listTop = `<div class='list_top' id='${obj.id}'> ${title} ${author} </div>`
    var listBot = `<div class='list_bot'>${desc}</div>`
    var post = `<div class='post_list' id='${obj.id}'>${listTop + listBot}</div>`
    addPost(post);
  }

function addPost(data) {
  var posts = document.querySelector('.posts')
  posts.innerHTML = data + posts.innerHTML;
}

function postListCk() {
  var postList = document.querySelectorAll('.post_list')
  for(let i = 0; i < postList.length; i++) {
    postList[i].addEventListener('click',function() {
      var value = postList[i].attributes.id.value;
      window.location.href = `/read?id=${value}`
    })
  }
}

function init() {
  var xhr = xhrSend('/read/post','','get')
  xhr.addEventListener('load',function() {
    var result = JSON.parse(xhr.responseText);
    console.log(result);
    makePost(result);
})
}

init();
