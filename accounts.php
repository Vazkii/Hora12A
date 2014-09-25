<?php
	$accounts = [];
	
	add_acc('demo', 'demo', 'Demo');

	function pass_matches($login, $passcs) {
		$acc = get_acc($login);
		if($acc == null)
			return false;
		
		$passcs_ = get_passcs($acc);
		return $passcs_ == $passcs;
	}
	
	function add_acc($login, $pass, $dispname) {
		global $accounts;
		$arr = [];
		$arr['login'] = $login;
		$arr['passcs'] = md5($pass);
		$arr['dispname'] = $dispname;
		
		$accounts[$login] = $arr;
	}
	
	function get_acc($login) {
		global $accounts;
		if(array_key_exists($login, $accounts))
			return $accounts[$login];
		return null;
	}
	
	function get_login($acc) {
		return $acc == null ? '' : $acc['login'];
	}
	
	function get_passcs($acc) {
		return $acc == null ? '' : $acc['passcs'];
	}
	
	function get_dispname($acc) {
		return $acc == null ? '' : $acc['dispname'];
	}
?>