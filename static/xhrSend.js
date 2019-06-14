function xhrSend(url,data,method,type) {
    url = "http://localhost:3000" + url;
    // url = "http://18.222.129.254:3000" + url
    console.log(data);
    var xhr = new XMLHttpRequest();

    xhr.open(method,url);
    if(type) {
      xhr.setRequestHeader(`Content-type`,`application/json`);
    }
    xhr.send(data);

    return xhr;
}
