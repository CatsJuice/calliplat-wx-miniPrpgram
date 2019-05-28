<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");

include "../../db/DbManage.php";
$db = new DbManage();

if(isset($_GET['username']) && isset($_GET['password']) && isset($_GET['email']) && isset($_GET['ckcode'])){
	$username = $_GET['username'];
	$password = $_GET['password'];
	$email = $_GET['email'];
	$ckcode = $_GET['ckcode'];
	//username查重
	$isRepeat = $db->executeSqlTxt("SELECT * FROM user WHERE `user_name` = '" . $username ."'");
	if($row = mysqli_fetch_row($isRepeat)){
		// 参数丢失
		$result = array('status' => 4,"message" => "用户名已注册");
	}else{
		$sqlTxt = "SELECT `code_value` FROM temp_ck_code WHERE `regist_username` = '" . $username . "'";
		$sqlResult = $db->executeSqlTxt($sqlTxt);
		if($row = mysqli_fetch_row($sqlResult)){
			// 存在
			$code_value = $row[0];
			if($ckcode == $code_value){
				// 验证码正确，进行注册
				$db->executeSqlTxt("INSERT INTO user(`user_name`,`password`,`head_path`,`email`) VALUES('".$username."','".$password."','../../img/head/demoHead.png','".$email."')");
				$result = array('status' => 0,"message" => "注册成功");
			}else{
				// 验证码错误、
				$result = array('status' => 1,"message" => "验证码错误，注册失败");

			}
		}else{
			// 数据库查询错误
			$result = array('status' => 2,"message" => "发送邮件后请勿更改用户名");

		}
	}

	
}else{
	// 参数丢失
	$result = array('status' => 3,"message" => "api参数缺失");

}

echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+