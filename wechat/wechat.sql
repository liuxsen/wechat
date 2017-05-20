--添加 图片素材分组

CREATE TABLE `wechat`.`img_group` (
  `id` INT(10) UNSIGNED NOT NULL DEFAULT 0,
  `group_name` VARCHAR(45) NOT NULL DEFAULT '未分组',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `group_name_UNIQUE` (`group_name` ASC))
COMMENT = '图片的分组';

--创建图片表
CREATE TABLE `wechat`.`img` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `imgName` VARCHAR(45) NULL,
  `groupId` INT(10) UNSIGNED NULL,
  PRIMARY KEY (`id`))
COMMENT = '图片素材';

ALTER TABLE `wechat`.`img`
ADD COLUMN `imgUrl` VARCHAR(45) NULL AFTER `imgName`;

ALTER TABLE `wechat`.`img`
CHANGE COLUMN `imgUrl` `imgUrl` VARCHAR(300) NULL DEFAULT NULL ;

-- 创建用户表
CREATE TABLE `wechat`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uname` VARCHAR(45) NULL,
  `uname2` VARCHAR(45) NULL COMMENT '用户备注名',
  `uavatar` VARCHAR(300) NULL COMMENT '用户头像地址',
  `blacklist` TINYINT NULL DEFAULT 0 COMMENT '是否加入黑名单',
  PRIMARY KEY (`id`))
COMMENT = '用户表';

-- 用户标签
CREATE TABLE `wechat`.`user_tag` (
  `tag_id` INT(100) NOT NULL AUTO_INCREMENT,
  `uid` INT(11) NOT NULL,
  `tag_name` VARCHAR(45) NULL DEFAULT '星标用户',
  PRIMARY KEY (`tag_id`))
COMMENT = '用户标签';

ALTER TABLE `wechat`.`img_group`
CHANGE COLUMN `id` `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
ADD COLUMN `imgid` VARCHAR(45) NULL COMMENT '本地表中；的图片id' AFTER `group_name`;
