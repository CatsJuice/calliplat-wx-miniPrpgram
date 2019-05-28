<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");


$head_path_prefix = "https://catsjuice.com/calligraphyPlat/";
include "../../db/DbManage.php";
$db = new DbManage();

$isOpenid = isset($_GET['openid']);
$isCalliId= isset($_GET['calliId']);

if($isOpenid && $isCalliId){
	$openid = $_GET['openid'];
	$calliId = $_GET['calliId'];
	// 先获取userid
	$sqlResult = $db->executeSqlTxt("SELECT `user_id` FROM user WHERE `wx_openid` = '" . $openid . "'");
	if($row = mysqli_fetch_row($sqlResult)){
		// 已绑定,进行点赞或取消点赞的操作
		$is_like = false;
		$user_id = $row[0];
		$sqlResult = $db->executeSqlTxt("SELECT `good_lists` FROM calligraphy WHERE `calligraphy_id` = " . $calliId);
		$r = mysqli_fetch_row($sqlResult);
		$good_lists = $r[0];
		$good_list = explode("_", $good_lists);
		$new_good_list = array();
		foreach ($good_list as $value) {
			if(strlen($value) != 0){
				if($value == $user_id){
					// 存在，已点赞
					$is_like = true;
				}else{
					array_push($new_good_list, $value);
				}
			}
		}
		if(!$is_like){
			// 点赞
			array_push($new_good_list, $user_id);
		}

		$new_good_lists = "_";
		foreach ($new_good_list as  $value) {
			$new_good_lists .= $value . "_";
		}
		// 计算点赞数
		$good_num = sizeof($new_good_list);
		$db->executeSqlTxt("UPDATE calligraphy SET `good_lists` = '" . $new_good_lists . "',`good` = ". $good_num ." WHERE `calligraphy_id` = " . $calliId);
		
		$result = array('status' => 0,
					'message' => "操作成功",
					'good' => $good_num);
		
	}else{
		$result = array('status' => 1,
					'message' => "该微信用户暂未绑定calliplat账号，无法进行操作");
	}
}else{
	$result = array('status' => 500,
					'message' => "参数缺失");
}
echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+