<?php 
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");

$issetCode = isset($_GET['code']) ? true : false;
include "../../db/DbManage.php";
$db = new DbManage();


if($issetCode){
	$code = $_GET['code'];
	$appId = "wx82236ff35be7f2b2";
	$appSecret = "dc223e62e2de8443475be2ccdaca8c93";
	$url = "https://api.weixin.qq.com/sns/jscode2session?appid=".$appId."&secret=".$appSecret."&js_code=".$code."&grant_type=authorization_code";
	$result = file_get_contents($url);
	$arr =json_decode($result,TRUE);

	$openid = $arr['openid'];
	$errcode = $arr['errcode'];
	$errmsg = $arr['errmsg'];

	

	// 检索数据库，判断该微信用户是否绑定了账号
	$is_bind = false;
	$user_id = 0;
	$sqlTxt = "SELECT `user_id` FROM user WHERE `wx_openid` = '" . $openid . "'";
	$res = $db->executeSqlTxt($sqlTxt);
	if($row = mysqli_fetch_row($res)){
		$is_bind = true;
		$user_id = $row[0];
	}

	$resultArr = array( 'openid' => $openid,
						'errcode' => $errcode,
						'errmsg' => $errmsg,
						'is_bind' => $is_bind,
						'user_id' => $user_id);
}else{
	$resultArr = array(
						'errcode' => '404',
						'errmsg' => "code丢失");
}

echo str_replace("\\/", "/",  json_encode($resultArr,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+
