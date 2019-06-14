
function makePost(data) {
  var posts = document.querySelector('.posts')
  for(var i = 0; i < data.length; i++) {
     posts.innerHTML += list(data[i])
  }
  postListCk();
}

function list(obj) {
  var title = `<div class='title'>${obj.subject}</div>`
  var desc = `<div class='desc'>${obj.content.length > 50 ? obj.content.slice(0,50) + `...` : obj.content }</div>`
  var author = `<div class='author'>${obj.UID}</div>`
  var listTop = `<div class='list_top'> ${title} ${author} </div>`
  var listBot = `<div class='list_bot'>${desc}</div>`
  return `<div class='post_list' value='${obj.id}'>${listTop + listBot}</div>`
}


function postListCk() {
  console.log("do it")
  var postList = document.querySelectorAll('.post_list')
  for(let i = 0; i < postList.length; i++) {
    postList[i].addEventListener('click',function() {
      console.log(postList[i]);
      var value = postList[i].getAttribute('value');
      console.log(value);
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
