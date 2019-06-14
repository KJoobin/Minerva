function ckMore() {
  window.location.href = '/read'
}

function init() {

  var more = document.querySelector('.more')
  more.addEventListener('click',ckMore)

}

init();
