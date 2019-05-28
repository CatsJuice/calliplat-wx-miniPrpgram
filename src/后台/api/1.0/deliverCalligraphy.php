<?php
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json;charset=utf-8");

date_default_timezone_set('Asia/Shanghai');
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);	// 获取后缀名
$timestamp = time();


$head_path_prefix = "https://catsjuice.com/calligraphyPlat/";
include "../../db/DbManage.php";
$db = new DbManage();
if(isset($_POST['openid']) && isset($_POST['title']) && isset($_POST['content'])){
	$title = $_POST['title'];
	$openid = $_POST['openid'];
	$content = $_POST['content'];

	// 1.判断openid是否已存在']'
	$sqlResult = $db->executeSqlTxt("SELECT `user_id` FROM user WHERE `wx_openid` = '" . $openid . "'");
	if($row = mysqli_fetch_row($sqlResult)){
		// 存在
		$user_id = $row[0];
		$file_name = $user_id."_".$timestamp.".".$extension;
		$receiverResult = receiveImg($file_name);	// 接收并保存到指定目录,返回接收结果
		include "../../imgCompress/imgCompress.php";
		$SERVER_ROOT = "../../..";
	    $web  = $SERVER_ROOT."/calligraphyPlat/img/calligraphy/web/";
	    $full = $SERVER_ROOT."/calligraphyPlat/img/calligraphy/full/";
		getThumb($full.$file_name,800,800,$file_name,$web);// 压缩图片到web,储存为同名文件

		// 写入数据库，操作完成
		$sqlTxt = "INSERT INTO calligraphy(`img_path`,`title`,`content`,`user_id`) VALUES ('".$file_name."','".$title."','".$content."',".$user_id.")";
		$db->executeSqlTxt($sqlTxt);
		$result = array('status' => 0,
						'message' => "发布成功",
						'img_receiver_result' => $receiverResult);
	}else{
		$result = array('status' => 501,
					'message' => "openid有误或者用户未绑定");
	}
}else{
	$result = array('error_code' => '500',
					  'error_msg' => '参数缺失'  );
}


// 接收图片
function receiveImg($file_name)
{
	// 接收文件
	if ($_FILES["file"]["error"] > 0)
	{
	    // echo "错误：: " . $_FILES["file"]["error"] . "<br>";
	    return $_FILES["file"]["error"];
	}
	else
	{
	    // echo "上传文件名: " . $_FILES["file"]["name"] . "<br>";
	    // echo "文件类型: " . $_FILES["file"]["type"] . "<br>";
	    // echo "文件大小: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
	    // echo "文件临时存储的位置: " . $_FILES["file"]["tmp_name"] . "<br>";
	    
	    // 判断当期目录下的 upload 目录是否存在该文件
	    // 如果没有 upload 目录，你需要创建它，upload 目录权限为 777
	    // $SERVER_ROOT = $_SERVER['DOCUMENT_ROOT'];
	    $SERVER_ROOT = "../../..";
	    $web  = $SERVER_ROOT."/calligraphyPlat/img/calligraphy/web/";
	    $full = $SERVER_ROOT."/calligraphyPlat/img/calligraphy/full/";

	    $target_file = $full . $file_name;
	    // if (file_exists($full . $_FILES["file"]["name"]))
	    if (file_exists($target_file))
	    {
	        // echo $_FILES["file"]["name"] . " 文件已经存在。 ";
	        return "文件已存在";
	    }
	    else
	    {
	        // 如果 upload 目录不存在该文件则将文件上传到 upload 目录下
	        move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
	        //echo "文件存储在: " . "upload/" . $_FILES["file"]["name"];
	        $result = array('status' => '000',
						'message' => "文件存储在: " . $target_file);
	        return "文件接收成功，存储在: " . $target_file;
	    }
	}
}


echo str_replace("\\/", "/",  json_encode($result,JSON_UNESCAPED_UNICODE));		// JSON_UNESCAPED_UNICODE php5.4+