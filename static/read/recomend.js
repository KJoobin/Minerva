function addCkEvt() {
  var data = {};
  var upBtn = document.querySelector('#rec_up');
  var downBtn = document.querySelector('#rec_dow');
  upBtn.addEventListener('click',function() {
    data.recomend = "up"
    ckBtn(data);
  });
  downBtn.addEventListener('click', function() {
    data.recomend = "down"
    ckBtn(data);
  })
}
function ckBtn(data) {
  var id = document.querySelector('.profile').attributes.id;
  if(id.value === "") {
    alert(" 로그인 먼저 하세요 ")
  } else {
    console.log('ckBtn = ',data);
    url = '/read/recomend' + window.location.href.slice(27);
    var data = JSON.stringify(data);
    console.log("url = ",url);
    xhr = xhrSend(url,data,'post',true)
    xhr.addEventListener('load',function() {
      console.log(xhr.responseText)
      if(xhr.responseText === "0") {
        alert("이미 투표를 했습니다.");
      } else {
        recBtn = document.querySelectorAll('.recomend');
        data = JSON.parse(data);
        console.log("data.recomend is ",data);
        if(data.recomend === 'up') {
          recBtn = recBtn[0];
        } else if(data.recomend === 'down') {
          reBtn = recBtn[1];
        }
        var value = recBtn.childNodes[1]
        var valInNum = Number(value.innerText);
        valInNum += 1;
        console.log(value.innerText, valInNum)
        value.innerText = valInNum.toString();
        alert("투표해주셔서 감사합니다 ^^ " );
      }
    })
  }
}





function init () {
  addCkEvt();
}
init();
