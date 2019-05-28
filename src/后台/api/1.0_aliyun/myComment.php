<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");
 
$head_path_prefix = "https://catsjuice.cn/calligraphyPlat/";
include "../../db/DbManage.php";
$db = new DbManage();

/**
 * @param userid:用户id 
 *
 */
if(isset($_GET['userid']) && isset($_GET['offset'])){
	$userid = $_GET['userid'];
	$offset = $_GET['offset'];
	// 1. 获取用户信息
	$res = $db->executeSqlTxt("SELECT `head_path`,`user_name` FROM user WHERE `user_id` = " . $userid);
	if($row = mysqli_fetch_row($res)){
		$head_path = $row[0];
		$user_name = $row[1];
		$head_path = str_replace('../../', '', $head_path);
		$head_path = $head_path_prefix.$head_path;
	}else{
		$result = array('status' => '500','message' => '获取用户信息失败，请检查userid：' + $userid);
		echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+
		exit();
	}
	// 2. 遍历评论表
	// 2.1 判断加载那几条
	if($offset == 0){
		$res = $db->executeSqlTxt("SELECT * FROM comment WHERE `user_id` = " . $userid . " ORDER BY `comment_id` DESC LIMIT 0,10");
	}else{
		$res = $db->executeSqlTxt("SELECT * FROM comment WHERE `user_id` = " . $userid . " AND `comment_id` < " . $offset . " ORDER BY `comment_id` DESC LIMIT 0,10");
	}
	
	$comment_list = array();	// 结果数组
	
	while ($row = mysqli_fetch_row($res)) {
		$comment_id = $row[0];
		$comment_content = $row[1];
		$calligraphy_id = $row[2];
		$date = $row[4];
		$time = $row[5];
		// 3. 根据动态id获取动态详情
		$queryCalligraphy = $db->executeSqlTxt("SELECT `title`,`content` FROM calligraphy WHERE `calligraphy_id` = " . $calligraphy_id);
		if($r = mysqli_fetch_row($queryCalligraphy)){
			$title = $r[0];
			$content = $r[1];
		}else{
			$result = array('status' => '501','message' => '获取动态详情失败' + $calligraphy_id);
			echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+
			exit();
		}
		$comment = array(
			'comment_id' => $comment_id,
			'comment_content' => $comment_content,
			'calligraphy_id' => $calligraphy_id,
			'date' => $date,
			'time' => $time,
			'title' => $title,
			'content' => $content,
			'user_name' => $user_name,
			'head_path' => $head_path
		);	//单条评论数组
		array_push($comment_list, $comment);
	}
	$result = array('status' => '000',
					'message' => '评论查询成功',
					'comment_list' => $comment_list );
}else{
	$result = array('status' => '400',
					   'message' => '参数缺失'  );
}
echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+
