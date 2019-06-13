var register = document.querySelector(".register");
register.addEventListener("click",regist);
function regist() {
  var formData = new FormData();
  formData.append("title", document.querySelector(".subj").value)
  formData.append("category", document.querySelector(".select").value)
  formData.append("tag", document.querySelector(".tag").value)
  formData.append("desc", document.querySelector(".textArea").value)
  formData.append("source", document.querySelector(".source").value)
  var response = document.querySelectorAll('input[name="responsibility"]');
  for(var i = 0; i < 3; i++) {
    console.log(response[i].checked)
    if(response[i].checked) {
      formData.append("response",response[i].value)
    }
  }

  for(var i = 0; i < 4; i++) {
    if(document.querySelectorAll('input[name = "pic"]')[i].files[0] !== undefined) {
      formData.append("img",document.querySelectorAll('input[name = "pic" ]')[i].files[0])
    }
  }
  if(formData.get("title").length < 5 && formData.get("title").length > 45) {
    alert("제목이 너무 길거나 짧습니다 5글자이상 50글자 이하로 입력해주세요")
  }else if(formData.get("desc").length < 50 ) {
    alert("내용을 50글자 이상 입력해주세요")
  }else if (!formData.get("source").length) {
    alert("출처를 정확히 입력해주세요")
  } else if (formData.get("response") === "" ) {
    alert("글의 신뢰성을 선택해주세요 ")
  } else {
    fetchSend("/write",formData,"post");
  }

  console.log(formData.getAll('img'));
  console.log(formData.get('title'));
}

function fetchSend(url,data,method) {
  url = "http://localhost:3000" + url;
  //url = "18.222.129.254:3000 + url"
  fetch(url,{
    method:method,
    body:data
  }).then((res) => {
    if(res.status === 200 || res.status === 201 ) {
      window.location.href="/"
    } else {
      console.error(res.statusText);
    }
  }).catch(err => console.error(err));
}
