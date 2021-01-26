<?php
const USER = 'root';
const PASSWORD = 'root';
const DB = 'photo';
const HOST = '127.0.0.1';
const PORT = 8889;
const SOCKET = 'localhost:/Applications/MAMP/tmp/mysql/mysql.sock';

$link = mysqli_init();

if(!$link){
    die('mysqli_init failed');
}
$success = $link->real_connect(
   HOST,USER,PASSWORD,
   DB,PORT,SOCKET
);
if(!$success){
    printf("connect failed: %s\n",$link->connect_error);
    exit();
}
//アップロード
$stmt = $link->prepare("INSERT INTO `grid_file`(`file_name`,`key`) VALUES (?, ?)");
$stmt->bind_param('ss', $file_name, $key);
$file_name = htmlspecialchars($_POST['file_name'], ENT_QUOTES, "UTF-8");
$key = htmlspecialchars($_POST['key'],ENT_QUOTES,"UTF-8");
if($stmt->execute())
$stmt->close();

// 画像再読み込み
if($stmt = $link->prepare(
    'SELECT DISTINCT `file_name` FROM `grid_file`'
)){
    $stmt->execute();
    $stmt->bind_result($file_name);
    //$stmt->bind_result($file_name,$key,$date);
    while ($stmt->fetch()) {
        ob_start();
        printf("<div class=\"item\">");
        printf("<img src=\"images/%s\" alt=\"\">",$file_name);
        //printf("<p>日付:%s キーワード:%s</p>",$date,$key);
        printf("</div>");
        $photo = ob_get_contents();
        ob_end_clean();
        echo $photo;
    }
    $stmt->close();
}
$link->close();
?>
