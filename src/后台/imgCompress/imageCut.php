<?php


// // 原始图片的路径
// $source = 'bg3.jpg';
// $width = 100; // 裁剪后的宽度
// $height = 100;// 裁剪后的高度
// // 裁剪后的图片存放目录
// $target = 'bg3_cut.jpg';
// // 裁剪后保存到目标文件夹
// if (image_center_crop($source, $width, $height, $target)) {
//     echo "<img src='$target'>";
// }


/**
 * 居中裁剪图片
 * @param string $source [原图路径]
 * @param int $width [设置宽度]
 * @param int $height [设置高度]
 * @param string $target [目标路径]
 * @return bool [裁剪结果]
 */
function image_center_crop($source, $width, $height, $target)
{
    if (!file_exists($source)) return false;
    /* 根据类型载入图像 */
    switch (exif_imagetype($source)) {
        case IMAGETYPE_JPEG:
            $image = imagecreatefromjpeg($source);
            break;
        case IMAGETYPE_PNG:
            $image = imagecreatefrompng($source);
            break;
        case IMAGETYPE_GIF:
            $image = imagecreatefromgif($source);
            break;
    }
    if (!isset($image)) return false;
    /* 获取图像尺寸信息 */
    $target_w = $width;
    $target_h = $height;
    $source_w = imagesx($image);
    $source_h = imagesy($image);
    /* 计算裁剪宽度和高度 */
    $judge = (($source_w / $source_h) > ($target_w / $target_h));
    $resize_w = $judge ? ($source_w * $target_h) / $source_h : $target_w;
    $resize_h = !$judge ? ($source_h * $target_w) / $source_w : $target_h;
    $start_x = $judge ? ($resize_w - $target_w) / 2 : 0;
    $start_y = !$judge ? ($resize_h - $target_h) / 2 : 0;
    /* 绘制居中缩放图像 */
    $resize_img = imagecreatetruecolor($resize_w, $resize_h);
    imagecopyresampled($resize_img, $image, 0, 0, 0, 0, $resize_w, $resize_h, $source_w, $source_h);
    $target_img = imagecreatetruecolor($target_w, $target_h);
    imagecopy($target_img, $resize_img, 0, 0, $start_x, $start_y, $resize_w, $resize_h);
    /* 将图片保存至文件 */
    if (!file_exists(dirname($target))) mkdir(dirname($target), 0777, true);
    switch (exif_imagetype($source)) {
        case IMAGETYPE_JPEG:
            imagejpeg($target_img, $target);
            break;
        case IMAGETYPE_PNG:
            imagepng($target_img, $target);
            break;
        case IMAGETYPE_GIF:
            imagegif($target_img, $target);
            break;
    }
    return boolval(file_exists($target));
}