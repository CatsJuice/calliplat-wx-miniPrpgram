<?php

header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");
$head_path_prefix = "https://catsjuice.cn/calligraphyPlat/";
include "../../db/DbManage.php";
$db = new DbManage();

$calligraphy_id = isset($_GET['calliId']) ? $_GET['calliId'] : false;
if($calligraphy_id){
	$sqlTxt = "SELECT * FROM comment WHERE `calligraphy_id` = " . $calligraphy_id . " ORDER BY `comment_id` DESC";
	$result = $db->executeSqlTxt($sqlTxt);
		
	$comments = array();
	while ($row = mysqli_fetch_row($result)) {
		$comment_content = $row[1];
		$user_id = $row[3];
		$date = $row[4];
		$time = $row[5];

		$res = $db->executeSqlTxt("SELECT `head_path`,`user_name` FROM user WHERE `user_id` = " . $user_id);
		$r = mysqli_fetch_row($res);
		$head_path = $r[0];
		$head_path = str_replace('../../', '', $head_path);
		$user_name = $r[1];
		$comment_item = array('head_path' => $head_path_prefix.$head_path,
							  'comment_content' => $comment_content,
							  'user_name' => $user_name,
							  'time' => $time,
							  'date' => $date);
		array_push($comments, $comment_item);
	}
	if(sizeof($comments) != 0){
		// 数组不为空
		//$resultArr = $comments;
	}else{
		//$resultArr = array('error' => 'empty');
	}
	$resultArr = $comments;
	
}else{
	$resultArr = array('error' => 'calliId is Miss');
}

echo str_replace("\\/", "/",  json_encode($resultArr,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+
