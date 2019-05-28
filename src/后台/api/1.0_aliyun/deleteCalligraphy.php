<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");

include "../../db/DbManage.php";
$db = new DbManage();

if(isset($_GET['calliId'])){
	$calliId = $_GET['calliId'];
	$res = $db->executeSqlTxt ("SELECT `img_path` FROM calligraphy WHERE `calligraphy_id` = " . $calliId);
	if($row = mysqli_fetch_row($res)){
		$web = "../../../calligraphyPlat/img/calligraphy/web/";
		$full = "../../../calligraphyPlat/img/calligraphy/full/";
		$img_name = $row[0];

		// 删除动态
		$db->executeSqlTxt("DELETE FROM calligraphy WHERE `calligraphy_id` = " . $calliId);
		// 删除动态对应评论
		$db->executeSqlTxt("DELETE FROM comment WHERE `calligraphy_id` = " . $calliId);
		// 删除服务器上的图片
		unlink($web.$img_name);
		unlink($full.$img_name);
		$result = array('error_code' => '000',
					   'error_msg' => '动态删除成功');
	}else{
		$result = array('error_code' => '500',
					   'error_msg' => '数据库中找不到calligraphy_id：'.$calliId);
	}
}else{	
	$result = array('error_code' => '400',
					   'error_msg' => '没有信息'  );
}

echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+