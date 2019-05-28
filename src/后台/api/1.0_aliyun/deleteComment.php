<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");
 
$head_path_prefix = "https://catsjuice.cn/calligraphyPlat/";
include "../../db/DbManage.php";
$db = new DbManage();

if(isset($_GET['comment_id'])){
	$comment_id = $_GET['comment_id'];
	$db->executeSqlTxt("DELETE FROM comment WHERE `comment_id` = " . $comment_id);
	$result = array('status' => '000',
					   'message' => '删除成功'  );
}else{
	$result = array('status' => '400',
					   'message' => '参数缺失'  );
}
echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+
