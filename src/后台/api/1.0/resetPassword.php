<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");

include "../../db/DbManage.php";
$db = new DbManage();

if(isset($_GET['password']) && isset($_GET['ckcode']) && isset($_GET['username'])){
	$username = $_GET['username'];
	$password = $_GET['password'];
	$ckcode = $_GET['ckcode'];

	$sqlTxt = "SELECT `temp_ck_code` FROM user WHERE `user_name` = '" . $username . "'";
	$res = $db->executeSqlTxt($sqlTxt);
	if($row = mysqli_fetch_row($res)){
		$temp_ck_code = $row[0];
		if($temp_ck_code == $ckcode){
			// 验证码正确，修该密码
			$db->executeSqlTxt("UPDATE user SET `password` = '" . $password . "' WHERE `user_name` = '" . $username . "'");
			$result = array("status" => 0,
						"message" => "密码修改成功");
		}else{
			// 验证码错误
			$result = array("status" => 1,
						"message" => "验证码错误");
		}
	}else{
		$result = array("status" => 2,
						"message" => "用户名有误");
	}
}else{
	$result = array("status" => 3,
						"message" => "参数缺失");
}
echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+