
function makePost(data) {
  var posts = document.querySelector('.posts')
  for(var i = 0; i < data.length; i++) {
     posts.innerHTML += list(data[i])
  }
  return posts;
}

function list(obj) {
  var title = `<div class='title'>${obj.subject}</div>`
  var desc = `<div class='desc'>${obj.content.length > 50 ? obj.content.slice(0,50) + `...` : obj.content }</div>`
  var author = `<div class='author'>${obj.UID}</div>`
  var listTop = `<div class='list_top'> ${title} ${author} </div>`
  var listBot = `<div class='list_bot'>${desc}</div>`
  return `<div class='post_list'>${listTop + listBot}</div>`
}

function xhrSend(url,data,method) {
    url = "http://localhost:3000" + url;
    //url = "18.222.129.254:3000 + url"
    console.log(data);
    var xhr = new XMLHttpRequest();

    xhr.open(method,url);
    xhr.send(data);

    xhr.addEventListener('load',function() {
      var result = JSON.parse(xhr.responseText);
      console.log(result);
      makePost(result);
  })
}

function init() {
  xhrSend('/read/post','','get')
}

init();
