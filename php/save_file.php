<?php
$storeDir = '/Applications/MAMP/htdocs/test/images/';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit('POSTメソッドを指定してください');
}

if ($_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    exit('アップロードが失敗しました');
}

//一時ディレクトリから画像ファイルを移動($_FILES['file']['tmp_name'])に保存先
move_uploaded_file($_FILES['file']['tmp_name'], $storeDir.$_FILES['file']['name']);
