<!doctype html>
<html lang="ja">
	<head>
		<meta charset="utf-8">
		<title>タイトル</title>
		<meta name="description" content="このwebページの説明文">
		<!-- CSS -->
		<link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css">
		<link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500&display=swap" rel="stylesheet">
		<link href="css/style.css" rel="stylesheet">
		<link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
		<!-- JQuery -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

	</head>

	<body>
		<div id="book" class="big-bg">
		<header class="p-header wrapper">
			<h1><a class="h-title" href="index.html">ホーム</a></h1>
			<nav>
				<ul class="main-nav">
					<li><a href="book.html">Book</a></li>
				</ul>
			</nav>
		</header>
		<div class="book-contents wrapper">
			<h2 class="page-title">BOOK</h2>
			<p>説明</p>
		</div><!-- /.book-contents -->
		</div><!-- /#home -->

		<div class="wrapper io">
			<div id="form2">
				<input id="sbox2"  id="s" name="s" type="text" placeholder="フリーワードを入力"/>
				<button type="button" id="sbtn2"><i class="fas fa-search"></i></button>
			</div>
			<div class="inner-io">
				<input id="btn" type="button" value="アップロード">
				<div class="inner-upload">
					<div id="inner-io-form">
					</div>
				</div>
			</div>
		</div><!-- io -->
		<div class="wrapper grid">
			<!-- Javascriptで画像を挿入 -->
			<?php include('./php/client.php'); ?>
		</div><!-- /.grid -->
		<footer>
			<div class="wrapper">
				<p><small>&copy; フッター</small></p>
			</div>
		</footer>
		<script type="text/javascript" src="scripts/ajax.js" charset="utf-8"></script>
	</body>
</html>
