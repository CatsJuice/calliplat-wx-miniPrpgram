<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");
include "../../db/DbManage.php";
$db = new DbManage();

if(isset($_GET['openid'])){
	$openid = $_GET['openid'];
	$sqlTxt = "UPDATE user SET `wx_openid` = '' WHERE `wx_openid` = '" . $openid . "'";
	$sqlResult = $db->executeSqlTxt($sqlTxt);
	$result = array('status' => '000',
					'message' => '操作完成');
}else{
	$result = array('status' => '500',
					'message' => '请求参数缺失');
}
echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+