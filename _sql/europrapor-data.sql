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

--
-- Dumping data for table `alpha_rows`
--

INSERT INTO `alpha_rows` (`id`, `ip`, `time`, `unixtime`, `rep1`, `rep2`, `rep3`, `rep4`, `rep5`, `divers`) VALUES
(1, 'toto', '2013-12-14 00:00:00', 1387058002, 'lat=59.914845400000004&lon=10.7268904', 25, 25, 25, 25, 25),
(2, '86.62.180.78', '2013-12-14 00:00:00', 1387058464, 'lat=59.914845400000004&lon=10.7268904', 25, 25, 25, 25, 25),
(3, '86.62.180.78', '2013-12-14 00:00:00', 1387058668, 'lat=59.914845400000004&lon=10.7268904', 25, 25, 25, 25, 25),
(4, '86.62.180.78', '2013-12-14 00:00:00', 1387058720, 'lat=59.914861599999995&lon=10.726842200000002', 94, 96, 95, 95, 25),
(5, '86.62.180.78', '2013-12-14 00:00:00', 1387058783, 'lat=59.914857700000006&lon=10.726839199999999', 95, 93, 93, 94, 95),
(6, '86.62.180.78', '2013-12-14 00:00:00', 1387058982, 'lat=59.91484469999999&lon=10.7269314', 93, 82, 74, 74, 93),
(7, '86.62.180.78', '2013-12-14 00:00:00', 1387059326, '', 6, 51, 39, 36, 50),
(8, '86.62.180.78', '2013-12-14 00:00:00', 1387059357, '', 25, 25, 25, 79, 100),
(9, '2.150.17.84', '2013-12-14 04:25:41', 1387059941, 'lat=59.91737366131777&lon=10.7258890518524', 100, 95, 100, 77, 54),
(10, '91.209.51.215', '2013-12-14 05:00:25', 1387062025, '', 25, 25, 25, 25, 25),
(11, '2.150.17.84', '2013-12-15 04:18:06', 1387102686, 'lat=59.917340091238636&lon=10.725889764521693', 25, 25, 25, 25, 25),
(12, '86.62.180.78', '2013-12-15 05:31:25', 1387107085, 'lat=59.9148721&lon=10.7268592', 9, 100, 25, 25, 25),
(13, '86.62.180.78', '2013-12-15 05:34:24', 1387107264, 'lat=59.9148721&lon=10.7268592', 5, 90, 25, 100, 25),
(14, '93.72.157.125', '2013-12-15 06:13:38', 1387109618, '', 15, 25, 25, 25, 25),
(15, '93.72.157.125', '2013-12-15 06:14:04', 1387109644, 'lat=50.3940608&lon=30.4927317', 25, 25, 25, 25, 25),
(16, '188.115.133.240', '2013-12-15 06:36:52', 1387111012, 'lat=46.4092949&lon=30.7107766', 25, 25, 25, 25, 25),
(17, '86.62.180.78', '2013-12-15 06:43:58', 1387111438, 'lat=59.91386899999999&lon=10.752245', 25, 100, 25, 25, 25),
(18, '94.230.196.203', '2013-12-15 06:44:34', 1387111474, '', 25, 25, 25, 25, 25),
(19, '93.72.43.119', '2013-12-15 06:46:46', 1387111606, 'lat=50.3929407&lon=30.645660599999996', 25, 25, 25, 25, 25),
(20, '86.62.180.78', '2013-12-15 06:47:03', 1387111623, '', 25, 25, 25, 25, 25),
(21, '90.245.22.68', '2013-12-15 06:50:22', 1387111822, '', 25, 25, 25, 25, 25),
(22, '77.122.92.23', '2013-12-15 06:54:18', 1387112058, '', 30, 37, 68, 22, 25),
(23, '95.134.2.233', '2013-12-15 06:54:38', 1387112078, '', 59, 22, 79, 39, 68),
(24, '188.230.102.189', '2013-12-15 06:59:53', 1387112393, 'lat=49.422982999999995&lon=26.987133', 25, 25, 25, 25, 25),
(25, '93.72.69.253', '2013-12-15 07:00:32', 1387112432, '', 25, 25, 25, 25, 25),
(26, '188.231.181.183', '2013-12-15 07:07:28', 1387112848, 'lat=50.393533399999995&lon=30.633934', 5, 3, 9, 20, 25),
(27, '89.105.239.53', '2013-12-15 07:16:37', 1387113397, '', 25, 25, 25, 25, 25),
(28, '91.245.79.111', '2013-12-15 07:25:54', 1387113954, '', 25, 25, 25, 25, 25),
(29, '91.202.242.164', '2013-12-15 07:26:01', 1387113961, 'lat=49.839683&lon=24.029716999999998', 26, 25, 25, 25, 25),
(30, '82.193.115.229', '2013-12-15 07:33:40', 1387114420, '', 33, 25, 25, 55, 22),
(31, '5.248.53.117', '2013-12-15 07:48:20', 1387115300, 'lat=47.55854&lon=33.648734999999995', 25, 25, 25, 25, 25),
(32, '91.218.105.133', '2013-12-15 08:22:12', 1387117332, 'lat=49.839683&lon=24.029716999999998', 25, 25, 25, 25, 25),
(33, '176.36.52.81', '2013-12-15 08:28:22', 1387117702, '', 25, 25, 25, 25, 25),
(34, '178.150.14.190', '2013-12-15 08:35:12', 1387118112, '', 35, 60, 10, 40, 35),
(35, '92.249.67.148', '2013-12-15 08:45:48', 1387118748, '', 25, 25, 25, 25, 25),
(36, '91.218.106.22', '2013-12-15 09:04:14', 1387119854, '', 25, 25, 25, 25, 25),
(37, '188.0.158.233', '2013-12-15 09:12:41', 1387120361, 'lat=50.4412771&lon=30.5035748', 25, 27, 25, 25, 25),
(38, '91.218.106.22', '2013-12-15 09:12:56', 1387120376, 'lat=49.8341292&lon=24.00979', 25, 25, 25, 25, 25),
(39, '86.62.180.78', '2013-12-15 09:13:15', 1387120395, 'lat=59.91386899999999&lon=10.752245', 25, 25, 25, 99, 25),
(40, '178.137.16.219', '2013-12-15 09:21:25', 1387120885, '', 25, 25, 25, 25, 25),
(41, '195.160.205.59', '2013-12-15 09:30:21', 1387121421, '', 46, 20, 0, 39, 58),
(42, '178.137.6.151', '2013-12-15 09:53:53', 1387122833, '', 48, 25, 37, 39, 72),
(43, '178.137.6.151', '2013-12-15 09:54:17', 1387122857, '', 48, 25, 37, 39, 72),
(44, '86.62.180.78', '2013-12-15 10:13:56', 1387124036, 'lat=59.91386899999999&lon=10.752245', 91, 25, 25, 25, 25),
(45, '176.120.52.160', '2013-12-15 10:48:02', 1387126082, '', 25, 25, 25, 25, 25),
(46, '91.218.106.22', '2013-12-15 11:58:53', 1387130333, 'lat=49.834120299999995&lon=24.0098369', 25, 25, 25, 25, 25),
(47, '91.218.106.22', '2013-12-15 11:59:29', 1387130369, 'lat=49.834120299999995&lon=24.0098369', 8, 39, 25, 25, 25),
(48, '194.105.144.175', '2013-12-15 12:06:15', 1387130775, 'lat=50.4501&lon=30.5234', 1, 71, 1, 70, 0),
(49, '194.105.144.175', '2013-12-15 12:22:43', 1387131763, 'lat=50.4501&lon=30.5234', 25, 25, 25, 25, 25),
(50, '193.106.82.49', '2013-12-15 12:54:12', 1387133652, 'lat=50.440914&lon=30.284912499999997', 25, 25, 25, 25, 25),
(51, '85.238.104.56', '2013-12-15 12:55:10', 1387133710, '', 25, 25, 25, 25, 25),
(52, '194.105.144.175', '2013-12-15 01:03:19', 1387134199, 'lat=50.4501&lon=30.5234', 25, 25, 25, 25, 25),
(53, '109.197.220.52', '2013-12-15 01:22:34', 1387135354, '', 25, 25, 25, 25, 25),
(54, '2.81.196.48', '2013-12-15 01:46:26', 1387136786, 'lat=40.2020262&lon=-8.396109299999999', 25, 25, 25, 25, 25),
(55, '93.73.215.130', '2013-12-15 02:17:10', 1387138630, '', 25, 25, 25, 25, 25),
(56, '195.5.49.64', '2013-12-15 03:02:53', 1387141373, '', 14, 25, 25, 25, 25),
(57, '92.225.116.77', '2013-12-15 03:04:02', 1387141442, 'lat=52.525330399999994&lon=13.418449899999999', 23, 25, 25, 25, 25),
(58, '95.132.208.74', '2013-12-15 03:08:10', 1387141690, '', 25, 25, 25, 25, 25),
(59, '46.33.59.81', '2013-12-15 03:10:49', 1387141849, 'lat=46.4169431&lon=30.715504', 80, 70, 10, 1, 25),
(60, '109.86.37.219', '2013-12-15 03:26:03', 1387142763, '', 25, 25, 25, 25, 25),
(61, '109.237.84.182', '2013-12-15 04:04:50', 1387145090, '', 25, 25, 25, 25, 25),
(62, '2.150.17.84', '2013-12-15 04:19:52', 1387145992, 'lat=59.9149154&lon=10.7267723', 25, 25, 25, 25, 25),
(63, '2.150.17.84', '2013-12-15 04:20:28', 1387146028, 'lat=59.9149154&lon=10.7267678', 25, 25, 25, 25, 25),
(64, '2.150.17.84', '2013-12-15 04:21:02', 1387146062, 'lat=59.9149154&lon=10.7267678', 25, 25, 25, 25, 25),
(65, '2.150.17.84', '2013-12-15 04:26:28', 1387146388, 'lat=59.9148993&lon=10.7267836', 25, 25, 25, 25, 25),
(66, '84.202.74.205', '2013-12-15 04:40:46', 1387147246, '', 62, 25, 25, 25, 25),
(67, '80.2.76.104', '2013-12-15 05:26:07', 1387149967, '', 25, 25, 25, 25, 25),
(68, '195.177.117.106', '2013-12-15 06:19:49', 1387153189, '', 30, 25, 25, 25, 25),
(69, '37.115.195.237', '2013-12-15 06:20:54', 1387153254, '', 25, 25, 25, 25, 25),
(70, '134.249.174.196', '2013-12-15 07:29:59', 1387157399, 'lat=50.413642499999995&lon=30.534775600000003', 46, 0, 0, 1, 1),
(71, '77.47.180.59', '2013-12-15 08:52:24', 1387162344, '', 25, 25, 25, 25, 25),
(72, '109.227.124.177', '2013-12-16 12:14:58', 1387174498, '', 25, 25, 25, 25, 25),
(73, '80.92.237.174', '2013-12-16 01:55:36', 1387180536, '', 26, 25, 25, 25, 25),
(74, '134.47.109.182', '2013-12-16 02:40:53', 1387183253, 'lat=59.91386899999999&lon=10.752245', 25, 25, 25, 25, 25),
(75, '149.6.190.58', '2013-12-16 03:30:54', 1387186254, '', 23, 24, 25, 25, 25),
(76, '82.144.198.67', '2013-12-16 03:51:30', 1387187490, '', 25, 25, 25, 25, 25),
(77, '91.193.167.2', '2013-12-16 04:07:40', 1387188460, '', 25, 25, 25, 25, 25),
(78, '91.228.236.215', '2013-12-16 04:21:34', 1387189294, '', 25, 25, 25, 25, 25),
(79, '46.118.115.176', '2013-12-16 04:34:14', 1387190054, '', 25, 25, 25, 25, 25),
(80, '86.62.180.78', '2013-12-16 04:47:25', 1387190845, 'lat=59.9148379&lon=10.7269959', 3, 64, 25, 62, 68),
(81, '213.169.78.251', '2013-12-16 05:21:11', 1387192871, 'lat=50.450807999999995&lon=30.4736586', 25, 25, 25, 25, 25),
(82, '134.47.109.182', '2013-12-16 05:22:52', 1387192972, '', 69, 85, 100, 100, 98),
(83, '81.25.53.79', '2013-12-16 06:19:44', 1387196384, '', 26, 24, 25, 25, 25),
(84, '134.47.109.182', '2013-12-16 06:34:00', 1387197240, 'lat=59.91386899999999&lon=10.752245', 25, 25, 25, 25, 25),
(85, '134.47.109.182', '2013-12-16 07:20:02', 1387200002, 'lat=59.9001228&lon=10.6307999', -1, 3, 4, 2, 2),
(86, '134.47.109.182', '2013-12-16 07:34:48', 1387200888, 'lat=59.900&lon=10.631', -1, 3, 4, 4, 3),
(87, '2.150.33.97', '2013-12-16 07:47:20', 1387201640, '', -1, 5, 3, 3, 5),
(88, '134.47.109.182', '2013-12-16 07:48:47', 1387201727, 'lat=59.900&lon=10.631', -1, 2, 2, 2, 2),
(89, '93.183.237.210', '2013-12-16 08:08:44', 1387202924, '', -1, 2, 2, 2, 2),
(90, '93.183.237.210', '2013-12-16 08:09:00', 1387202940, 'lat=49.840&lon=24.030', -1, 2, 0, 2, 4),
(91, '93.183.237.210', '2013-12-16 08:56:57', 1387205817, 'lat=49.803&lon=24.002', -1, 3, 0, 3, 3),
(92, '93.80.245.64', '2013-12-16 08:59:10', 1387205950, 'lat=55.786&lon=37.688', -1, 3, 2, 2, 2),
(93, '86.62.180.78', '2013-12-16 08:59:31', 1387205971, 'lat=59.915&lon=10.727', -1, 3, 2, 2, 2),
(94, '134.47.109.182', '2013-12-16 09:02:19', 1387206139, 'lat=59.900&lon=10.631', -1, 4, 2, 2, 2),
(95, '86.62.180.78', '2013-12-16 09:04:23', 1387206263, 'lat=59.915&lon=10.727', -1, 5, 0, 5, 2),
(96, '93.183.237.210', '2013-12-16 09:11:46', 1387206706, 'lat=49.803&lon=24.002', -1, 4, 4, 5, 4),
(97, '86.62.180.78', '2013-12-16 09:12:59', 1387206779, '', -1, 2, 2, 2, 5),
(98, '134.47.109.182', '2013-12-16 09:31:35', 1387207895, 'lat=59.900&lon=10.631', -1, 2, 0, 1, 0),
(99, '194.105.144.175', '2013-12-16 06:59:27', 1387220367, 'lat=50.450&lon=30.523', -1, 1, 2, 2, 3),
(100, '86.62.180.78', '2013-12-17 04:31:32', 1387297892, '', -1, 5, 3, 2, 4),
(101, '195.234.75.155', '2013-12-17 04:31:39', 1387297899, '', -1, 5, 4, 1, 4),
(102, '86.62.180.78', '2013-12-17 04:32:01', 1387297921, 'lat=59.915&lon=10.727', -1, 1, 1, 1, 1),
(103, '', '2013-12-17 07:55:46', 1387310146, 'lon=67.987986&lat=35.45645', 10, 2, 0, 3, 1),
(104, '', '2013-12-17 07:57:33', 1387310253, 'lat=35.45645&lon=67.987986', 10, 2, 0, 3, 1),
(105, '', '2013-12-17 07:58:41', 1387310321, 'lat=35.45645&lon=67.987986', 10, 2, 0, 3, 1),
(106, '', '2013-12-17 08:02:28', 1387310548, 'lat=35.45645&lon=67.987986', 10, 2, 0, 3, 1),
(107, '86.62.180.78', '2013-12-18 05:15:26', 1387386926, 'lat=59.915&lon=10.727', -1, 3, 2, 2, 1);

--
-- Dumping data for table `beta_rows`
--

INSERT INTO `beta_rows` (`id`, `time`, `lt`, `lg`, `privacy`, `joy`, `fear`, `determination`, `anger`) VALUES
(9, '2013-12-18 14:58:25', '35.45645', '67.98799', 5, 2, 0, 3, 1),
(10, '2013-12-18 15:11:20', '59.91485', '10.72689', 5, 25, 25, 25, 25),
(11, '2013-12-18 15:11:20', '59.91485', '10.72689', 5, 25, 25, 25, 25),
(12, '2013-12-18 15:11:20', '59.91485', '10.72689', 5, 25, 25, 25, 25),
(13, '2013-12-18 15:11:20', '59.91486', '10.72684', 5, 96, 95, 95, 25),
(14, '2013-12-18 15:11:20', '59.91486', '10.72684', 5, 93, 93, 94, 95),
(15, '2013-12-18 15:11:20', '59.91484', '10.72693', 5, 82, 74, 74, 93),
(16, '2013-12-18 15:11:20', '59.91737', '10.72589', 5, 95, 100, 77, 54),
(17, '2013-12-18 15:11:20', '59.91734', '10.72589', 5, 25, 25, 25, 25),
(18, '2013-12-18 15:11:20', '59.91487', '10.72686', 5, 100, 25, 25, 25),
(19, '2013-12-18 15:11:20', '59.91487', '10.72686', 5, 90, 25, 100, 25),
(20, '2013-12-18 15:11:20', '50.39406', '30.49273', 5, 25, 25, 25, 25),
(21, '2013-12-18 15:11:20', '46.40929', '30.71078', 5, 25, 25, 25, 25),
(22, '2013-12-18 15:11:20', '59.91387', '10.75225', 5, 100, 25, 25, 25),
(23, '2013-12-18 15:11:20', '50.39294', '30.64566', 5, 25, 25, 25, 25),
(24, '2013-12-18 15:11:20', '49.42298', '26.98713', 5, 25, 25, 25, 25),
(25, '2013-12-18 15:11:20', '50.39353', '30.63393', 5, 3, 9, 20, 25),
(26, '2013-12-18 15:11:20', '49.83968', '24.02972', 5, 25, 25, 25, 25),
(27, '2013-12-18 15:11:20', '47.55854', '33.64873', 5, 25, 25, 25, 25),
(28, '2013-12-18 15:11:20', '49.83968', '24.02972', 5, 25, 25, 25, 25),
(29, '2013-12-18 15:11:20', '50.44128', '30.50357', 5, 27, 25, 25, 25),
(30, '2013-12-18 15:11:20', '49.83413', '24.00979', 5, 25, 25, 25, 25),
(31, '2013-12-18 15:11:20', '59.91387', '10.75225', 5, 25, 25, 99, 25),
(32, '2013-12-18 15:11:20', '59.91387', '10.75225', 5, 25, 25, 25, 25),
(33, '2013-12-18 15:11:20', '49.83412', '24.00984', 5, 25, 25, 25, 25),
(34, '2013-12-18 15:11:20', '49.83412', '24.00984', 5, 39, 25, 25, 25),
(35, '2013-12-18 15:11:20', '50.45010', '30.52340', 5, 71, 1, 70, 0),
(36, '2013-12-18 15:11:20', '50.45010', '30.52340', 5, 25, 25, 25, 25),
(37, '2013-12-18 15:11:20', '50.44091', '30.28491', 5, 25, 25, 25, 25),
(38, '2013-12-18 15:11:20', '50.45010', '30.52340', 5, 25, 25, 25, 25),
(39, '2013-12-18 15:11:20', '40.20203', '-8.39611', 5, 25, 25, 25, 25),
(40, '2013-12-18 15:11:20', '52.52533', '13.41845', 5, 25, 25, 25, 25),
(41, '2013-12-18 15:11:20', '46.41694', '30.71550', 5, 70, 10, 1, 25),
(42, '2013-12-18 15:11:20', '59.91492', '10.72677', 5, 25, 25, 25, 25),
(43, '2013-12-18 15:11:20', '59.91492', '10.72677', 5, 25, 25, 25, 25),
(44, '2013-12-18 15:11:20', '59.91492', '10.72677', 5, 25, 25, 25, 25),
(45, '2013-12-18 15:11:20', '59.91490', '10.72678', 5, 25, 25, 25, 25),
(46, '2013-12-18 15:11:20', '50.41364', '30.53478', 5, 0, 0, 1, 1),
(47, '2013-12-18 15:11:20', '59.91387', '10.75225', 5, 25, 25, 25, 25),
(48, '2013-12-18 15:11:20', '59.91484', '10.72700', 5, 64, 25, 62, 68),
(49, '2013-12-18 15:11:20', '50.45081', '30.47366', 5, 25, 25, 25, 25),
(50, '2013-12-18 15:11:20', '59.91387', '10.75225', 5, 25, 25, 25, 25),
(51, '2013-12-18 15:11:20', '59.90012', '10.63080', 5, 3, 4, 2, 2),
(52, '2013-12-18 15:11:20', '59.90000', '10.63100', 5, 3, 4, 4, 3),
(53, '2013-12-18 15:11:20', '59.90000', '10.63100', 5, 2, 2, 2, 2),
(54, '2013-12-18 15:11:20', '49.84000', '24.03000', 5, 2, 0, 2, 4),
(55, '2013-12-18 15:11:20', '49.80300', '24.00200', 5, 3, 0, 3, 3),
(56, '2013-12-18 15:11:20', '55.78600', '37.68800', 5, 3, 2, 2, 2),
(57, '2013-12-18 15:11:20', '59.91500', '10.72700', 5, 3, 2, 2, 2),
(58, '2013-12-18 15:11:20', '59.90000', '10.63100', 5, 4, 2, 2, 2),
(59, '2013-12-18 15:11:20', '59.91500', '10.72700', 5, 5, 0, 5, 2),
(60, '2013-12-18 15:11:20', '49.80300', '24.00200', 5, 4, 4, 5, 4),
(61, '2013-12-18 15:11:20', '59.90000', '10.63100', 5, 2, 0, 1, 0),
(62, '2013-12-18 15:11:20', '50.45000', '30.52300', 5, 1, 2, 2, 3),
(63, '2013-12-18 15:11:20', '59.91500', '10.72700', 5, 1, 1, 1, 1),
(64, '2013-12-18 15:11:20', '67.98799', '35.45645', 5, 2, 0, 3, 1),
(65, '2013-12-18 15:11:20', '35.45645', '67.98799', 5, 2, 0, 3, 1),
(66, '2013-12-18 15:11:20', '35.45645', '67.98799', 5, 2, 0, 3, 1),
(67, '2013-12-18 15:11:20', '35.45645', '67.98799', 5, 2, 0, 3, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;