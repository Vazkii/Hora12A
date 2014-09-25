const revision = 7;

const months = [
	'Jan',
	'Fev',
	'Mar',
	'Abr',
	'Mai',
	'Jun',
	'Jul',
	'Ago',
	'Set',
	'Out',
	'Nov',
	'Dez'
];

const weekdays = [
	'Domingo',
	'2ª Feira',
	'3ª Feira',
	'4ª Feira',
	'5ª Feira',
	'6ª Feira',
	'Sabado'
];

const flavourMessages = [
	'lsgmtw',
	'O Gonçalo tem um nariz grande',
	'Não alimentem o cabelo da Cláudia por favor',
	'Summary: Correction of the Workshit',
	'Este site é patrocinado pelos Illluminati',
	'Calculem o bicho.',
	'Beijonhos da Fernamda Martins',
	'Se calhar chovem picaretas',
	'O xico é um pão',
	'Quem é que foi o idiota que teve a ideia de fazer este site?',
	'A Ana é tsundere... baka!',
	'É PÁ TA CALADO',
	'Hm... quem é que vai ao quadro? Adriana!',
	'Toda a gente tem um lado desconhecido ;)',
	'Anselmo de Atrasade'
];

var initFuncs = [];
var timerCallback;
var nameSetCallback;

var localName = '';
var localNum = '';

function updateTimer() {
	var date = new Date();
	
	var ho = prefixZero(date.getHours());
	var mi = prefixZero(date.getMinutes());

	var se = prefixZero(date.getSeconds());
	
	var da_i = date.getDate();
	var mo_i = date.getMonth();
	var wd_i = date.getDay();
	
	var da = prefixZero(da_i);
	var mo = months[mo_i];
	var wd = weekdays[wd_i];

	$('#time-ticker').text(ho + ':' + mi + ':' + se);
	$('#day-ticker').text(da + '/' + mo + ' (' + wd + ')');
	
	if(timerCallback != null)
		timerCallback(wd_i, da_i, mo_i);
}

function prefixZero(str) {
	str = '' + str;
	return str.length < 2 ? '0' + str : str;
}

function setName() {
	if(localName != null) {
		$('#name-request').hide();
		$("#name").text(' ' + localName);
		$("#num").text('(nº' + localNum + ')');
	} else {
		$('#name-request').show();
		$("#name").text('');
		$("#num").text('');
	}
}

function buildFooter() {
	return revision + "ª Revisão • " + flavourMessages[Math.floor(Math.random() * flavourMessages.length)] + " • <a href='changelog.html'>changelog</a> • <span id='clear-data'>remover nome/num</span>";
}

function initTimer() {
	setInterval(updateTimer, 1000);
	updateTimer();
}

$(function() {
	for(f in initFuncs)
		initFuncs[f]();
	
	$('#footer-top').html(buildFooter());
	
	localName = $.cookie('stored_name');
	localNum = $.cookie('stored_num');
	setName();
});

$('#name-request').click(function() {
	localName = prompt("O meu nome é...");
	localNum = prompt("O meu número é...");
	$.cookie('stored_name', localName, { expires: 365 });
	$.cookie('stored_num', localNum, { expires: 365 });
	alert('A tua informação foi guardada. Podes remove-la no rodapé da pagina.');
	setName();
	
	if(nameSetCallback != null)
		nameSetCallback();
});

$(document).on("click", "#clear-data", function() {
	if(confirm("Queres remover a tua informação no site? A informação é guardada em cookies e não é visivel por mais nenhum computador.")) {
		$.removeCookie('stored_name');
		$.removeCookie('stored_num');
		localName = null;
		localNum = -1;
		
		setName();
		if(nameSetCallback != null)
			nameSetCallback();
	}
});
