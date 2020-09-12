let offset = 0;
let siteKey = '';
let apiUrl = '';
let containerElments = null;
const css = `.font {
                font-family: "Noto Sans TC", sans-serif;
              }

              .disableBtn {
                pointer-events: none;
              }
              `;
const template = `  <div>
                     <div class="row d-flex justify-content-center mt-5">
                       <div class="col-6">
                         <form>
                           <div class="form-group">
                             <label for="nickname" class="font">暱稱</label>
                             <input
                               type="text"
                               class="form-control"
                               id="nickname"
                               aria-describedby="nicknameHelp"
                             />
                           </div>
                           <div class="form-group">
                             <label for="content" class="font">留言內容</label>
                             <textarea type="text" class="form-control" id="content"></textarea>
                           </div>
                           <button type="button" class="btn btn-primary font sendComment">送出</button>
                         </form>
                       </div>
                       </div>
                       <div class="row d-flex justify-content-center mt-5 comment-box"></div>
                       <button type="button" class="btn btn-primary more">載入更多</button>
                     </div>`;

function initCSS() {
  const StyleElement = document.createElement('style');
  StyleElement.type = 'text/css';
  StyleElement.appendChild(document.createTextNode(css));
  document.head.appendChild(StyleElement);
}
function init(options) {
  siteKey = options.siteKey;
  apiUrl = options.apiUrl;
  containerElments = $(options.container);
  containerElments.append(template);
  initCSS();
  readMore();
  displayComments();
  $(".sendComment").click(()=> {
    $(".sendComment").addClass("disableBtn");
    if (!checkSpace()) {
      postComment();
    }
  });
}

function checkSpace() {
  const alert = $(".alert-danger");
  if (alert) {
    alert.remove();
  }
  const nickname = $("#nickname").val();
  const content = $("#content").val();
  const template = `<div class="alert alert-danger" role="alert">
                      資料不齊全
                    </div>`
  if (nickname == "" || content == "") {
    $(template).insertBefore( "form" );
    return true;
  } else {
    return false;
  }
}

function readMore() {
  $(".more").click(()=> {
    offset += 5;
    displayComments();
  })
}

function clearComments() {
  $(".comment-box").html("");
}

function displayComments() {
  const commentBoxDiv =  document.querySelector(".comment-box");
  let dataoffset = offset;
  let url = apiUrl + "/comments.php";
  $.get(`${url}?offset=${dataoffset}&site_key=${siteKey}`, function(result) {
    if (result.length != 0) {
      result.forEach(comment => {
        const div = document.createElement("div");
        div.classList.add("col-12");
        let template =  `
                            <div class="card mb-4">
                              <div class="card-header nickname">作者: ${comment.nickname}<div>留言時間: ${comment.created_at}</div> </div>
                              
                              <div class="card-body">
                                <p class="card-text comment">
                                  ${comment.content}
                                </p>
                              </div>
                            </div>
                        `;
        div.innerHTML = template;
        commentBoxDiv.appendChild(div);
      })
    } else {
      $(".more").remove();
    }
  })
}

function postComment() {
  const nickname = $("#nickname").val();
  const content = $("#content").val();
  const data = {
    nickname: nickname,
    content: content,
    site_key: siteKey
  };
  let url = apiUrl;
  $.post(`${url}/add_comment.php`,data)
  .always(function(){
    const Rbtn = $(".more");
    if (!Rbtn.length) {
      const readMoreBtn = `<button type="button" class="btn btn-primary more">載入更多</button>`;
      $(readMoreBtn).insertAfter(".comment-box");
      readMore();
    } 
    clearComments();
    offset = 0;
    displayComments();
    setTimeout(()=> {
      $(".sendComment").removeClass("disableBtn");
    },3000)
  });
}

init({
  siteKey: 'john',
  apiUrl: "http://localhost/v1-week13-apiboard/api",
  container: ".comment-area"
});

