

function recentPost() {
  xhr = xhrSend('/mypage/recent','','get');
  xhr.addEventListener('load',function() {
    var result = JSON.parse(xhr.responseText);
    console.log(result);
    postText(result);
  })
}
function postText(data) {
  var postPostion = document.querySelector('.posts');
  for(let i = 0; i < data.length; i++) {
    postPostion.innerHTML = list(data[i]) + postPostion.innerHTML;
  }
  postListCk()
}

function list(obj) {
  console.log(obj)

    var title = `<div class='title'>${obj.subject}</div>`
    var desc = `<div class='desc'>${obj.content.length > 50 ? obj.content.slice(0,50) + `...` : obj.content }</div>`
    var listTop = `<div class='list_top' id='${obj.id}'> ${title} </div>`
    var listBot = `<div class='list_bot'>${desc}</div>`
    var post = `<div class='post_list' id='${obj.id}'>${listTop + listBot}</div>`
    return post;
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
  recentPost()
}
init();
