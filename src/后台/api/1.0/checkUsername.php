<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");
include "../../db/DbManage.php";
$db = new DbManage();

$issetUsername = isset($_GET['username']) ? true : false;
if($issetUsername){
	$username = $_GET['username'];
	$sqlResult = $db->executeSqlTxt("SELECT * FROM user WHERE `user_name` = '" . $username . "'");
	if($row = mysqli_fetch_row($sqlResult)){
		$result = array('status' => 0,
						'message' => "用户名存在");
	}else{
		$result = array('status' => 1,
						'message' => "用户名不存在");
	}
}else{
	$result = array('status' => 2,
					'message' => "用户名参数丢失");
}

echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+