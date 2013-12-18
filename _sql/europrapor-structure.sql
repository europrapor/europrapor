-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 18, 2013 at 05:40 PM
-- Server version: 5.5.32
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `europrapor`
--
CREATE DATABASE IF NOT EXISTS `europrapor` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `europrapor`;

-- --------------------------------------------------------

--
-- Table structure for table `alpha_rows`
--

CREATE TABLE IF NOT EXISTS `alpha_rows` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `ip` varchar(250) NOT NULL,
  `time` datetime NOT NULL,
  `unixtime` bigint(19) NOT NULL,
  `rep1` varchar(250) NOT NULL,
  `rep2` int(20) NOT NULL,
  `rep3` int(20) NOT NULL,
  `rep4` int(20) NOT NULL,
  `rep5` int(20) NOT NULL,
  `divers` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=108 ;

-- --------------------------------------------------------

--
-- Table structure for table `beta_rows`
--

CREATE TABLE IF NOT EXISTS `beta_rows` (
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=73 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
