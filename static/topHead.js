function afterLog() {
  console.log("after")
  var profile = document.querySelector(".profile")
    profile.addEventListener("click",loginModal);
}

function loginModal() {
  var profile = document.querySelector(".profile")
    var loginText =`
    <div><button id="login-btn">내정보</button></div>
    <div><a href="/write"><button id="login-btn">글쓰기</button></a></div>
    <div><button id="join-btn">로그아웃</button></div>
    <div id="errMsg"></div>`;
    makeModal(loginText)
    profile.removeEventListener("click",loginModal);
}

function init() {
  var mainProfile_div =  document.querySelector(".main_profile div")
  if(mainProfile_div.classList[0] === "profile") {
    mainProfile_div.addEventListener("click",afterLog)
    var profile = document.querySelector(".profile")
      profile.addEventListener("click",loginModal);
  }
}
init();
