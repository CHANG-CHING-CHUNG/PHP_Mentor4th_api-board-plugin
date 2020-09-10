<?php
  include("config.php");
  header('Content-Type: application/json; charset=utf-8');
  
    function addcomment($nickname,$content,$site_key) {
      global $conn;
  
      $sql = "INSERT INTO John_comments (nickname, content, site_key) VALUES (?, ?, ?)";
      // $sql = "INSERT INTO comments (nickname, content) VALUES ('$nickname', '$content')";
      $stmt = mysqli_prepare($conn, $sql);
      mysqli_stmt_bind_param($stmt, "sss", $nickname, $content, $site_key);

      if (mysqli_execute($stmt) === TRUE) {
        echo "新增成功";
      } else {
        echo "發生錯誤";
      }
    }
  $nickname;
  $content;
  if(!empty($_POST["nickname"]) && !empty($_POST["content"]) && !empty($_POST["site_key"])) {
    $nickname = $_POST["nickname"];
    $content = $_POST["content"];
    $site_key = $_POST["site_key"];
    addcomment($nickname,$content,$site_key);
  } else {
    echo "資料不齊全";
  }
?>