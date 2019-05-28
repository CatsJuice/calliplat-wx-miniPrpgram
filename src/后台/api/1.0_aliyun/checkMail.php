<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");

include "../../db/DbManage.php";
$db = new DbManage();



if(isset($_GET['username'])){
	$username = $_GET['username'];
	$res = $db->executeSqlTxt("SELECT `email` FROM user WHERE `user_name` = '" . $username . "'");
	if($row = mysqli_fetch_row($res)){
		$email = $row[0];
		include_once "../../phpmailer/mail.php";
		$random = rand(100000,999999);
		$content = "<div>用户<b style='color:red'>".$username."</b>，你好，您正在重置Calliplat开放平台的密码，您的验证码为：</div>";
		$content .= "<b style='color:blue'>".$random."</b>,请勿泄露给他人，若非本人操作请无视该邮件";
		$subject = "calliplat平台密码重置";
		$db->executeSqlTxt("UPDATE user SET `temp_ck_code` = '" . $random . "'");

		$target = $email;
		$mail_status = sendMail($target,$subject,$content);
		if ($mail_status == 1) {
			$result = array("status" => 0,
						"message" => "邮件发送成功");
		}else{
			$result = array("status" => 1,
						"message" => "邮件发送失败，未知错误");
		}
	}else{
		$result = array("status" => 2,
						"message" => "邮件发送失败，没有邮箱或用户名有误");
	}
}else{
	$result = array("status" => 3,
						"message" => "参数缺失");
}
echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+
