<!DOCTYPE html>
<html>
	<title>Horário 12ºA</title>
	
	<head>
		<link rel="stylesheet" href="shared.css">
	</head>
	
	<body>
		<?php include 'header.php'; ?>
		
		<div id="container">
			<div class="separator-title">
				Hoje...
			</div>
			
			<div id="grid-today" class="content-container"></div>
			
			<div class="separator-title">
				Amanhã...
			</div>
			
			<div id="grid-tomorrow" class="content-container"></div>
			
			<div class="separator-title">
				No Futuro...
			</div>
			Adiciona o teu evento <a href="add.php">aqui</a>
			
			<div id="events-container" class="content-container"></div>
		</div>
		
		<div id="footer-top"></div>
		<hr>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script src="jquery_cookie.min.js"></script>
		<script src="shared.js"></script>
		<script src="timetable.js"></script>
	</body>
</html>