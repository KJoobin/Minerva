
function makePost(data) {

  for(var i = 0; i < data.length; i++) {
    list(data[i]);
  }
}

function list(obj) {
  var data = JSON.stringify(obj)
  var xhr = xhrSend(`/authorNick`,data,'post',true);
  xhr.addEventListener('load',function() {
    var result = JSON.parse(xhr.responseText);
    obj.nickname = result[0].nickname
    var div = document.createElement('div');
    div.classList.add('post_list')
    div.addEventListener('click',function () {
      window.location.href = `/read?id=${obj.id}`
    })
    var title = `<div class='title'>${obj.subject}</div>`
    var desc = `<div class='desc'>${obj.content.length > 50 ? obj.content.slice(0,50) + `...` : obj.content }</div>`
    var author = `<div class='author'>${obj.nickname}</div>`
    var listTop = `<div class='list_top'> ${title} ${author} </div>`
    var listBot = `<div class='list_bot'>${desc}</div>`
    div.innerHTML = listTop + listBot;
    document.querySelector('.posts').prepend(div);
  })
  }

function addPost(data) {
  var posts = document.querySelector('.posts')
  posts.innerHTML = data + posts.innerHTML;
}

function postListCk() {
  var postList = document.querySelectorAll('.post_list')[0]
  console.log(postList);
  postList.addEventListener('click',function() {
    console.log(value)

  })
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
