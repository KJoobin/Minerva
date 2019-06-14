function xhrSend(url,data,method,type) {
  if(window.location.href.slice(0,21) === 'http://localhost:3000') {
    url = "http://localhost:3000" + url;
  } else {
    url = "http://18.222.129.254:3000" + url
  }
    var xhr = new XMLHttpRequest();

    xhr.open(method,url);
    if(type) {
      xhr.setRequestHeader(`Content-type`,`application/json`);
    }
    xhr.send(data);

    return xhr;
}
