<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");

include "../../db/DbManage.php";
$db = new DbManage();


if(isset($_GET['openid']) && isset($_GET['title']) && isset($_GET['content'])){
	$openid = $_GET['openid'];
	$title = $_GET['title'];
	$content = $_GET['content'];

	$isUserResult = isUser($openid);
	if($isUserResult['isUser']){
		$user_id = $isUserResult['data']['user_id'];
		$user_name = $isUserResult['data']['user_name'];
		$count = getCount($user_id);
		if($count < 10){
			// 未达到上限，可发送反馈

			// 发送邮件
			include_once "../../phpmailer/mail.php";
			$mail_content = "<div>开发者你好，用户<b style='color:red'>".$user_name."</b>,用户user_id为&nbsp;<b> ".$user_id." </b>&nbsp;给您发送了反馈,以下为反馈内容：</div><br>";
			$mail_content .= "<b>".$title."</b><br><br>";
			$mail_content .= "<div>".$content."</div>";
			$subject = "calliplat用户反馈";

			$target = "1298554944@qq.com";	
			// $target = getDeveloperEmail();	获取所有开发者的邮件地址
			$mail_status = sendMail($target,$subject,$mail_content);
			if ($mail_status == 1) {
				// 邮件发送成功，写入数据库
				date_default_timezone_set('Asia/Shanghai');
				$date = date("Y-m-d");
				$time = date("H:i:s");
				$sql = "INSERT INTO message_log VALUES(null,'".$title."','".$content."','".$user_id."','".$date."','".$time."')";
				$db->executeSqlTxt($sql);
				$result = array("status" => '000',
							"message" => "邮件发送成功",
							'mysql' => $sql);
			}else{
				$result = array("status" => '502',
							"message" => "邮件发送失败，未知错误");
			}
		}else{
			// 用户发送次数达上限
			$result = array('status' => '501',
					'message' => '当日发送邮件次数已达上限');
		}
	}else{
		$result = array('status' => '500',
					'message' => '该openid对应的用户不存在');
	}
}else if(isset($_GET['openid']) ){
	$openid = $_GET['openid'];
	$isUserResult = isUser($openid);
	if($isUserResult['isUser']){
		$user_id = $isUserResult['data']['user_id'];

		$count = getCount($user_id);
		$count = 10 - $count;
		$result = array('status' => '000',
					'message' => 'count获取',
					'count' => $count,
					'user_id' => $user_id,
					'isUserResult' => $isUserResult);
	}else{
		$result = array('status' => '500',
					'message' => '该openid对应的用户不存在');
	}
	
}else{
	$result = array('status' => '400',
					'message' => '请求参数缺失');
}
echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+


/**
 * 根据openid判断用户是否存在
 */
function isUser($openid){
	$db = new DbManage();
	$queryUserResult = $db->executeSqlTxt("SELECT * FROM user WHERE `wx_openid` = '" . $openid . "'");
	if($row = mysqli_fetch_row($queryUserResult)){
		$user_id  = $row[0];
		$user_name = $row[1];
		$data = array('user_id' => $user_id,'user_name'=>$user_name);
		$result = array('isUser' => true,
						'data' => $data);
	}else{
		$result = array('isUser' => false,
						'data' => '');
	}
	return $result;
}
/**
 * 统计当日已使用次数
 */
function getCount($user_id)
{
	$db = new DbManage();

	date_default_timezone_set('Asia/Shanghai');
	$date = date("Y-m-d");
	$time = date("H:i:s");
	//echo $date;
	//echo "SELECT COUNT(*) FROM message_log WHERE `user_id` = ". $user_id . " AND `date` = '" . $date . "'";
	$queryCountResult = $db->executeSqlTxt("SELECT COUNT(*) FROM message_log WHERE `user_id` = ". $user_id . " AND `date` = '" . $date . "'");
	$row = mysqli_fetch_row($queryCountResult);
	$count = $row[0];
	return $count;
}