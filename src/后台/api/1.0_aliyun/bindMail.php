<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");

include "../../db/DbManage.php";
$db = new DbManage();

include_once "../../phpmailer/mail.php";
$random = rand(100000,999999);
// 保存该数据到数据库
$content = "<div>你好，您正在注册Calliplat开放平台，该邮箱将作为你的账户绑定邮箱，您的验证码为：</div>";
$content .= "<b style='color:blue'>".$random."</b>,请勿泄露给他人，若非本人操作请无视该邮件";
$subject = "calligraphy平台注册";

if(isset($_GET['email']) && isset($_GET['username'])){
	$email = $_GET['email'];
	$username = $_GET['username'];
	date_default_timezone_set('Asia/Shanghai');
	$datetime = date('Y-m-d H:i:s');

	$sqlres = $db->executeSqlTxt("SELECT * FROM temp_ck_code WHERE `regist_username` = '" .$username."'" );
	if($row = mysqli_fetch_row($sqlres)){
		// 数据库已存在
		$sqlTxt = "UPDATE temp_ck_code SET `code_value` = " . $random . " , `create_time` = " . $datetime . " WHERE `regist_username` = '" . $username . "'";
	}else{
		$sqlTxt = "INSERT INTO temp_ck_code(`code_value`,`create_time`,`regist_username`) VALUES('".$random."','".$datetime."','".$username."')";
	}
	$db -> executeSqlTxt($sqlTxt);
	$target = $email;
	$mail_status = sendMail($target,$subject,$content);
	if ($mail_status == 1) {
		$result = array("status" => 0,
					"message" => "邮件发送成功");
	}else{
		$result = array("status" => 2,
					"message" => "邮件发送失败，未知错误");
	}
	
}else{
	$result = array("status" => 1,
					"message" => "缺少email或username参数");
}
echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+
