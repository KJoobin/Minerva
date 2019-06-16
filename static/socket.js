var socket = io();
var feedForm = document.querySelector('.feed_form')
var msg = document.querySelector('#feed_message')

var xhr = xhrSend('/feed','','get',true);
xhr.addEventListener('load',function() {
  var result = JSON.parse(xhr.responseText);
  for(var i = result.length - 1; i >= 0; i--) {
    postsFeed(result[i].feed)
  }
})
feedForm.onsubmit = function(e) {
  e.preventDefault();
  if(msg.value === "" ) {
    alert('message 를 입력해주세요 ')
  } else {
    socket.emit('chat message',msg.value);
    msg.value = '';
    return false;
  }
}
socket.on('chat message', function(msg) {
  postsFeed(msg);
})
function postsFeed(msg) {
  var chatDiv = document.querySelector('.chat_feed');
  var li = document.createElement('li');
  li.innerText = msg;
  chatDiv.prepend(li)
}
