<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");


$head_path_prefix = "https://catsjuice.cn/calligraphyPlat/";
include "../../db/DbManage.php";
$db = new DbManage();

$iSCalliId = isset($_GET['calliId']) ? true : false;
$isOpenId = isset($_GET['openid']) ? true : false;
$isCommentContent = isset($_GET['commentContent']) ? true : false;

if($iSCalliId && $isOpenId && $isCommentContent){
	$calliId = $_GET['calliId'];
	$openid = $_GET['openid'];
	$commentContent = $_GET['commentContent'];
	// 1.判断openid是否已存在']'
	$sqlResult = $db->executeSqlTxt("SELECT `user_id` FROM user WHERE `wx_openid` = '" . $openid . "'");
	if($row = mysqli_fetch_row($sqlResult)){
		// 存在
		$user_id = $row[0];
		date_default_timezone_set('Asia/Shanghai');
		$date = date('Y-m-d');
		$time = date('H:i:s');
		$db->executeSqlTxt("INSERT INTO comment(`comment_content`,`calligraphy_id`,`user_id`,`date`,`time`) VALUES('".$commentContent."',".$calliId.",".$user_id.",'".$date."','".$time."')");
		$result = array('status' => 000,
					'message' => "评论成功");
	}else{
		$result = array('status' => 501,
					'message' => "openid有误或者用户未绑定");
	}

}else{
	$result = array('status' => 500,
					'message' => "参数缺失");
}
echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+