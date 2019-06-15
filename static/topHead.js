function afterLog() {
  console.log("after")
  var profile = document.querySelector(".profile")
    profile.addEventListener("click",loginModal);
}

function loginModal() {
  var profile = document.querySelector(".profile")
    var loginText =`
    <div><button id="mypage">내정보</button></div>
    <div><a href="/write"><button id="login-btn">글쓰기</button></a></div>
    <div><button id="logout-btn" onclick="logout()">로그아웃</button></div>
    <div id="errMsg"></div>`;
    makeModal(loginText)
    document.querySelector('#mypage').addEventListener('click',function() {
      window.location.href='/mypage'
    })
    profile.removeEventListener("click",loginModal);
}
function profileModal() {
  var mainProfile_div =  document.querySelector(".main_profile div")
  if(mainProfile_div.classList[0] === "profile") {
    mainProfile_div.addEventListener("click",afterLog)
    var profile = document.querySelector(".profile")
      profile.addEventListener("click",loginModal);
  }
}
function logoCk() {
  var logoImg = document.querySelector('.logo');

  logoImg.addEventListener('click',function() {
    window.location.href = "/"
  })
}


function join() {
    isBlank = false;
    var data = {};
    data.email = document.getElementsByName("email")[0].value;
    data.password = document.getElementsByName("password")[0].value;
    data.nickname = document.getElementsByName("nickname")[0].value;
    console.log(data);
    for(var key in data) {
      if(!data[key].length) {
        alert(key + "값을 입력해 주세요!")
        isBlank = true;
        break;
      }
    }
    if(!isBlank) {
      data = JSON.stringify(data);
      xhr = xhrSend("/join",data,"post",true) // 데이터를 router/join/noin.js로 보낸다.
      xhr.addEventListener('loal',function() {
        alert("가입을 환영합니다.")
        closeLogModal();
      })
    }
}


function login() {

    var data = {};
    data.email = document.getElementsByName("email")[0].value;
    data.password = document.getElementsByName("password")[0].value;
    if(data.email.length || data.password.length) {
      data = JSON.stringify(data);
      xhr = xhrSend("/login",data,"post",true)
      xhr.addEventListener('load',function () {
        closeLogModal();
        var result = JSON.parse(xhr.responseText);
        if(!result.message) {
        window.location.href = window.location.href;
        }
        document.querySelector('#errMsg').innerText = result.message
      })
    } else {
      alert("email 과 password 를 입력해주세요 !")
    }
}

document.querySelector("#js-login_button").addEventListener("click",function(){
  modalInLogin()
});


function modalInLogin() {
  makeLogModal(loginText)
  document.querySelector("#login-btn").addEventListener("click",login);
  document.querySelector("#join-btn").addEventListener("click",function(){
    var div = document.querySelector(".modalText");
    div.innerHTML = joinText
    document.querySelector("#join-btn-2").addEventListener("click",join); //join-btn-2 버튼 클릭시 join.js 실행
  });
}

var loginText =`<div class="Expand">hello<div><input type="text" name="email"></input></div></div>
<div class="Expand">password<div><input type="password" name="password"></input></div></div>
<div><button id="login-btn">로그인</button></div>
<div><button id="join-btn">회원가입</button></div>
<div id="errMsg"></div>`;


var joinText =
`
<div><h4>회원가입</h4></div>
<div>
email: <input name="email" type="email"><br>
<p id="errMsg"></p>
password: <input name="password" type="text"><br>
nickname: <input name="nickname" type="text"><br>
<button id ="join-btn-2">가입하기</button>
</div>
`
;

function makeLogModal(text) {
  console.log(document.querySelector("#modal-manage").childNodes.length)
  if(!document.querySelector("#modal-manage").childNodes.length) {
    modalLogManage();
    modalLogDiv();
    closeLogModal();
    textInLogModal(text);
    var clickModal = false;
    document.querySelector("#modal-manage div").addEventListener('click',function() {
      if(document.querySelector("#modal-manage").childNodes.length && !clickModal) {
        removeModal();
      }
      clickModal = false;
    })
    document.querySelector("#modal-manage div div").addEventListener('click',function() {
      clickModal = true;
    })
  }
}

function modalLogManage() {
  var div = document.createElement("div");
  div.classList.add("modalManage","centerAlign","Bgc(#000.68)")
  document.querySelector("#modal-manage").appendChild(div);
}

function modalLogDiv() {
  var div = document.createElement("div");
  div.classList.add("Bdrs(8px)","Ov(h)","Ov(v)","Ta(c)","Bgc(#fff)","M(10px)","Py(36px)","Px(44px)","W(440px)","H(a)","Pos(r)");
  document.querySelector("#modal-manage .modalManage").appendChild(div);
}

function closeLogModal() {
  var div = document.createElement("div");
  div.classList.add("close","F(r)","Sq(30px)","pos(r)");
  div.addEventListener('click',removeModal)
  div.innerHTML = `<svg class="Scale(.5) Expand" width="22" height="22" viewBox="0 0 22 22"><path class="Fill($c-divider) close:h_Fill($c-gray)" d="M14.6 11.7v-1.4l6.5 6.5c1.3 1.2 1.3 3 0 4.3-1 1.3-3 1.3-4.2 0l-6.5-6.4h1.4L5.2 21c-1.2 1.3-3 1.3-4.3 0-1.3-1-1.3-3 0-4.2l6.4-6.5v1.4L1 5.2C-.4 4-.4 2.2 1 1 2-.4 4-.4 5 1l6.5 6.4h-1.4L16.8 1C18-.4 19.8-.4 21 1c1.3 1 1.3 3 0 4.2l-6.4 6.5z" stroke="none" stroke-width="1"></path></svg>`
  document.querySelector("#modal-manage div div").appendChild(div);
}

function textInLogModal(text) {
  var div = document.createElement("div");
  div.classList.add("modalText","Ta(c)","Pos(r)","H(100%)","D(f)","Fld(c)")
  div.innerHTML = text;
  document.querySelector("#modal-manage div div").appendChild(div);

}

function removeLogModal() {
  document.querySelector("#modal-manage .modalManage").remove()

}
function isLog() {
  var profile = document.querySelector('.profile')
  if(profile.id) {
    var logBtn = document.querySelector('#js-login_button')
    profile.classList.remove('none');
    logBtn.classList.add('none')
  }
}
function logout() {
  window.location.href = "/logout"
}

function init() {
  logoCk();
  if(document.querySelectorAll('.profile').length ) {
   profileModal();
  }
  isLog();
}



init();
