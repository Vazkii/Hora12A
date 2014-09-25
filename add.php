<!DOCTYPE html>
<html>
	<title>Horário 12ºA - Adição de Eventos</title>
	
	<head>
		<link rel="stylesheet" href="shared.css">
	</head>
	
	<body>
		<?php include 'header.php'; ?>
		
		<div id="container">
			<div class="separator-title">
				Criador de Eventos
			</div>
			<a href="./">Retomar ao Horário</a><br><br>
			
			<span class="input-label">Atividade:</span>
			<select id="select-call">
				<option value="add">Adicionar Evento</option>
				<option value="rem">Remover Evento</option>
			</select><br>
			
			<span class="input-label">Disciplina:</span>
			<select id="select-subj">
				<option value="0">Sem Disciplina</option>
				<option value="1">Português</option>
				<option value="2">Aplicações Informáticas</option>
				<option value="3">Biologia</option>
				<option value="4">Matemática A</option>
				<option value="5">Educação Fisica</option>
			</select><br>
			
			<span class="input-label">Tipo:</span>
			<select id="select-type">
				<option value="misc">Não Especificado</option>
				<option value="test">Teste</option>
				<option value="trip">Visita de Estudo</option>
				<option value="scl">Aula Facultativa</option>
				<option value="meet">Social/Encontro de Turma</option>
			</select><br>
			
			<span class="input-label">Nome:</span>
			<input id="input-name"></input><br>
			
			<span class="input-label">Data (d/m):</span>
			<input id="input-date"></input><br>
			
			<div class="separator-title">
				Identificação
			</div><br>
			
			<span class="input-label">Login:</span>
			<input id="input-login"></input><br>
			
			<span class="input-label">Password:</span>
			<input type="password" id="input-pass"></input><br><br>
			<a href="https://www.facebook.com/messages/VLavos">Preciso de uma conta</a><br>
			
			<button id="submit-button">Submeter</button>
			<div id="server-output"></div>
		</div>
		
		<div id="footer-top"></div>
		<hr>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script src="jquery_cookie.min.js"></script>
		<script src="md5.js"></script>
		<script src="shared.js"></script>
		<script src="add.js"></script>
	</body>
</html>