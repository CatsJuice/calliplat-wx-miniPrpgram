<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");

include "../../db/DbManage.php";
$db = new DbManage();
$issetUsername = isset($_GET['username']) ? true :false;
$issetPassword = isset($_GET['password']) ? true :false;
if($issetUsername){
	if($issetPassword){
		$username = $_GET['username'];
		$password = $_GET['password'];
		$wx_openid = $_GET['openid'];
		$sqlResult = $db->executeSqlTxt("SELECT `password` FROM user WHERE `user_name` = '" . $username ."'");
		if($row = mysqli_fetch_row($sqlResult)){
			$password_correct = $row[0];
			if ($password === $password_correct) {
				// 密码正确，进行绑定
				$sqlTxt = "UPDATE user SET `wx_openid` = '" . $wx_openid . "' WHERE `user_name` = '" . $username ."'";
				$queryResult = $db->executeSqlTxt($sqlTxt);
				$result = array('status' => 0,
								 'message' => "密码正确，绑定成功");
			}else{
				// 密码错误，返回
				$result = array('status' => 1,
								 'message' => '密码错误，绑定失败');
			}
		}else{
			$result = array('status' => 5,
								 'message' => '数据库查询错误');
		}
	}else{
		$result = array('status' => 2,
								 'message' => '缺失密码，绑定失败');
	}
}else{
	if($issetPassword){
		$result = array('status' => 3,
								 'message' => '缺失用户名，绑定失败');
	}else{
		$result = array('status' => 4,
								 'message' => '缺失用户名和密码，绑定失败');
	}
}


echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+