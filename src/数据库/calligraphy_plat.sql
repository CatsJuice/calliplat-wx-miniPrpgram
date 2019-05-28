/*
 Navicat Premium Data Transfer

 Source Server         : ubuntu_server
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : calligraphy_plat

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 21/12/2018 10:38:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for calligraphy
-- ----------------------------
DROP TABLE IF EXISTS `calligraphy`;
CREATE TABLE `calligraphy`  (
  `calligraphy_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '作品id，自增长',
  `img_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '图片路径',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '作品名称',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '作品介绍',
  `tags` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '作品标签',
  `user_id` int(11) DEFAULT NULL COMMENT '外键，上传者id',
  `view` int(255) DEFAULT 0 COMMENT '浏览数',
  `good` int(255) DEFAULT 0 COMMENT '点赞数',
  `good_lists` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '点赞列表',
  PRIMARY KEY (`calligraphy_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 86 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of calligraphy
-- ----------------------------
INSERT INTO `calligraphy` VALUES (1, 'graphy-(1).jpg', '念奴娇赤壁怀古', '楷书成品，通过iPad+Apple Pencil，Zenbursh2 创作，后期软件：PhotoShop', '_1_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (2, 'graphy-(2).jpg', '花体随笔', '英文花体成品，通过iPad+Apple Pencil，Procreate 创作，无后期', '_9_11_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (3, 'graphy-(3).jpg', '兰亭集序（全文）', '兰亭序全文成品，工具为ipad，前景由zen brush 2 书写，背景通过 procreate 绘制，后期 Photoshop', '_2_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (4, 'graphy-(4).jpg', '志存高远', '“志存高远”，zen brush2生成', '_2_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (5, 'graphy-(5).jpg', '水调歌头', '随笔，通过Zen brush 2制作，后期剪切图片', '_3_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (6, 'graphy-(6).jpg', '水调歌头', '随笔 通过zen brush 2制作', '_3_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (7, 'graphy-(7).jpg', '花体随笔', '英文花体作品，通过iPad+Apple Pencil + Procreate制作', '_9_11_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (8, 'graphy-(8).jpg', '水调歌头', '随笔，行书，由zen brush 2制作', '_3_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (9, 'graphy-(9).jpg', 'Hello World', '英文花体，Apple Pencil + Procreate', '_11_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (10, 'graphy-(10).jpg', '念奴娇赤壁怀古', 'Apple Pencil+Zen Brush 2；楷书', '_1_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (11, 'graphy-(11).jpg', '花体', 'Apple Pencil+Procreate；', '_11_9_', 4, 1, 0, '_');
INSERT INTO `calligraphy` VALUES (12, 'graphy-(12).jpg', '天道酬勤', 'Apple Pencil+Zen Brush 2；', '_2_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (13, 'graphy-(13).jpg', '英文摘录', 'Apple Pencil+Procreate', '_11_9_', 4, 2, 1, '_4_');
INSERT INTO `calligraphy` VALUES (14, 'graphy-(14).jpg', '宁静致远', 'Apple Pencil+Zen Brush 2；', '_2_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (15, 'graphy-(15).jpg', '文艺青年', 'Apple Pencil+Zen Brush 2；', '_3_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (16, 'graphy-(16).jpg', '花体', 'Apple Pencil+Procreate;', '_11_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (17, 'graphy-(17).jpg', '陋室铭', '楷书，录刘禹锡《陋室铭》，Made By ZenBrush2', '_1_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (18, 'graphy-(18).jpg', '舍得', '随笔，BY ZenBrush2', '_2_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (19, 'graphy-(19).jpg', '兰亭序(部分)', '录《兰亭集序》，ZenBrush2', '_2_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (20, 'graphy-(20).jpg', 'Happy New Term', '英文随笔，Apple Pencil+ Procreate', '_11_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (21, 'graphy-(21).jpg', 'I LOVE YOU', '英文随笔，Apple Pencil+ Procreate', '_11_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (22, 'graphy-(22).jpg', '沁园春雪', '毕加索宝珠笔写作', '_2_7_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (23, 'graphy-(23).jpg', '将进酒', 'ZenBrush2写作With Apple Pencil', '_1_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (24, 'graphy-(24).jpg', '福', 'zenBrush2写作，后期Photoshop', '_2_9_', 4, 1, 0, '_');
INSERT INTO `calligraphy` VALUES (25, 'graphy-(25).jpg', '水调歌头', '毕加索弯尖签字笔写作', '_2_7_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (26, 'graphy-(26).jpg', '善', 'ZenBrush2随笔', '_2_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (27, 'graphy-(27).jpg', '随笔', 'ZenBrush2写作，随笔', '_3_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (28, 'graphy-(28).jpg', '念奴娇赤壁怀古', '毕加索宝珠笔写作', '_2_7_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (29, 'graphy-(29).jpg', '南乡子 冬夜', 'ZenBrush2随笔制作', '_1_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (30, 'graphy-(30).jpg', '渔家傲', 'ZenBrush2随笔', '_1_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (31, 'graphy-(31).jpg', '厚德载物', '创作自ZenBrush2，2018年9月3日', '_2_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (32, 'graphy-(32).jpg', '英文随笔摘录', '创作自iPad+Procreate；2018年9月3日', '_11_9_', 4, 1, 1, '_4_');
INSERT INTO `calligraphy` VALUES (33, 'graphy-(33).jpg', '钢笔随笔', '毕加索弯尖签字笔随笔；2018年9月3日', '_2_7_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (34, 'graphy-(34).jpg', '吉祥如意', 'ZenBrush2制作；2018年9月3日', '_2_9_', 4, 1, 1, '_4_');
INSERT INTO `calligraphy` VALUES (35, 'graphy-(35).jpg', '生查子-富阳道中', '钢笔(毕加索弯尖签字笔)制作；2018年9月3日', '_7_2_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (36, 'graphy-(36).jpg', '钢笔随笔', '毕加索弯尖签字笔随笔；2018年9月3日', '_7_2_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (37, 'graphy-(37).jpg', '随笔', 'ZenBrush2随笔；2018年9月3日', '_3_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (38, 'graphy-(38).jpg', '钢笔随笔', '毕加索弯尖签字笔随笔；2018年9月3日', '_7_3_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (39, 'graphy-(39).jpg', '随笔，世说新语', '毕加索弯尖签字笔，2018年9月4日', '_2_7_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (40, 'graphy-(40).jpg', '世说新语随笔', '毕加索弯尖签字笔，2018年9月4日', '_2_7_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (41, 'graphy-(41).jpg', '虞美人', '录李煜词虞美人-春花秋月何时了一首，毕加索弯尖签字笔，2018年9月4日于青山湖作', '_3_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (42, 'graphy-(42).jpg', '前赤壁赋', '录苏轼前赤壁赋一篇，毕加索弯尖签字笔，2018年9月4日于青山湖作', '_2_7_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (43, 'graphy-(43).jpg', '英文随笔', '摘自Solaris，2018年9月4日', '_11_9_', 4, 3, 1, '_4_');
INSERT INTO `calligraphy` VALUES (44, 'graphy-(44).jpg', '七律长征', '录毛主席七律长征，通过ZenBrush2，2018年9月5日', '_3_9_', 4, 1, 0, '_');
INSERT INTO `calligraphy` VALUES (45, 'graphy-(45).jpg', '满江红', '录满江红，zenBrush2制作，2018年9月6日', '_3_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (46, 'graphy-(46).jpg', '爱莲说', '录爱莲说，zenBrush2制作，2018年9月6日', '_3_9_', 4, 1, 0, '_');
INSERT INTO `calligraphy` VALUES (47, 'graphy-(47).jpg', '满江红', '录宋张元干 满江红·自豫章阻风吴城山作。ZenBrush2制作，2018年9月7日', '_3_9_', 4, 4, 1, '_4_');
INSERT INTO `calligraphy` VALUES (48, 'graphy-(48).jpg', '虞美人', '录虞美人-春花秋月何时了，ZenBrush2制作，2018年9月7日', '_3_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (49, 'graphy-(49).jpg', '沁园春 长沙', '敬录毛主席沁园春长沙一篇，毕加索弯尖美工笔，2018年9月7日', '_7_2_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (50, 'graphy-(50).jpg', 'Lyric Of Someone Like You', '花体随笔，“Never Mind I Will Find Someone Like You”，2018年9月7日', '_11_9_', 4, 1, 0, '_');
INSERT INTO `calligraphy` VALUES (51, 'graphy-(51).jpg', '沁园春 长沙', '敬录毛主席沁园春长沙一篇，ZenBrush2制作，2018年9月7日', '_3_9_', 4, 9, 1, '_4_');
INSERT INTO `calligraphy` VALUES (52, 'graphy-(52).jpg', '赠瑕丘王少府', '录李白赠瑕丘王少府，工具：zenbrush2,2018年9月9日', '_3_9_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (53, 'graphy-(53).jpg', '湖心亭看雪', '录明张岱湖心亭看雪，毕加索弯尖美工笔，2018年9月12日', '_2_7_', 4, 0, 0, '_');
INSERT INTO `calligraphy` VALUES (54, 'graphy-(54).jpg', '水调歌头', '楷书-毕加索弯尖美工笔，10mm，2018年9月12日', '_1_2_7_', 4, 1, 0, '_');
INSERT INTO `calligraphy` VALUES (55, 'graphy-(55).jpg', '水调歌头', '行草-毕加索弯尖美工笔（10mm），2018年9月12日', '_2_7_', 4, 3, 1, '_4_');
INSERT INTO `calligraphy` VALUES (56, 'graphy-(56).jpg', '随笔', 'ZenBrush2创作，2018年9月中旬', '_3_9_', 4, 2, 1, '_4_');
INSERT INTO `calligraphy` VALUES (57, 'graphy-(57).jpg', '随笔', 'ZenBrush2创作，2018年9月中旬', '_3_9_', 4, 7, 1, '_4_');
INSERT INTO `calligraphy` VALUES (58, 'graphy-(58).jpg', '游蕲水清泉寺（楷）', 'ZenBrush2创作，2018年9月中旬', '_1_9_', 4, 7, 1, '_4_');
INSERT INTO `calligraphy` VALUES (59, 'graphy-(59).jpg', '岳阳楼记（行书）', 'ZenBrush2创作，2018年9月22日', '_1_9_', 4, 27, 1, '_4_');
INSERT INTO `calligraphy` VALUES (82, '4_1544678032.jpg', '33', '333', NULL, 4, 16, 0, '_');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '评论内容',
  `calligraphy_id` int(11) DEFAULT NULL COMMENT '外键，被评论作品的id',
  `user_id` int(11) DEFAULT NULL COMMENT '外键，评论者的id',
  `date` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `time` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 32 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, 'this is a test comment of 1', 58, 1, '2018-11-29 ', '13:11:19');
INSERT INTO `comment` VALUES (2, 'this is a test comment of 1', 58, 2, '2018-11-29', '13:11:24');
INSERT INTO `comment` VALUES (3, 'this is a test comment of 1', 58, 3, '2018-11-29 ', '13:11:26');
INSERT INTO `comment` VALUES (4, 'this is a test comment of 1', 58, 4, '2018-11-29 ', '13:11:28');
INSERT INTO `comment` VALUES (5, 'this is a test comment of 1', 58, 5, '2018-11-29 ', '13:11:32');
INSERT INTO `comment` VALUES (6, 'test', 58, 4, '2018-12-08', '19:27:36');
INSERT INTO `comment` VALUES (7, '测试！！', 58, 4, '2018-12-08', '19:30:45');
INSERT INTO `comment` VALUES (8, '添加第一条评论！', 59, 4, '2018-12-08', '19:36:51');
INSERT INTO `comment` VALUES (9, '添加评论试试！', 46, 4, '2018-12-08', '19:39:00');
INSERT INTO `comment` VALUES (10, 'zz', 55, 7, '2018-12-08', '20:02:21');
INSERT INTO `comment` VALUES (11, '( • ̀ω•́ )✧', 57, 4, '2018-12-08', '20:26:49');
INSERT INTO `comment` VALUES (12, '测试评论', 56, 4, '2018-12-08', '20:31:10');
INSERT INTO `comment` VALUES (13, 'aaa', 50, 4, '2018-12-08', '20:33:21');
INSERT INTO `comment` VALUES (18, 'ss', 59, 4, '2018-12-11', '00:33:22');
INSERT INTO `comment` VALUES (29, 'q', 55, 4, '2018-12-11', '18:01:25');
INSERT INTO `comment` VALUES (30, '这是一条很长，很长的评论，来测试一下字数较多的时候，前端样式是否会受到影响，', 51, 4, '2018-12-13', '02:19:20');
INSERT INTO `comment` VALUES (31, '这是一条很长，很长的评论，来测试一下字数较多的时候，前端样式是否会受到影响这是一条很长，很长的评论，来测试一下字数较多的时候，前端样式是否会受到影响这是一条很长，很长的评论，来测试一下字数较多的时候，前端样式是否会受到影响这是一条很长，很长的评论，来测试一下字数较多的时候，前端样', 51, 4, '2018-12-13', '02:19:56');

-- ----------------------------
-- Table structure for message_log
-- ----------------------------
DROP TABLE IF EXISTS `message_log`;
CREATE TABLE `message_log`  (
  `msg_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `date` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `time` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`msg_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message_log
-- ----------------------------
INSERT INTO `message_log` VALUES (27, 'saa', 'asas', 4, '2018-12-16', '18:24:53');
INSERT INTO `message_log` VALUES (28, 'test send msg', '系统公告 ● 公众号注册数量调整  ● 附近的小程序升级  查看更多 \n帐号分类\n服务号\n给企业和组织提供更强大的业务服务与用户管理能力，帮助企业快速实现全新的公众号服务平台。\n \n订阅号\n为媒体和个人提供一种新的信息传播方式，构建与读者之间更好的沟通与管理模式。\n \n小程序\n一种新的开放能力，可以在微信内被便捷地获取和传播，同时具有出色的使用体验。\n企业微信 原企业号\n企业的专业办公管理工具。与微信一致的沟通体验，提供丰富免费的办公应用，并与微信消息、小程序、微信支付等互通，助力企业高效办公和管理。', 4, '2018-12-16', '18:29:15');
INSERT INTO `message_log` VALUES (29, 'qq', 'qq', 4, '2018-12-20', '14:31:47');

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '标签名',
  `bg_color` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '标签背景颜色',
  PRIMARY KEY (`tag_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 13 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (1, '楷书', '#feca57');
INSERT INTO `tag` VALUES (2, '行书', '#5f27cd');
INSERT INTO `tag` VALUES (3, '草书', '#1dd1a1');
INSERT INTO `tag` VALUES (4, '小篆', '#2e86de');
INSERT INTO `tag` VALUES (5, '大篆', '#222f3e');
INSERT INTO `tag` VALUES (6, '行楷', '#8395a7');
INSERT INTO `tag` VALUES (7, '硬笔', '#f368e0');
INSERT INTO `tag` VALUES (8, '软笔', '#ff9f43');
INSERT INTO `tag` VALUES (9, '电子作品', '#ee5253');
INSERT INTO `tag` VALUES (10, '隶书', '#341f97');
INSERT INTO `tag` VALUES (11, '英文书法', '#20bf6b');
INSERT INTO `tag` VALUES (12, '其他', '#535c68');

-- ----------------------------
-- Table structure for temp_ck_code
-- ----------------------------
DROP TABLE IF EXISTS `temp_ck_code`;
CREATE TABLE `temp_ck_code`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `code_value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `create_time` datetime(0) DEFAULT NULL,
  `regist_username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of temp_ck_code
-- ----------------------------
INSERT INTO `temp_ck_code` VALUES (1, '430218', '2018-12-08 00:18:15', 'jjjj');
INSERT INTO `temp_ck_code` VALUES (2, '547164', '2018-12-08 00:20:09', 'jjj');
INSERT INTO `temp_ck_code` VALUES (3, '743679', '2018-12-08 00:21:28', 'qqq');
INSERT INTO `temp_ck_code` VALUES (4, '260126', '2018-12-08 00:52:59', '中二电工');
INSERT INTO `temp_ck_code` VALUES (5, '570125', '2018-12-08 01:01:52', 'kkk');
INSERT INTO `temp_ck_code` VALUES (6, '172850', '2018-12-08 01:06:49', 'csdacfds');
INSERT INTO `temp_ck_code` VALUES (7, '598094', '2018-12-08 01:09:45', 'jjjjjj');
INSERT INTO `temp_ck_code` VALUES (8, '311240', '2018-12-08 19:59:49', 'mdzz');
INSERT INTO `temp_ck_code` VALUES (9, '245211', '2018-12-08 20:04:39', 'zzzz');
INSERT INTO `temp_ck_code` VALUES (10, '627009', '2018-12-08 20:21:37', 'aaaaaa');
INSERT INTO `temp_ck_code` VALUES (11, '963567', '2018-12-08 20:23:56', 'qqqqqq');
INSERT INTO `temp_ck_code` VALUES (12, '366983', '2018-12-11 15:22:32', '李思');
INSERT INTO `temp_ck_code` VALUES (13, '916470', '2018-12-13 11:18:29', 'zz');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户名，用于登录注册',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户密码',
  `head_path` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL COMMENT '头像路径',
  `email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL COMMENT '用户邮箱',
  `user_status` int(1) DEFAULT NULL COMMENT '0：绑定的用户；1：认证的用户',
  `school_number` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL COMMENT '学号，用于认证',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '电话号码',
  `wx_openid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '微信小程序用户的openid',
  `temp_ck_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '零时验证码',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 13 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'demoUser', '123456', '../../img/head/demoUser.png', 'demoemail@xxx.com', NULL, NULL, NULL, '', '709805');
INSERT INTO `user` VALUES (2, '111', '111', '../../img/head/demoHead.png', NULL, NULL, NULL, NULL, '', '709805');
INSERT INTO `user` VALUES (3, '222', '222', '../../img/head/demoHead.png', NULL, NULL, NULL, NULL, '', '709805');
INSERT INTO `user` VALUES (4, 'catsjuice', '000000', '../../img/head/4.jpg', '1298554944@qq.com', 0, NULL, NULL, 'oaNMJ4-U4fD9StNKOxFpgzueZmpk', '709805');
INSERT INTO `user` VALUES (5, 'testuser', '000000', '../../img/head/demoHead.png', '1298554944@qq.com', 0, NULL, NULL, '', '709805');
INSERT INTO `user` VALUES (6, 'jjjjjj', 'jjjjjj', '../../img/head/demoHead.png', '1298554944@qq.com', NULL, NULL, NULL, NULL, '709805');
INSERT INTO `user` VALUES (8, 'zzzz', 'zzzzzz', '../../img/head/demoHead.png', '1298554944@qq.com', NULL, NULL, NULL, NULL, '709805');
INSERT INTO `user` VALUES (7, 'mdzz', '123456', '../../img/head/demoHead.png', '349856009@qq.com', NULL, NULL, NULL, 'oaNMJ46dRULjNgXKp8UC46faJsXs', '709805');
INSERT INTO `user` VALUES (9, 'aaaaaa', 'aaaaaa', '../../img/head/demoHead.png', '1298554944@qq.com', NULL, NULL, NULL, NULL, '709805');
INSERT INTO `user` VALUES (10, 'qqqqqq', 'qqqqqq', '../../img/head/demoHead.png', '1298554944@qq.com', NULL, NULL, NULL, NULL, '709805');
INSERT INTO `user` VALUES (11, '李思', 'woailiso14', '../../img/head/demoHead.png', '1078937703@qq.com', NULL, NULL, NULL, NULL, '709805');
INSERT INTO `user` VALUES (12, 'zz', 'zzzzzz', '../../img/head/demoHead.png', '1298554944@qq.com', NULL, NULL, NULL, NULL, '709805');

SET FOREIGN_KEY_CHECKS = 1;
