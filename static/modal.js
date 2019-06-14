

function makeModal(text) {
  console.log("make Modal")
  if(!document.querySelector(".profile img").childNodes.length) {
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
