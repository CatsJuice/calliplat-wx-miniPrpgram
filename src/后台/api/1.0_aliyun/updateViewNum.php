<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");
include "../../db/DbManage.php";
$db = new DbManage();


if(isset($_GET['calliId'])){
	$calliId = $_GET['calliId'];
	$db->executeSqlTxt("UPDATE calligraphy SET `view` = `view` + 1 WHERE `calligraphy_id` = " . $calliId);
	$res = $db->executeSqlTxt("SELECT `view` FROM calligraphy WHERE `calligraphy_id` = " . $calliId);
	if($row = mysqli_fetch_row($res)){
		$view = $row[0];
		$result = array('status' => '500',
					   'message' => 'view+1',
					   'view' => $view  );
	}else{
		$result = array('status' => '500',
					   'message' => '数据查询出错'  );
	}
}else{
	$result = array('status' => '400',
					   'message' => '没有信息'  );
}
echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+
