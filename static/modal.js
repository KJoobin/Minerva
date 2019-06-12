

function makeModal(text) {
  if(!document.querySelector(".profile").childNodes.length) {
    modalManage();
    modalDiv();
    closeModal();
    textInModal(text);
    var clickModal = false;
    document.querySelector(".modalManage").addEventListener('click',function() {
      if(document.querySelector(".profile").childNodes.length && !clickModal) {
        removeModal();
      }
      clickModal = false;
    })
    document.querySelector(".modalManage div").addEventListener('click',function() {
      clickModal = true;
      console.log(clickModal);
    })
  }
}

function modalManage() {
  var div = document.createElement("div");
  div.classList.add("modalManage")
  document.querySelector(".profile").appendChild(div);
  div = document.createElement("div");
  div.classList.add("modalPosition");
  document.querySelector(".modalManage").appendChild(div);

}

function modalDiv() {
  var div = document.createElement("div");
  div.classList.add("Bdrs(8px)","Ov(h)","Ov(v)","Ta(c)","Bgc(#fff)","M(10px)","W(200px)","H(a)","Pos(r)");
  document.querySelector(".profile .modalManage").appendChild(div);
}

function closeModal() {
  var div = document.createElement("div");
  div.classList.add("close","F(r)","Sq(30px)","pos(r)");
  div.addEventListener('click',removeModal)
  div.innerHTML = `<svg class="Scale(.5) Expand" width="22" height="22" viewBox="0 0 22 22"><path class="Fill($c-divider) close:h_Fill($c-gray)" d="M14.6 11.7v-1.4l6.5 6.5c1.3 1.2 1.3 3 0 4.3-1 1.3-3 1.3-4.2 0l-6.5-6.4h1.4L5.2 21c-1.2 1.3-3 1.3-4.3 0-1.3-1-1.3-3 0-4.2l6.4-6.5v1.4L1 5.2C-.4 4-.4 2.2 1 1 2-.4 4-.4 5 1l6.5 6.4h-1.4L16.8 1C18-.4 19.8-.4 21 1c1.3 1 1.3 3 0 4.2l-6.4 6.5z" stroke="none" stroke-width="1"></path></svg>`
  document.querySelector(".profile div div").appendChild(div);
}

function textInModal(text) {
  var div = document.createElement("div");
  div.classList.add("modalText","Ta(c)","Pos(r)","H(100%)","D(f)","Fld(c)")
  div.innerHTML = text;
  document.querySelector(".profile div div").appendChild(div);

}

function removeModal() {
  document.querySelector(".modalManage").remove()
}
