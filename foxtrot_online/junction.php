<?php
session_start();
try{
	require_once 'backstage.php';
	//	require_once 'html_fragments.php';

	if(isset($_POST['class'])){

//		define('DB_USERNAME', 'root');
//		define('DB_PASS', 'alonba2358');
//		define('DB_NAME', 'company_a_foxtrot_online');
//

		if(!defined('DB_USERNAME') || !defined('DB_PASS') || !defined('DB_NAME')){
			db_choose($_POST);
		}

		db_connect(); //open DB connection

		if($_POST['class'] != 'no_class'){ // check if needed to create an object or not
			$obj = new $_POST['class']($_POST); //create object
			echo json_encode($obj->$_POST['func']($_POST)); //execute the function sent to the server
		} else{
			echo json_encode($_POST['func']($_POST)); //execute the function sent to the server
		}

		$GLOBALS['db_conn']->close(); //close DB connection
	}

} catch(Exception $e){
	$json_obj                = new json_obj();
	$json_obj->error_message = $e->getMessage();
	$json_obj->error_level   = $e->getCode();
	$json_obj->status        = false;
	echo json_encode($json_obj);
}