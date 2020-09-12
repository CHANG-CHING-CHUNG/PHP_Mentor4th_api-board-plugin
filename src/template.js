export const css = `.font {
  font-family: "Noto Sans TC", sans-serif;
}

.disableBtn {
  pointer-events: none;
}
`;

export function getForm(formClassName,commentsClassName, loadMoreClassName, sendCommentClassName) {
  return `  <div>
  <div class="row d-flex justify-content-center mt-5">
    <div class="col-6">
      <form class="${formClassName}">
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
        <button type="button" class="btn btn-primary font ${sendCommentClassName}">送出</button>
      </form>
    </div>
    </div>
    <div class="row d-flex justify-content-center mt-5 ${commentsClassName}"></div>
    ${getLoadMoreBtn(loadMoreClassName)}
  </div>`;
}
export function getLoadMoreBtn(className) {
  return `<button type="button" class="btn btn-primary  ${className}">載入更多</button>`;
}