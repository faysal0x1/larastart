-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 15, 2025 at 12:44 AM
-- Server version: 10.11.14-MariaDB-cll-lve
-- PHP Version: 8.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bzcombd_tbz`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `position` int(11) DEFAULT 1,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_image` varchar(255) DEFAULT NULL,
  `meta_description` varchar(255) DEFAULT NULL,
  `is_featured` int(11) NOT NULL DEFAULT 0,
  `is_active` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `title`, `slug`, `position`, `image`, `description`, `meta_title`, `meta_image`, `meta_description`, `is_featured`, `is_active`, `created_at`, `updated_at`) VALUES
(29, 'Microsoft', 'microsoft', 1, '1745234672.jpg', NULL, NULL, NULL, NULL, 1, 1, '2024-06-26 19:19:24', '2025-06-30 17:22:04'),
(30, 'Dell', 'dell', 2, '1745234682.jpg', NULL, NULL, NULL, NULL, 1, 1, '2024-06-26 20:00:26', '2025-05-08 09:23:39'),
(31, 'SAMSUNG', 'samsung', 3, '1745234699.jpg', NULL, NULL, NULL, NULL, 1, 1, '2024-06-26 20:01:03', '2025-05-08 09:23:44'),
(32, 'HP', 'hp', 4, '1745234709.jpg', NULL, NULL, NULL, NULL, 1, 1, '2024-06-26 20:01:22', '2025-06-06 14:51:10'),
(33, 'Lenovo', 'lenovo', 5, '1745234719.jpg', NULL, NULL, NULL, NULL, 1, 1, '2024-06-26 20:01:37', '2025-05-08 09:23:53'),
(34, 'ASUS', 'asus', 6, '1745234746.jpg', NULL, NULL, NULL, NULL, 1, 1, '2024-06-26 20:02:00', '2025-06-10 17:57:12'),
(35, 'WALTON', 'walton', 7, '1745234756.jpg', NULL, NULL, NULL, NULL, 1, 1, '2024-06-26 20:02:22', '2025-05-08 09:24:14'),
(36, 'Acer', 'acer', 8, '1745234765.jpg', NULL, NULL, NULL, NULL, 1, 1, '2024-06-26 20:02:45', '2025-06-13 17:25:59'),
(37, 'Apple', 'apple', 9, '1745234776.jpg', NULL, NULL, NULL, NULL, 1, 1, '2024-06-26 20:03:21', '2025-06-17 17:41:06'),
(39, 'SONY', 'sony', 11, '1745234797.jpg', NULL, NULL, NULL, NULL, 1, 1, '2024-06-26 20:03:48', '2025-05-08 09:24:34'),
(40, 'Adata', 'adata', 12, '1745234811.jpg', NULL, NULL, NULL, NULL, 1, 1, '2024-06-26 20:04:13', '2025-05-08 09:24:41'),
(41, 'Intel', 'intel', 13, '1745234826.jpg', NULL, NULL, NULL, NULL, 1, 1, '2024-06-26 20:04:35', '2025-05-08 09:24:48'),
(42, 'Gigabyte', 'gigabyte', 14, '1745234837.jpg', NULL, NULL, NULL, NULL, 1, 1, '2024-07-04 10:37:22', '2025-05-08 09:24:55'),
(46, 'MSI', 'msi', 18, '1745234867.jpg', NULL, NULL, NULL, NULL, 1, 1, '2024-07-07 10:53:04', '2025-06-06 10:00:26'),
(58, 'Logitech', 'logitech', 15, '1745234848.jpg', NULL, NULL, NULL, NULL, 1, 1, '2025-04-21 08:27:44', '2025-05-08 09:25:01'),
(59, 'A4tech', 'a4tech', 16, '1745234858.jpg', NULL, NULL, NULL, NULL, 1, 1, '2025-04-21 08:28:19', '2025-05-08 09:25:08'),
(60, 'Epson', 'epson', NULL, '1745227068.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-04-21 09:17:48', '2025-06-01 05:35:55'),
(61, 'Aiwa', 'aiwa', NULL, '1748156916.png', NULL, NULL, NULL, NULL, 0, 1, '2025-05-25 07:08:36', '2025-06-01 05:36:03'),
(62, 'Apacer', 'apacer', NULL, '1748168586.jpeg', NULL, NULL, NULL, NULL, 0, 1, '2025-05-25 10:23:06', '2025-06-01 05:36:11'),
(63, 'HAVIT', 'havit', NULL, '1748254144.png', NULL, NULL, NULL, NULL, 0, 1, '2025-05-26 10:09:04', '2025-06-01 05:36:20'),
(64, 'T-WOLF', 't-wolf', NULL, '1748345445.png', NULL, NULL, NULL, NULL, 0, 1, '2025-05-27 11:30:45', '2025-06-01 05:36:28'),
(65, 'Fantech', 'fantech', NULL, '1748414312.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-05-28 06:38:32', '2025-06-01 05:36:37'),
(66, 'Rapoo', 'rapoo', NULL, '1748415256.png', NULL, NULL, NULL, NULL, 0, 1, '2025-05-28 06:54:16', '2025-06-01 05:36:45'),
(67, 'Tenda', 'tenda', NULL, '1748416088.png', NULL, NULL, NULL, NULL, 0, 1, '2025-05-28 07:08:08', '2025-06-01 05:36:55'),
(68, 'Smart', 'smart', NULL, '1748419793.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-05-28 08:08:46', '2025-06-01 05:37:03'),
(69, 'Solitine', 'solitine', NULL, '1748424832.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-05-28 09:33:52', '2025-06-01 05:37:12'),
(70, 'Twinmos', 'twinmos', NULL, '1748507267.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-05-29 08:27:47', '2025-06-01 05:37:29'),
(71, 'Value Top', 'value-top', NULL, '1748852367.png', NULL, NULL, NULL, NULL, 0, 1, '2025-06-02 08:19:27', '2025-06-12 08:42:14'),
(72, 'MaxGreen', 'maxgreen', NULL, '1749630127.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-06-11 08:22:07', '2025-06-11 08:22:07'),
(73, 'Xiaomi', 'xiaomi', NULL, '1749631514.png', NULL, NULL, NULL, NULL, 0, 1, '2025-06-11 08:45:15', '2025-06-11 08:45:15'),
(74, 'Non Brand', 'non-brand', NULL, '1749634170.png', NULL, NULL, NULL, NULL, 0, 1, '2025-06-11 09:20:10', '2025-06-11 09:29:30'),
(75, 'Orico', 'orico', NULL, '1749634365.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-06-11 09:32:45', '2025-06-11 09:32:45'),
(76, 'DeepCool', 'deepcool', NULL, '1749662116.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-06-11 17:15:16', '2025-06-11 17:15:16'),
(77, 'Black Cat', 'black-cat', NULL, '1749662426.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-06-11 17:20:26', '2025-06-11 17:20:26'),
(78, 'AMD', 'amd', NULL, '1749751513.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-06-12 18:05:13', '2025-06-12 18:05:13'),
(79, 'Zotac', 'zotac', NULL, '1750096259.webp', NULL, NULL, NULL, NULL, 0, 1, '2025-06-16 17:50:59', '2025-06-16 17:50:59'),
(80, 'Western Digital', 'western-digital', NULL, '1750763783.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-06-24 11:16:23', '2025-06-28 16:32:08'),
(81, 'King Super', 'king-super', NULL, '1750855262.png', NULL, NULL, NULL, NULL, 0, 1, '2025-06-25 12:40:10', '2025-06-28 16:32:20'),
(82, 'Kingston', 'kingston', NULL, '1751967679.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-08 09:41:19', '2025-07-09 11:51:30'),
(83, 'Kstar', 'kstar', NULL, '1759237532.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-07-09 06:51:26', '2025-09-30 13:05:32'),
(84, 'Atlas', 'atlas', NULL, '1752054212.jpeg', NULL, NULL, NULL, NULL, 0, 1, '2025-07-09 09:43:32', '2025-07-09 12:04:05'),
(85, 'Dahua', 'dahua', NULL, '1752057664.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-07-09 10:41:04', '2025-07-09 12:04:16'),
(86, 'Optoma', 'optoma', NULL, '1752058081.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-07-09 10:48:01', '2025-07-09 10:48:01'),
(87, 'HikVision', 'hikvision', NULL, '1752060839.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-09 11:34:00', '2025-07-09 12:04:40'),
(88, 'BenQ', 'benq', NULL, '1752064318.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-09 12:31:58', '2025-07-09 12:31:58'),
(89, 'TOA', 'toa', NULL, '1752138275.jpeg', NULL, NULL, NULL, NULL, 0, 1, '2025-07-10 09:04:35', '2025-07-10 09:04:35'),
(90, 'Esonic', 'esonic', NULL, '1752151892.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-10 12:51:32', '2025-07-11 09:00:46'),
(91, 'Hi-Power', 'hi-power', NULL, '1752308828.jpeg', NULL, NULL, NULL, NULL, 0, 1, '2025-07-12 08:27:08', '2025-07-12 08:43:19'),
(92, 'Bingji', 'bingji', NULL, '1752383975.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-07-12 12:38:08', '2025-07-13 05:19:35'),
(93, 'Tp-Link', 'tp-link', NULL, '1752391104.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-13 07:18:24', '2025-07-13 07:18:24'),
(94, 'IMOU', 'imou', NULL, '1752565110.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-15 07:38:30', '2025-07-15 07:38:30'),
(95, 'ViewSonic', 'viewsonic', NULL, '1752597496.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-15 16:38:16', '2025-07-15 16:38:16'),
(96, 'VIVITEK', 'vivitek', NULL, '1752655517.jpeg', NULL, NULL, NULL, NULL, 0, 1, '2025-07-16 08:45:17', '2025-07-16 08:45:17'),
(97, 'Boxlight', 'boxlight', NULL, '1752685514.webp', NULL, NULL, NULL, NULL, 0, 1, '2025-07-16 17:05:14', '2025-07-16 17:05:14'),
(98, 'AUN', 'aun', NULL, '1752753427.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-07-17 11:57:07', '2025-07-17 11:57:07'),
(99, 'InFocus', 'infocus', NULL, '1752755621.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-17 12:33:41', '2025-07-17 12:33:41'),
(100, 'Cheerlux', 'cheerlux', NULL, '1752757348.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-17 13:02:28', '2025-07-17 13:02:28'),
(101, 'Philips', 'philips', NULL, '1752902122.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-19 05:15:22', '2025-07-19 05:15:22'),
(102, 'XINJI', 'xinji', NULL, '1752913489.webp', NULL, NULL, NULL, NULL, 0, 1, '2025-07-19 08:24:49', '2025-07-19 08:24:49'),
(103, 'Blisbond', 'blisbond', NULL, '1752914941.webp', NULL, NULL, NULL, NULL, 0, 1, '2025-07-19 08:49:01', '2025-07-19 08:49:01'),
(104, 'Microlab', 'microlab', NULL, '1752924131.jpeg', NULL, NULL, NULL, NULL, 0, 1, '2025-07-19 11:22:11', '2025-07-19 11:22:11'),
(105, 'Dopah', 'dopah', NULL, '1752924540.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-19 11:29:00', '2025-07-19 11:29:00'),
(106, 'APOLLO', 'apollo', NULL, '1757591360.jpeg', NULL, NULL, NULL, NULL, 0, 1, '2025-07-19 11:50:44', '2025-09-11 11:49:20'),
(107, 'HTDZ', 'htdz', NULL, '1752993382.webp', NULL, NULL, NULL, NULL, 0, 1, '2025-07-20 06:36:22', '2025-07-20 06:36:22'),
(109, 'Jabra', 'jabra', NULL, '1753004940.webp', NULL, NULL, NULL, NULL, 0, 1, '2025-07-20 09:49:00', '2025-07-20 09:49:00'),
(110, 'CMX', 'cmx', NULL, '1753082041.jpeg', NULL, NULL, NULL, NULL, 0, 1, '2025-07-21 07:14:01', '2025-07-21 07:14:01'),
(111, 'TEV', 'tev', NULL, '1753101324.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-07-21 12:35:24', '2025-07-21 12:35:24'),
(112, 'AVerMedia', 'avermedia', NULL, '1753102894.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-07-21 13:01:34', '2025-07-21 13:01:34'),
(113, 'Poly', 'poly', NULL, '1753164541.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-22 06:09:01', '2025-07-22 06:09:01'),
(114, 'AVer', 'aver', NULL, '1753166090.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-22 06:34:50', '2025-07-22 06:34:50'),
(115, 'Grandstream', 'grandstream', NULL, '1753167949.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-22 07:05:49', '2025-07-22 07:05:49'),
(116, 'ScreenBeam', 'screenbeam', NULL, '1753180778.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-22 10:39:38', '2025-07-22 10:39:38'),
(117, 'MAXHUB', 'maxhub', NULL, '1753184339.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-22 11:38:59', '2025-07-22 11:38:59'),
(119, 'Tiandy', 'tiandy', NULL, '1753252013.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-23 06:26:53', '2025-07-23 06:26:53'),
(120, 'JBL', 'jbl', NULL, '1753339606.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-24 06:46:47', '2025-07-24 06:46:47'),
(121, 'LG', 'lg', NULL, '1753520595.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-26 09:03:15', '2025-07-26 09:03:15'),
(122, 'Hitachi', 'hitachi', NULL, '1753595727.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-27 05:55:27', '2025-07-27 05:55:27'),
(123, 'METZ', 'metz', NULL, '1753599109.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-27 06:51:49', '2025-07-27 06:51:49'),
(124, 'ARMOR', 'armor', NULL, '1753609958.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-27 09:52:38', '2025-07-27 09:52:38'),
(125, 'Panasonic', 'panasonic', NULL, '1753639022.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-27 17:57:02', '2025-07-27 17:57:02'),
(126, 'BDCOM', 'bdcom', NULL, '1753677615.webp', NULL, NULL, NULL, NULL, 0, 1, '2025-07-28 04:40:16', '2025-07-28 04:40:16'),
(127, 'ZKTeco', 'zkteco', NULL, '1753791431.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-29 12:17:11', '2025-07-29 12:17:11'),
(128, 'Newline', 'newline', NULL, '1753791657.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-29 12:20:57', '2025-07-29 12:20:57'),
(129, 'iBoard', 'iboard', NULL, '1753791748.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-29 12:22:28', '2025-07-29 12:22:28'),
(130, 'Innovtech', 'innovtech', NULL, '1753979630.png', NULL, NULL, NULL, NULL, 0, 1, '2025-07-31 16:33:50', '2025-07-31 16:33:50'),
(131, 'Pantum', 'pantum', NULL, '1754113746.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-02 05:49:06', '2025-08-02 05:49:06'),
(132, 'Brother', 'brother', NULL, '1754119199.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-02 07:19:59', '2025-08-02 07:19:59'),
(133, 'Canon', 'canon', NULL, '1754136166.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-02 12:02:46', '2025-08-02 12:02:46'),
(134, 'Fujifilm', 'fujifilm', NULL, '1754297720.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-04 08:55:20', '2025-08-04 08:55:20'),
(135, 'Zebra', 'zebra', NULL, '1754380201.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-08-05 07:50:01', '2025-08-05 07:50:01'),
(136, 'Evolis', 'evolis', NULL, '1754381186.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-05 08:06:26', '2025-08-05 08:06:26'),
(137, 'HID', 'hid', NULL, '1754386379.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-05 09:32:59', '2025-08-05 09:32:59'),
(138, 'Deli', 'deli', NULL, '1754387252.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-05 09:47:32', '2025-08-05 09:47:32'),
(139, 'RONGTA', 'rongta', NULL, '1754389331.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-05 10:22:11', '2025-08-05 10:22:11'),
(140, 'Sewoo', 'sewoo', NULL, '1754460928.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-06 06:15:28', '2025-08-06 06:15:28'),
(141, 'Xprinter', 'xprinter', NULL, '1754464021.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-06 07:07:01', '2025-08-06 07:07:01'),
(142, 'SPRT', 'sprt', NULL, '1754475705.jpeg', NULL, NULL, NULL, NULL, 0, 1, '2025-08-06 10:21:45', '2025-08-06 10:21:45'),
(143, 'Sunmi', 'sunmi', NULL, '1754498510.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-06 16:41:50', '2025-08-06 16:41:50'),
(144, 'Citizen', 'citizen', NULL, '1754498687.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-06 16:44:47', '2025-08-06 16:44:47'),
(145, 'G-Printer', 'g-printer', NULL, '1754498815.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-06 16:46:55', '2025-08-06 16:46:55'),
(146, 'Bixolon', 'bixolon', NULL, '1754499052.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-06 16:50:52', '2025-08-06 16:50:52'),
(147, 'TSC', 'tsc', NULL, '1754829427.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-10 12:37:07', '2025-08-10 12:37:07'),
(148, 'GoDEX', 'godex', NULL, '1754899463.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-11 08:04:23', '2025-08-11 08:04:23'),
(149, 'Toshiba', 'toshiba', NULL, '1754906262.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-11 09:57:42', '2025-08-11 09:57:42'),
(150, 'Sharp', 'sharp', NULL, '1755756313.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-12 08:25:41', '2025-08-21 06:05:13'),
(151, 'Ricoh', 'ricoh', NULL, '1755070061.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-13 07:27:41', '2025-08-13 07:27:41'),
(152, 'Power Print', 'power-print', NULL, '1755413412.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-17 06:32:08', '2025-08-17 06:50:12'),
(153, 'True Trust', 'true-trust', NULL, '1755418084.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-17 08:08:04', '2025-08-17 08:08:04'),
(154, 'Starink', 'starink', NULL, '1755495953.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-18 05:45:53', '2025-08-18 05:45:53'),
(155, 'G&G', 'gg', NULL, '1755680410.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-20 08:31:26', '2025-08-20 09:00:10'),
(156, 'Print-Rite', 'print-rite', NULL, '1755709173.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-20 16:59:33', '2025-08-20 16:59:33'),
(157, 'LongPrint', 'longprint', NULL, '1755928845.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-23 06:00:45', '2025-08-23 06:00:45'),
(158, 'SafeWay', 'safeway', NULL, '1755967659.png', NULL, NULL, NULL, NULL, 0, 1, '2025-08-23 16:47:39', '2025-08-23 16:47:39'),
(159, 'Plustek', 'plustek', NULL, '1756887394.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-03 08:16:34', '2025-09-03 08:16:34'),
(160, 'Avision', 'avision', NULL, '1756889381.jpeg', NULL, NULL, NULL, NULL, 0, 1, '2025-09-03 08:49:41', '2025-09-03 08:49:41'),
(161, 'Fujitsu', 'fujitsu', NULL, '1756890572.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-03 09:09:32', '2025-09-03 09:09:32'),
(162, 'Kodak', 'kodak', NULL, '1756901932.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-03 12:18:52', '2025-09-03 12:18:52'),
(163, 'Winson', 'winson', NULL, '1756978088.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-04 09:28:08', '2025-09-04 09:28:08'),
(164, 'Yumite', 'yumite', NULL, '1757139673.jpeg', NULL, NULL, NULL, NULL, 0, 1, '2025-09-06 06:21:13', '2025-09-06 06:21:13'),
(165, 'ZEBEX', 'zebex', NULL, '1757146797.jpeg', NULL, NULL, NULL, NULL, 0, 1, '2025-09-06 08:19:57', '2025-09-06 08:19:57'),
(166, 'Honeywell', 'honeywell', NULL, '1757150156.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-06 09:15:56', '2025-09-06 09:15:56'),
(167, 'Sunlux', 'sunlux', NULL, '1757226647.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-07 06:30:47', '2025-09-07 06:30:47'),
(168, 'Maken', 'maken', NULL, '1757246547.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-07 12:02:27', '2025-09-07 12:02:27'),
(169, 'Hellotel', 'hellotel', NULL, '1757250033.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-07 13:00:33', '2025-09-07 13:00:33'),
(170, 'Mitel', 'mitel', NULL, '1757330506.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-08 11:21:46', '2025-09-08 11:21:46'),
(171, 'Cisco', 'cisco', NULL, '1757403669.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-09 07:41:09', '2025-09-09 07:41:09'),
(172, 'Avaya', 'avaya', NULL, '1757404685.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-09 07:58:05', '2025-09-09 07:58:05'),
(173, 'DINSTAR', 'dinstar', NULL, '1757405473.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-09 08:11:13', '2025-09-09 08:11:13'),
(174, 'Snom', 'snom', NULL, '1757418370.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-09 11:46:10', '2025-09-09 11:46:10'),
(175, 'Flyingvoice', 'flyingvoice', NULL, '1757422668.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-09 12:57:48', '2025-09-09 12:57:48'),
(176, 'Zycoo', 'zycoo', NULL, '1757584305.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-11 09:51:45', '2025-09-11 09:51:45'),
(177, 'Kington', 'kington', NULL, '1757592738.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-11 12:11:26', '2025-09-11 12:12:18'),
(178, 'Domens', 'domens', NULL, '1757743252.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-13 06:00:52', '2025-09-13 06:00:52'),
(179, 'Namibind', 'namibind', NULL, '1757749256.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-13 07:40:56', '2025-09-13 07:40:56'),
(180, 'Safescan', 'safescan', NULL, '1757749838.webp', NULL, NULL, NULL, NULL, 0, 1, '2025-09-13 07:50:38', '2025-09-13 07:50:38'),
(181, 'Chihua', 'chihua', NULL, '1757754455.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-09-13 09:07:35', '2025-09-13 09:07:35'),
(182, 'Julong', 'julong', NULL, '1757755386.webp', NULL, NULL, NULL, NULL, 0, 1, '2025-09-13 09:23:06', '2025-09-13 09:23:06'),
(183, 'Maxsell', 'maxsell', NULL, '1757756070.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-13 09:34:30', '2025-09-13 09:34:30'),
(184, 'Tay-Chian', 'tay-chian', NULL, '1757756805.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-13 09:46:45', '2025-09-13 09:46:45'),
(185, 'Ofitech', 'ofitech', NULL, '1757835716.jpeg', NULL, NULL, NULL, NULL, 0, 1, '2025-09-14 07:41:56', '2025-09-14 07:41:56'),
(186, 'Aurora', 'aurora', NULL, '1757837979.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-09-14 08:19:39', '2025-09-14 08:19:39'),
(187, 'Xtreme', 'xtreme', NULL, '1757839246.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-14 08:39:50', '2025-09-14 08:40:46'),
(188, 'SANTAK', 'santak', NULL, '1759225153.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-30 09:39:13', '2025-09-30 09:39:13'),
(189, 'Digital X', 'digital-x', NULL, '1759226413.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-09-30 10:00:13', '2025-09-30 10:00:13'),
(190, 'Prolink', 'prolink', NULL, '1759233035.png', NULL, NULL, NULL, NULL, 0, 1, '2025-09-30 11:50:35', '2025-09-30 11:50:35'),
(191, 'MARSRIVA', 'marsriva', NULL, '1759302259.png', NULL, NULL, NULL, NULL, 0, 1, '2025-10-01 07:04:19', '2025-10-01 07:04:19'),
(192, 'Power Pac', 'power-pac', NULL, '1759308001.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-10-01 08:40:01', '2025-10-01 08:40:01'),
(193, 'Vertiv', 'vertiv', NULL, '1759316155.png', NULL, NULL, NULL, NULL, 0, 1, '2025-10-01 10:55:55', '2025-10-01 10:55:55'),
(194, 'Power Guard', 'power-guard', NULL, '1759317399.png', NULL, NULL, NULL, NULL, 0, 1, '2025-10-01 11:16:39', '2025-10-01 11:16:39'),
(195, 'PC Power', 'pc-power', NULL, '1759320023.jpg', NULL, NULL, NULL, NULL, 0, 1, '2025-10-01 12:00:23', '2025-10-01 12:00:23'),
(196, 'Ideal', 'ideal', NULL, '1759321829.png', NULL, NULL, NULL, NULL, 0, 1, '2025-10-01 12:30:05', '2025-10-01 12:30:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brands_id_index` (`id`),
  ADD KEY `brands_title_index` (`title`),
  ADD KEY `brands_is_active_index` (`is_active`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=197;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
