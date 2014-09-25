<?php
	include 'accounts.php';

	$login = $_POST['login'];
	$passcs = $_POST['passcs'];
	if(pass_matches($login, $passcs)) {
		$events = json_decode(file_get_contents('events.json'), true);

		if($events == null) {
			echo("<span class='error'>Algo correu mal, events.json não foi lido corretamente!</span><br>");
			echo("Conteudos: " . file_get_contents('events.json'));
		} else {
			$did_stuff = false;
			$call = $_POST['call'];
			$date = $_POST['date'];
			$data = $_POST['data'];
			$data['creator'] = get_dispname(get_acc($login));
			$name = $data['name'];
			
			if($call == 'rem') {
				if(array_key_exists($date, $events)) {
					foreach($events[$date] as $e)
						if($e['name'] == $name) {
							unset($e);
							echo("O evento <b>$name</b> em <b>$date</b> foi removido.<br>");
							$did_stuff = true;
							break;
						}
					if(sizeof($events[$date] == 0))
						unset($events[$date]);
				}
			} else {
				$events_today = null;
				$exists = false;
				
				if(array_key_exists($date, $events)) {
					$events_today = $events[$date];
					foreach($events[$date] as $e)
						if($e['name'] == $name) {
							echo("O evento <b>$name</b> em <b>$date</b> já existe.<br>");
							$did_stuff = true;
							$exists = true;
							break;
						}
				}
				
				if(!$exists) {
					if($events_today == null)
						$events_today = [];
					
					array_push($events_today, $data);
					$type = $data['type'];
					$events[$date] = $events_today;
					echo("O evento <span class='event-$type'><b>$name</b></span> em <b>$date</b> foi adicionado.<br>");
					$did_stuff = true;
				}
			}
			
			if(!$did_stuff)
				echo("Nada aconteceu...");
			
			date_default_timezone_set("Europe/Lisbon");
			$log = date(DateTime::RFC1036) . ' - ' . $data['creator'] . ': ' . strtoupper($call) . ' ' . $date . '; subj ' . $data['subj'] . '; "' . $data['name'] . '"; ' . $data['type'];
			file_put_contents('log.txt', "$log\n", FILE_APPEND);
			
			file_put_contents('events.json', json_encode($events));
		}
	} else echo("Login/Password invalidos.");
?>