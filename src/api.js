import $ from './jquery-3.5.1.js';
export function getComments(apiUrl, offset, siteKey,cb) {
  let dataoffset = offset;
  let url = apiUrl + "/comments.php";
  $.get(`${url}?offset=${dataoffset}&site_key=${siteKey}`, function(result) {
    cb(result);
  })
}

export function addComment(apiUrl, data, cb) {
  let url = apiUrl;
  $.post(`${url}/add_comment.php`,data)
  .always(function(){
    cb()
  });
}