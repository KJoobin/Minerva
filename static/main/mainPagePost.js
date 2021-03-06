function makePost(data) {
  for(i = 0; i < data.length; i++) {
    list(data[i]);
  }
  postListCk();
}

function list(obj) {
    var div = document.createElement('div');
    div.classList.add('post_list')
    var title = `<div class='main_title'>${obj.subject}</div>`
    var desc = `<div class='main_desc'>${obj.content.length > 10 ? obj.content.slice(0,10) + `...` : obj.content }</div>`
    var author = `<div class='main_author'>${obj.nickname}</div>`
    var listTop = `<div class='list_top' id='${obj.id}'> ${title} ${author} </div>`
    var listBot = `<div class='list_bot'>${desc}</div>`
    var post = `<div class='post_list' id='${obj.id}'>${listTop + listBot}</div>`
    addPost(post);
  }

function addPost(data) {
  var posts = document.querySelector('.recomend_body')
  posts.innerHTML += data
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
function makeBestPost(time) {
  var bestTitle = document.querySelector('.a_best_title');
  var bestTitles = document.querySelector('.best_titles');
  var xhr = getData(time);
  xhr.addEventListener('load',function() {
    var result = JSON.parse(xhr.responseText);
    bestTitle.innerHTML = "";
    bestTitles.innerHTML = "";
    bestPosts(result);
  })
}
function getData(time) {
  var data = {};
  data.time = time;
  data = JSON.stringify(data);
  return xhrSend('/best',data,'post',true);
}

function bestPosts(data) {
  bestestPost(data[0]);
  for(var i = 1; i < data.length; i++) {
    bestPost(data[i])
  }
  postListCk();
}
function bestestPost(obj) {
  if(obj) {
    console.log(obj.picture);
    obj.picture = JSON.parse(obj.picture)
    var title = `<div class='main_title'>${obj.subject}</div>`
    var desc = `<div class='main_desc'>${obj.content.length > 50 ? obj.content.slice(0,50) + `...` : obj.content }</div>`
    var img = `<img class='best_img' src=${obj.picture}>`
    var listTop = `<div class='list_top' id='${obj.id}'> ${title} </div>`
    var listBot = `<div class='list_bot'>${desc} ${img}</div>`
    var post = `<div class='post_list' id='${obj.id}'>${listTop + listBot}</div>`
    var bestTitle = document.querySelector('.a_best_title');
    bestTitle.innerHTML = post;
  }
}

function bestPost(obj) {
  var title = `<div class='main_title'>${obj.subject}</div>`
  var listTop = `<div class='list_top' id='${obj.id}'> ${title} </div>`
  var post = `<div class='post_list' id='${obj.id}'>${listTop}</div>`
  var bestTitle = document.querySelector('.best_titles');
  bestTitle.innerHTML = bestTitle.innerHTML + post;
}
function bestTapEvt() {
  var doc = document;
  var oneDay = 1000000;
  doc.querySelector('.days').addEventListener('click',function() {
    makeBestPost(oneDay,);
  })
  doc.querySelector('.weekend').addEventListener('click',function() {
    makeBestPost( 7 * oneDay);
  })
  doc.querySelector('.month').addEventListener('click',function() {
    makeBestPost(30 * oneDay)
  })
}
function init() {
  makeBestPost(1000000);
  var xhr = xhrSend('/read/post','','get')
  xhr.addEventListener('load',function() {
    var result = JSON.parse(xhr.responseText);
    makePost(result);
  })
  bestTapEvt()
}
init();
