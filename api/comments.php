<?php
  include("config.php");
  header('Content-Type: application/json; charset=utf-8');
  if (isset($_GET["offset"]) && isset($_GET['site_key'])) {
    $offset = (int)$_GET["offset"];
    $site_key = $_GET['site_key'];
  } else {
    $offset = 0;
    $site_key = "";
  }
  function getCommentsByOffset($site_key, $offset) {
    global $conn;

    // $sql = "SELECT * FROM comments ORDER BY id DESC LIMIT 5 OFFSET $offset";
    $sql = "SELECT * FROM John_comments WHERE site_key = ? ORDER BY id DESC LIMIT 5 OFFSET ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "si", $site_key, $offset);
    mysqli_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $comments = mysqli_fetch_all($result, MYSQLI_ASSOC);
    $cleaned = array();
    foreach($comments as $comment) {
      $cleaned[] = array_map("htmlspecialchars", $comment);
    }
    // print_r($cleaned);

    echo json_encode($cleaned);
  }
  getCommentsByOffset($site_key,$offset);
?>