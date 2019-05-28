<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");

$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);	// 获取后缀名

$head_path_prefix = "https://catsjuice.cn/calligraphyPlat/";
include "../../db/DbManage.php";
$db = new DbManage();

if(isset($_POST['openid'])){
	$openid = $_POST['openid'];
	$sqlTxt = "SELECT `user_id` FROM user WHERE `wx_openid` = '" . $openid . "'";
	$sqlResult = $db->executeSqlTxt($sqlTxt);
	if($row = mysqli_fetch_row($sqlResult)){
		$user_id = $row[0];
		// 存在用户，接收图片，并更新数据库


		$file_name = $user_id . "." . $extension;
		$receive_res = receiveHead($file_name);
		$new_head_path = '../../img/head/' . $file_name;
		$head_url = "http://catsjuice.cn/calligraphyPlat/img/head/". $file_name;
		$sql = "UPDATE user SET `head_path` = '" . $new_head_path . "' WHERE `user_id` = " .$user_id;
		$db->executeSqlTxt($sql);
		$result = array('status' => '000',
						'message' => $receive_res,
						'head_path' => $head_url);
	}else{
		$result = array('status' => '404',
						'message' => '未找到该用户');
	}
}else{
	$result = array('status' => '500',
						'message' => '请求参数缺失');
}



echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+

/**
  * @param[file_name] 要保存的文件
  */
function receiveHead($file_name)
{
	// 接收文件
	if ($_FILES["file"]["error"] > 0)
	{
	    // echo "错误：: " . $_FILES["file"]["error"] . "<br>";
	    return $_FILES["file"]["error"];
	}
	else
	{
	    $SERVER_ROOT = "../../..";
	    $head_temp = $SERVER_ROOT."/calligraphyPlat/img/head/temp/";
	    $head = $SERVER_ROOT."/calligraphyPlat/img/head/";
	    $temp_file = $head_temp . $file_name;
	    $final_file = $head . $file_name;
	    // if (file_exists($full . $_FILES["file"]["name"]))
	    if (file_exists($temp_file))
	    {
	        // echo $_FILES["file"]["name"] . " 文件已经存在。 ";
	        // return "文件已存在";
	        unlink($temp_file);
	    }
	   
	        move_uploaded_file($_FILES["file"]["tmp_name"], $temp_file);
			// 图片裁剪
			include "../../imgCompress/imageCut.php";

			// 原始图片的路径
			$source = $temp_file;
			$width = 200; // 裁剪后的宽度
			$height = 200;// 裁剪后的高度
			// 裁剪后的图片存放目录
			// 如果已存在，先删除
			if (file_exists($final_file))
		        unlink($final_file);
			$target = $final_file;
			// 裁剪后保存到目标文件夹
			if (image_center_crop($source, $width, $height, $target)) {
			    // echo "<img src='$target'>";
			    // 裁剪成功，删除原图
			    unlink($temp_file);
			    return "接收成功，裁剪成功";
			}else{
				return "接收成功，裁剪失败";
			}

	}
}