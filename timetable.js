const biologyTurnsSwap = false;

const monthsLong = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro'
];

const times = [
	'08:15 - 09:00',
	'09:00 - 09:45',
	'10:00 - 10:45',
	'10:45 - 11:30',
	'11:40 - 12:25',
	'12:25 - 13:10'
];

const timetable = [
	[ 0, 0, 0, 0, 0, 0 ],
	[ 0, 0, 0, 1, 2, 2 ],
	[ 3, 3, 4, 4, 5, 5 ],
	[ 4, 4, 1, 1, 2, 2 ],
	[ 3, 3, 4, 4, 3, 3 ],
	[ 4, 4, 1, 1, 5, 5 ],
	[ 0, 0, 0, 0, 0, 0 ]
];

const subjectNames = [
	"Sem Disciplina", // 0
	"Português", // 1
	"Aplicações Informáticas", // 2
	"Biologia", // 3
	"Matemática A", // 4
	"Educação Fisica" // 5
];

const shortSubjectNames = [
	"Vaz",
	"Port",
	"ApI",
	"Bio",
	"MatA",
	"EdF"
];

const daysInMonth = [
	31,
	28,
	31, 
	30,
	31,
	30,
	31,
	31,
	30,
	31,
	30,
	31
];

var timetableInit = false;
var eventArray = [];
var timelineOverrides = [];

function initTimelineOverrides() {
	for(i = 0; i < 30; i++) {
		var ft = i >= 12;
		if(biologyTurnsSwap)
			ft = !ft;
		
		var t1 = ft ? 0 : 4;
	
		var thur = {};
		thur[t1] = 0;
		thur[t1 + 1] = 0;
	
		var override = {
			4: thur
		};
				
		timelineOverrides[i] = override;
	}
}

function buildTimeline(id, wd, key) {
	var eventsToday = eventArray[key];
	var testsToday = [];

	if(eventsToday != null) {
		for(i in eventsToday) {
			var event = eventsToday[i];
			if(event['type'] == 'test')
				testsToday.push(event['subj']);
		}
	}
	
	var containerHtml = '';
	var todaysTimetable = timetable[wd];

	for(time in times) {
		var subj = todaysTimetable[time];
		var wds = '' + wd;
		var numi = localNum - 1;
		var noped = false;
		
		if(numi >= 0 && numi < timelineOverrides.length && timelineOverrides[numi][wds] != undefined && timelineOverrides[numi][wds][time] != undefined)
			noped = true;
		
		var name = shortSubjectNames[subj];
		var hasTest = testsToday.indexOf('' + subj) >= 0;
	
		containerHtml += '<div>';
		containerHtml += cell(times[time], 'cell-left');
		containerHtml += cell(name + (hasTest ? ' <b>(teste)</b>' : ""), 'cell-' + (noped ? 'nop' : name.toLowerCase()));
		containerHtml += '</div>';
	}
	
	$('#' + id).html(containerHtml);
	testsToday = [];
}

function buildEventList() {	
	var containerHtml = '';
	for(dateStr in eventArray)
		containerHtml += date(dateStr);
	
	$('#events-container').html(containerHtml);
}

function cell(txt) {
	return cell(txt, '');
}

function cell(txt, classes) {
	return '<span class="cell ' + classes + '">' + txt + '</span>';
}

function date(date) {
	if(hasPassed(date))
		return '';
	
	var containerHtml = '<b>' + readableDate(date) + '</b><ul>';
	
	var eventsToday = eventArray[date];
	for(i in eventsToday)
		containerHtml += event(eventsToday[i]);
		
	return containerHtml + '</ul>';
}

function dateToKey(day, month) {
	var days = daysInMonth[month];
	if(day >= days) {
		day = day - days;
		month++;
		if(month >= 12)
			month = 0;
	}
	
	return day + "/" + (month + 1);
}

function readableDate(date) {
	var today = new Date();
	var passed = strToComparableVal(date);
	
	var prefix = '';
	if(today.toLocaleDateString() == passed.toLocaleDateString()) {
		prefix = 'Hoje (';
	} else {
		today.setDate(today.getDate() + 1);
		if(today.toLocaleDateString() == passed.toLocaleDateString()) {
			prefix = 'Amanhã (';
		} 
	}
	
	var tokens = date.split('/');
	var day = tokens[0];
	var month = tokens[1] - 1;
	return prefix + day + " de " + monthsLong[month] + (prefix.length == 0 ? '' : ')');
}

function strToComparableVal(str) {
	var tokens = str.split("/");
	var day = tokens[0];
	var month = tokens[1] - 1;
	var year = month >= 8 ? 2014 : 2015;
	var date = new Date(year, month, day, 0, 0, 0, 0);

	return date;
}

function dateCompare(dateStr1, dateStr2) {
	var date1 = strToComparableVal(dateStr1);
	var date2 = strToComparableVal(dateStr2);
	
	return date1 - date2;
}

function addDynamicWeekEvents() {
	var date = new Date();
	var wd = date.getDay();
	var da = date.getDate();
	var mo = date.getMonth();

	addWeeklyEventIf(da, mo, wd, 1, {
		type: 'scl',
		subj: '4',
		name: 'Aula Suplementar ás 14:30'
	});
}

function addWeeklyEventIf(da, mo, wd, ed, event) {
	if(wd > ed)
		return;
	
	var date = dateToKey(da - wd + ed, mo);
	var array = new Array();
	var newArray = true;
	
	if(eventArray[date] != null) {
		array = eventArray[date];
		newArray = false;
	}
	
	event['creator'] = 'Evento Automático';
	array.push(event);
	if(newArray)
		eventArray[date] = array;
}

function sortEventArray(){
	var sortedKeys = new Array();
	var sortedObj = { };

	for(i in eventArray)
		sortedKeys.push(i);
	sortedKeys.sort(dateCompare);

	for(i in sortedKeys)
		sortedObj[sortedKeys[i]] = eventArray[sortedKeys[i]];
	return sortedObj;
}

function hasPassed(date) {
	var tokens = date.split('/');
	var day = tokens[0];
	var month = tokens[1] - 1;
	var year = month >= 8 ? 2014 : 2015;
	
	var compare = new Date(year, month, day, 24, 0, 0, 0);
	var now = new Date();
	
	return now > compare;
}

function event(data) {
	return '<li><span class="event-' + data['type'] + '"><b>' + subjectNames[data['subj']] + '</b>: ' + data['name'] + ' </span><sup><i>(' + data['creator'] + ')</i></sup></li>';
}

function initTimeline() {
	
}

initFuncs.push(function() {
	$.getJSON('events.json', function(data) {
		eventArray = data;
		addDynamicWeekEvents();
		eventArray = sortEventArray();
		buildEventList();
		initTimelineOverrides();
		initTimer();
	});	
});

timerCallback = function(wd, da, mo) {
	if(!timetableInit) {
		buildTimeline('grid-today', wd, dateToKey(da, mo));
		buildTimeline('grid-tomorrow', wd == 6 ? 0 : wd + 1, dateToKey(da + 1, mo));
		timetableInit = true;
	}
};

nameSetCallback = function() {
	timetableInit = false;
};