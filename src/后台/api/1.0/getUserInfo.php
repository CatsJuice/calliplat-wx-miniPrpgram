<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");


$head_path_prefix = "https://catsjuice.com/calligraphyPlat/";
include "../../db/DbManage.php";
$db = new DbManage();

if(isset($_GET['openid'])){
	$openid = $_GET['openid'];
	$sqlTxt = "SELECT * FROM user WHERE `wx_openid` = '" . $openid . "'";
	$sqlResult = $db->executeSqlTxt($sqlTxt);
	if($row = mysqli_fetch_row($sqlResult)){
		$user_id = $row[0];
		$user_name = $row[1];

		// handle head_path
		$head_path = $row[3];
		$head_path = str_replace('../../', '', $head_path);
		$head_path = $head_path_prefix.$head_path;
		$email = $row[4];
		$data = array(	'user_id' =>  $user_id,
						'user_name' => $user_name,
						'head_path' => $head_path,
						'email' => $email);
		$result = array('status' => '000',
						'message' => '查找成功',
						'data' => $data );
	}else{
		$data = null;
		$result = array('status' => '404',
						'message' => '未找到该用户',
						'data' => $data );
	}
}else{
	$result = array('status' => '500',
					'message' => '请求参数缺失');
}
echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+