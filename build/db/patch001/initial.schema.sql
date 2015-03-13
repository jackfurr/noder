DROP TABLE IF EXISTS schema_version;
CREATE TABLE schema_version (
  patch_level int
) ENGINE=INNODB;

INSERT INTO schema_version(patch_level) values(0);

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL,
    `password_hash` varchar(40) NOT NULL COMMENT 'SHA1',
    PRIMARY KEY (`id`),
    UNIQUE KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
