var register = document.querySelector(".register");
register.addEventListener("click",regist);
function regist() {
  var data = {};
  data.title = document.querySelector(".subj").value;
  data.category = document.querySelector(".select").value;
  data.tag = document.querySelector(".tag").value;
  data.desc = document.querySelector(".textArea").value;
  data.source = document.querySelector(".source").value;
  data.response = "";
  var response = document.querySelectorAll('input[name="responsibility"]');
  for(var i = 0; i < 3; i++) {
    console.log(response[i].checked)
    if(response[i].checked) {
      data.response = response[i].value;
    }
  }
  if(data.title.length < 5 ) {
    alert("제목을 5글자 이상 입력해주세요")
  }else if(data.desc.length < 50 ) {
    alert("내용을 50글자 이상 입력해주세요")
  }else if (!data.source.length) {
    alert("출처를 정확히 입력해주세요")
  } else if (data.response === "" ) {
    alert("글의 신뢰성을 선택해주세요 ")
  } else {
    xhrSend("/write",data,"post");
  }
}








function xhrSend(url,data,method) {
    url += "localhost:3000";
    //url += "18.222.129.254:3000"
    data = JSON.stringify(data)
    var xhr = new XMLHttpRequest();

    xhr.open(method,url);
    xhr.setRequestHeader(`Content-type`,`application/json`);
    xhr.send(data);

    console.log(url);

    xhr.addEventListener('load',function() {
      var result = JSON.parse(xhr.responseText);
          window.location.href="/"
  })
}
