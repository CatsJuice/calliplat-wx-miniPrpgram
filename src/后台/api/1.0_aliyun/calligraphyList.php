<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");


$head_path_prefix = "https://catsjuice.cn/calligraphyPlat/";
include "../../db/DbManage.php";
$db = new DbManage();

/*
if (isset($_GET['offset'])) {
	$offset = $_GET['offset'];
}else{
	$offset = "NO_OFFSET";
}
*/
$isOffset = isset($_GET['offset']) ? true : false;
$iSCalliId = isset($_GET['calliId']) ? true : false;
$isOpenId = isset($_GET['openid']) ? true : false;
$isKeyword = isset($_GET['keyword']) ? true : false;

$is_bind = false;	// 是否绑定
$is_like = false;	// 是否点赞
$user_id = 0;		// 用户id

if($isOffset && $isKeyword){
	$img_path_prefix = "https://catsjuice.cn/calligraphyPlat/img/calligraphy/web/";
	$offset = $_GET['offset'];
	$keyword = $_GET['keyword'];
	if($offset == 0){
		if(strlen($keyword) == 0)
			$sqlTxt = "SELECT * FROM calligraphy ORDER BY `calligraphy_id` DESC LIMIT 0,10 ";
		else
			$sqlTxt = "SELECT * FROM calligraphy WHERE `content` LIKE '%".$keyword."%' OR `title` LIKE '%".$keyword."%' ORDER BY `calligraphy_id` DESC LIMIT 0,10 ";
	}
	else{
		if(strlen($keyword) == 0)
			$sqlTxt = "SELECT * FROM calligraphy WHERE `calligraphy_id` < ".$offset." ORDER BY `calligraphy_id` DESC LIMIT 0,10 ";
		else
			$sqlTxt = "SELECT * FROM calligraphy WHERE `calligraphy_id` < ".$offset." (AND `content` LIKE '%".$keyword."%' OR `title` LIKE '%".$keyword."%') ORDER BY `calligraphy_id` DESC LIMIT 0,10 ";
	}

}else if($iSCalliId && $isOpenId){
	$calliId = $_GET['calliId'];
	$openid = $_GET['openid'];
	// 微信客户端已登录，
	// 判断用户是否已点赞当前动态
	// 1. 先根据用户openid获取绑定的平台账号
	$sqlResult = $db->executeSqlTxt("SELECT `user_id` FROM user WHERE `wx_openid` = '" . $openid . "'");
	if($row = mysqli_fetch_row($sqlResult)){
		// 已绑定
		$user_id = $row[0];
		$is_bind = true;
		
	}else{
		// 未绑定
		$user_id = 0;
		$is_like = false;
		$is_bind = false;
	}
	$img_path_prefix = "https://catsjuice.cn/calligraphyPlat/img/calligraphy/full/";
	$sqlTxt = "SELECT * FROM calligraphy WHERE `calligraphy_id` = " . $calliId;
}else if(isset($_GET['userid']) && isset($_GET['offset'])){
	$img_path_prefix = "https://catsjuice.cn/calligraphyPlat/img/calligraphy/web/";
	$user_id = $_GET['userid'];
	$offset = $_GET['offset'];
	if(isset($_GET['handleLike'])){
		// 要获取的是user_id用户已点赞的动态
		$keyword = '_'.$user_id.'_';
		if($offset == 0){
			$sqlTxt = "SELECT * FROM calligraphy WHERE `good_lists` LIKE '%".$keyword."%' ORDER BY `calligraphy_id` DESC LIMIT 0,10 ";
		}else{
			$sqlTxt = "SELECT * FROM calligraphy WHERE `calligraphy_id` < ".$offset." (AND `good_lists` LIKE '%".$keyword."%') ORDER BY `calligraphy_id` DESC LIMIT 0,10 ";
		}
	}else{
		if($offset == 0){
			$sqlTxt = "SELECT * FROM calligraphy WHERE `user_id` = ".$user_id." ORDER BY `calligraphy_id` DESC LIMIT 0,10 ";
		}else{
			$sqlTxt = "SELECT * FROM calligraphy WHERE `calligraphy_id` < ".$offset." AND `user_id` = ".$user_id." ORDER BY `calligraphy_id` DESC LIMIT 0,10 ";
		}
	}
	
}else{
	$resultArr = array('status' => '500','message' => "参数缺失");
	echo str_replace("\\/", "/",  json_encode($resultArr,JSON_UNESCAPED_UNICODE));
	exit();
}

$result = $db->executeSqlTxt($sqlTxt);

$imgs  = array();
$items = array();
$count = 0;
while ($row = mysqli_fetch_row($result)) {
	if($user_id != 0){
		// 用户已经登录并绑定微信账号
		// 检查是否点赞
		$sqlResult = $db->executeSqlTxt("SELECT `good_lists` FROM calligraphy WHERE `calligraphy_id` = " . $row[0]);
		$r = mysqli_fetch_row($sqlResult);
		$good_lists = $r[0];
		$good_list = explode("_", $good_lists);
		foreach ($good_list as $value) {
			if($value == $user_id){
				// 存在，已点赞
				$is_like = true;
			}
		}
	}
	$count++;
	$calligraphy_id = $row[0];
	$img_path =$img_path_prefix.$row[1];
	array_push($imgs, $img_path);
	$title=$row[2];
	$content = $row[3];
	$tags=$row[4];
	$user_id = $row[5];
	$view = $row[6];
	$good = $row[7];
	$good_lists = $row[8];

	$tagArr = explode("_", $tags);
	$tags = array();
	foreach ($tagArr as $value) {
		if($value){
			$res = $db->executeSqlTxt("SELECT `tag_name`,`bg_color` FROM tag WHERE `tag_id` = ".$value);
			$tag = mysqli_fetch_row($res);
			$tag_name = $tag[0];
			$bg_color = $tag[1];
			$tags_item = array(
				'tag_name' => $tag_name,
				'bg_color' => $bg_color);
			array_push($tags, $tags_item);
		}
	}

	// 根据用户id获取必要的用户信息
	$res = $db->executeSqlTxt("SELECT `user_name`,`head_path` FROM user WHERE `user_id` = ".$user_id);
	$item_row = mysqli_fetch_row($res);
	$user_name = $item_row[0];
	$head_path = $item_row[1];
	$head_path = str_replace('../../', '', $head_path);

	// 构造item数组
	$item = array(
		'calligraphy_id' => $calligraphy_id,
		'is_like' => $is_like,
		'img_path' => $img_path,
		'title' => $title,
		'content' => $content,
		'tags' => $tags,
		'user_name' => $user_name,
		'head_path' => $head_path_prefix.$head_path,
		'view' => $view,
		'good' => $good );
	array_push($items, $item);
}
$resultArr = array();

if($count == 0){
	$resultArr = array('error_code' => '002',
					   'error_msg' => '没有信息'  );
}else{
	$resultArr = $items;
}
echo str_replace("\\/", "/",  json_encode($resultArr,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+
//echo str_replace("\\/", "/",  json_encode($imgs,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+