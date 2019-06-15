function addEvent() {
  var btn = document.querySelector('input[type="submit"]');
  btn.addEventListener('click',submit);
}
function submit() {
  var textarea = document.querySelector('.form textarea');
  var data = {};
  var url = window.location.href
  url = "/read" + queryUrl(url);

  if(textarea.value.length) {
    data.content = textarea.value;
    data = JSON.stringify(data);
    var xhr = xhrSend(url,data,'post');
    xhr.addEventListener('load',function() {
      var commentParentNode = document.querySelector('ul.list-group');
      var commentInput = document.querySelector('li.list-group-item.note-form')
      var li = document.createElement('li');
      li.classList.add("list-group-item", "note-item" ,"clearfix")
      li.innerHTML = addComment(data.content);
      commentParentNode.insertBefore(li,commentInput)
      textarea.value = ""
    })
  } else {
    alert(" 댓글을 입력해주세요 ")
  }
}
function addComment(text) {
  return `
    <div class="content-body panel-body pull-left">
        <div class="avatar avatar-medium clearfix "><div class="avatar-info"><a class="nickname" href="/user/info/16500" title=id>1</a> <div class="activity"><span class="fa fa-flash"></span></div><div class="date-created"><span class="timeago" title="2019-06-10 17:16:28.0">2019-06-10 17:16:28</span> </div> </div></div>
        <fieldset class="form">
            <article id="note-text-1712913" class="list-group-item-text note-text">
                    ${text}
            </article>
        </fieldset>
    </div>
    <div class="content-function pull-right text-center">
        <div class="content-function-group">
            <div class="note-evaluate-wrapper"><a href="javascript://" class="note-vote-btn" role="button" data-type="assent" data-eval="true" data-id="1712913"><i id="note-evaluate-assent-1712913" class="fa fa-angle-up note-evaluate-assent-assent" data-placement="left" data-toggle="tooltip" title="" data-original-title="추천"></i></a><div id="content-vote-count-1712913" class="content-eval-count">0</div><a href="javascript://" class="note-vote-btn" role="button" data-type="dissent" data-eval="true" data-id="1712913"><i id="note-evaluate-dissent-1712913" class="fa fa-angle-down note-evaluate-dissent-dissent" data-placement="left" data-toggle="tooltip" title="" data-original-title="반대"></i></a></div>
        </div>
    </div>
<form action="/content/delete/1712913" method="post" id="note-delete-form-1712913"><input type="hidden" name="_method" value="DELETE" id="_method">
</form>
`
}
function queryUrl(url) {
  var indexOfQuery = url.indexOf("/?id=");
  url = url.slice(indexOfQuery);
  return url;
}
function init() {
  addEvent()
}
init();
