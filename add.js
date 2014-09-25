$('#submit-button').click(function() {
	var call = $('#select-call').val();
	var subj = $('#select-subj').val();
	var type = $('#select-type').val();
	var name = $('#input-name').val();
	var date = treatDate($('#input-date').val());
	if(date != null) {
		var login = $('#input-login').val();
		var pass = md5($('#input-pass').val());
		
		var payload = { };
		payload['call'] = call;
		payload['date'] = date;
		payload['login'] = login;
		payload['passcs'] = pass;
		var data = { };
		data['subj'] = subj;
		data['type'] = type;
		data['name'] = name;
		payload['data'] = data;
		$.cookie('stored_login', login, { expires: 365 });
		
		var ajaxurl = 'server_add.php';
		if(name.length > 0 && date.length > 0 && login.length > 0) {
			var post = $.post(ajaxurl, payload);
			
			post.done(function(resp) {
				$('#server-output').html(resp);
			});
		} 
	} else $('#server-output').html('<span class="error">Data Invalida, o formato é D/M.</span>');
});

function treatDate(date) {
	var tokens = date.split("/");
	var day = parseInt(tokens[0]);
	var month = parseInt(tokens[1]);
	if(isNaN(day) || isNaN(month))	
		return null;
		
	return day + '/' + month;
}

$('#select-call').change(function() {
	var val = $(this).val();
	var isRem = val == 'rem';
	$("#select-subj").prop('disabled', isRem);
	$("#select-type").prop('disabled', isRem);
});

initFuncs.push(function() {
	initTimer();
	$('#input-login').val($.cookie('stored_login'));
});