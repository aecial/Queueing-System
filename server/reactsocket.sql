-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2024 at 05:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reactsocket`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `now_serving` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `officeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `now_serving`, `description`, `officeId`) VALUES
(1, 'A1', '', 'VERIFICATION OF REAL PROPERTY RECORDS', 1),
(2, 'A2', '', 'VERIFICATION OF REAL PROPERTY RECORDS', 1),
(3, 'A3', '', 'ORDER OF PAYMENT', 1),
(4, 'A4', '', 'RELEASING OF REAL PROPERTY DOCUMENTS', 1),
(5, 'A5', '', 'TAX MAPPING', 1),
(6, 'B1', '', 'APPLICATION AND ASSESSMENT', 2),
(7, 'B2', '', 'MAYOR\'S PERMIT FOR BUSINESS', 2),
(9, 'T1', '', 'REAL PROPERTY TAX', 3),
(10, 'T2', '', 'REAL PROPERTY TAX', 3),
(11, 'T3', '', 'REAL PROPERTY TAX', 3),
(12, 'T4', '', 'REAL PROPERTY TAX', 3),
(13, 'T6', '', 'COMMUNITY TAX', 3),
(14, 'T7', '', 'COMMUNITY TAX', 3),
(15, 'T8', '', 'OTHERS', 3),
(16, 'T9', '', 'BUSINESS AND MTOP', 3),
(17, 'T10', '', 'OTHERS RECEIPT', 3),
(18, 'T11', '', 'BUSINESS AND MTOP', 3);

-- --------------------------------------------------------

--
-- Table structure for table `office`
--

CREATE TABLE `office` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `office`
--

INSERT INTO `office` (`id`, `name`) VALUES
(1, 'ASSESSOR'),
(2, 'BPLS'),
(3, 'TREASURY');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `service_time` double NOT NULL,
  `departmentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `createdAt`, `service_time`, `departmentId`) VALUES
(1, '2024-05-17 02:03:37', 13.33, 1),
(2, '2024-05-17 16:00:32', 8.22, 1),
(3, '2024-05-17 16:00:43', 11.19, 1),
(4, '2024-05-17 16:01:29', 3.94, 1),
(5, '2024-05-17 16:19:44', 6.71, 1),
(6, '2024-05-17 16:19:46', 1.95, 1),
(7, '2024-05-17 16:19:48', 2.19, 1),
(8, '2024-05-17 17:00:37', 2.32, 1),
(9, '2024-05-17 17:00:52', 2.1, 1),
(10, '2024-05-17 17:02:30', 3.58, 1),
(11, '2024-05-17 17:09:33', 2.47, 2),
(12, '2024-05-17 17:10:00', 1.18, 1),
(13, '2024-05-17 17:10:26', 5.65, 1),
(14, '2024-05-17 17:10:35', 5.78, 2),
(15, '2024-05-17 17:10:42', 3.83, 1),
(16, '2024-05-17 20:42:32', 6.21, 1),
(17, '2024-05-17 20:42:41', 8.93, 1),
(18, '2024-05-17 20:42:47', 2.12, 2),
(19, '2024-05-17 20:42:48', 0.97, 2),
(20, '2024-05-17 20:42:52', 2.09, 1),
(21, '2024-05-17 20:43:41', 2.7, 1),
(22, '2024-05-17 20:45:51', 5.23, 1),
(23, '2024-05-17 20:49:06', 8.57, 1),
(24, '2024-05-17 20:49:11', 2.43, 2),
(25, '2024-05-17 20:49:14', 1.46, 1),
(26, '2024-05-18 02:48:11', 5.43, 1),
(27, '2024-05-18 02:50:07', 5.45, 1),
(28, '2024-05-18 02:50:11', 4.42, 1),
(29, '2024-05-18 02:50:14', 2.92, 1),
(30, '2024-05-18 03:41:33', 66.43, 1),
(31, '2024-05-18 03:43:18', 104.14, 1),
(32, '2024-05-18 03:43:26', 8.05, 1),
(33, '2024-05-18 03:43:27', 1.49, 1),
(34, '2024-05-18 03:45:46', 45.38, 1),
(35, '2024-05-18 04:00:47', 3.3, 1),
(36, '2024-05-18 04:01:44', 57.15, 1),
(37, '2024-05-18 04:36:22', 3.3, 1),
(38, '2024-05-18 04:36:30', 7.81, 1),
(39, '2024-05-18 04:37:18', 9.24, 1),
(40, '2024-05-18 04:41:30', 4.52, 1),
(41, '2024-05-18 04:41:33', 2.98, 1),
(42, '2024-05-18 04:42:32', 4.28, 1),
(43, '2024-05-18 04:42:37', 5.28, 1),
(44, '2024-05-18 04:45:06', 2.8, 1),
(45, '2024-05-18 04:45:08', 2.5, 1),
(46, '2024-05-18 04:47:13', 3.14, 1),
(47, '2024-05-18 04:47:17', 4.18, 1),
(48, '2024-05-18 04:50:44', 3.76, 1),
(49, '2024-05-18 04:50:46', 1.75, 1),
(50, '2024-05-18 04:52:57', 3.51, 1),
(51, '2024-05-18 04:53:01', 3.43, 1),
(52, '2024-05-19 20:19:13', 8.61, 10),
(53, '2024-05-19 20:19:28', 8.03, 9),
(54, '2024-05-19 20:19:33', 5.11, 9),
(55, '2024-05-19 20:19:53', 3.57, 7),
(56, '2024-05-19 20:20:05', 4.7, 6),
(57, '2024-05-19 20:20:09', 3.14, 6),
(58, '2024-05-21 03:06:53', 14.3, 2),
(59, '2024-05-21 03:07:45', 9.55, 2),
(60, '2024-05-21 03:07:55', 5.35, 3),
(61, '2024-05-21 03:08:07', 5.64, 2),
(62, '2024-05-27 03:19:05', 8.13, 1),
(63, '2024-05-27 03:19:12', 6.84, 1),
(64, '2024-05-27 03:19:18', 6.28, 1),
(65, '2024-05-27 03:19:22', 3.81, 1),
(66, '2024-05-27 03:19:25', 3.58, 1),
(67, '2024-05-27 03:19:28', 2.84, 1),
(68, '2024-05-27 03:19:32', 3.54, 1),
(69, '2024-05-27 03:19:37', 4.99, 1),
(70, '2024-05-27 03:19:41', 3.73, 1),
(71, '2024-05-27 03:19:44', 3.79, 1),
(72, '2024-05-27 03:19:46', 2.16, 1),
(73, '2024-05-27 03:19:48', 1.47, 1),
(74, '2024-05-27 03:19:50', 1.71, 1),
(75, '2024-05-27 03:19:52', 2.2, 1),
(76, '2024-05-27 03:19:54', 2.4, 1),
(77, '2024-05-27 03:19:56', 1.63, 1),
(78, '2024-05-27 03:19:57', 1.41, 1),
(79, '2024-05-27 03:19:59', 1.28, 1),
(80, '2024-05-27 03:20:00', 1.1, 1),
(81, '2024-05-27 03:20:03', 2.8, 1),
(82, '2024-05-27 03:20:05', 2.41, 1),
(83, '2024-05-27 03:20:08', 2.77, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 0,
  `departmentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `name`, `createdAt`, `status`, `departmentId`) VALUES
(75, 'SQR1R', '2024-05-23 03:31:49', 0, 3),
(79, '5D81J', '2024-05-23 03:36:29', 0, 3),
(80, 'QUK7F', '2024-05-23 04:06:25', 0, 9),
(82, 'SLRE3', '2024-05-23 04:12:11', 0, 6),
(84, 'TCW1G', '2024-05-23 04:13:01', 0, 5),
(88, 'PG4ZK', '2024-05-23 04:16:43', 0, 4),
(89, 'TNUXL', '2024-05-23 04:17:44', 0, 5),
(90, 'KIF32', '2024-05-23 04:17:50', 0, 9),
(94, 'WRM3U', '2024-05-25 01:06:26', 0, 7),
(95, '15FSV', '2024-05-27 03:20:03', 0, 2),
(96, 'PESQ0', '2024-05-27 03:20:05', 0, 2),
(97, '65E7Y', '2024-05-27 03:20:08', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `officeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `createdAt`, `updatedAt`, `officeId`) VALUES
(1, 'ted', '$2b$10$OomVowvJfXndBZHtZnkVaeBFxfoMc4Zi3w4L4YkToeKyFZ0aVHZxK', '2024-05-17 01:38:55', '2024-05-17 01:38:55', NULL),
(2, 'aecial', '$2b$10$md29z3/0UtoXJO2RsmkcEuc4oyi72sj62aVKtB9hBzN9n9G2g6R3W', '2024-05-26 06:05:41', '2024-05-26 06:05:41', 1),
(3, 'maya', '$2b$10$HqFxOjMpSGZDkNUJ/sIBWe09PrnrRDhqTUieny2PvkxbH5XePPGb6', '2024-05-27 03:24:25', '2024-05-27 03:24:25', 2),
(4, 'den', '$2b$10$20OPm0b9fI78pdXnD3J29.jG2ZUqPgyVXijewkz5bBC0jsZEv8gLC', '2024-05-28 20:31:21', '2024-05-28 20:31:21', 3);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0bfe2020-904a-403b-9738-eaeb9aeadef9', 'e60917a827df84f6c6a0ea43db4dc8fe8b48e612daac9fc824feae81b7ff6bd4', '2024-05-17 09:37:20.520', '20240517093720_add_office_model', NULL, NULL, '2024-05-17 09:37:20.397', 1),
('137ce5d9-8542-4666-a05b-ec65671c4573', '30fe6113d908c6cc760f2e11e3c8be2ae10b5bb40fd35e3c28ca3b92548231a8', '2024-05-26 12:49:29.887', '20240526124929_add_office_user_model', NULL, NULL, '2024-05-26 12:49:29.850', 1),
('2c252696-6d6b-47a4-8870-b803f0da1247', 'd89b4c3bc9396162cd9ea987ab023befb1bf956982ad389a658493771f3e175a', '2024-05-17 09:37:20.090', '20240512083926_add_user_model', NULL, NULL, '2024-05-17 09:37:20.080', 1),
('4a6d7d55-f14c-464b-8d61-78b578a4dd9a', 'a21ce075efcc4987becab96f707ed04b0437edbcb9a348fb68c35948683b298f', '2024-05-17 09:37:20.079', '20240512064153_add_desc', NULL, NULL, '2024-05-17 09:37:20.072', 1),
('5efa3b94-fd28-419f-afc9-e2f99609e202', '22d0dabb811b89bba21afed3a106c10cc936153fde0ba195e6d6b4c72cec28d8', '2024-05-17 09:37:20.014', '20240310102549_init', NULL, NULL, '2024-05-17 09:37:19.964', 1),
('85d07897-ed96-4f51-80c9-30e03d1e747a', '1edcc988bdc06f39475d7bcb5d6c07946ea605c15361b686238e152f41118f33', '2024-05-17 09:37:20.062', '20240408091230_add_service', NULL, NULL, '2024-05-17 09:37:20.016', 1),
('de321fd8-49d6-452b-a892-5d7f0239052d', '9516d55ec9b0cb948d2ec0abb9b15549e9dc88da0a4131c65ff5227e365b48e0', '2024-05-17 09:37:20.071', '20240430104353_now_serving', NULL, NULL, '2024-05-17 09:37:20.064', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_officeId_fkey` (`officeId`);

--
-- Indexes for table `office`
--
ALTER TABLE `office`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_departmentId_fkey` (`departmentId`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Tickets_departmentId_fkey` (`departmentId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_officeId_fkey` (`officeId`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `office`
--
ALTER TABLE `office`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_officeId_fkey` FOREIGN KEY (`officeId`) REFERENCES `office` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `Tickets_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_officeId_fkey` FOREIGN KEY (`officeId`) REFERENCES `office` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
