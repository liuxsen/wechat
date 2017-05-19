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

