SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


-- Database: `europrapor`
CREATE DATABASE IF NOT EXISTS `europrapor` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `europrapor`;

-- Table structure for table `checkins`
CREATE TABLE IF NOT EXISTS `checkins` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lt` decimal(8,5) NOT NULL,
  `lg` decimal(8,5) NOT NULL,
  `privacy` tinyint(4) NOT NULL,
  `joy` tinyint(4) NOT NULL,
  `fear` tinyint(4) NOT NULL,
  `determination` tinyint(4) NOT NULL,
  `anger` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=73 ;
