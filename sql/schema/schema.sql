-- MySQL dump 10.13  Distrib 5.6.26, for osx10.10 (x86_64)
--
-- Host: localhost    Database: coupon
-- ------------------------------------------------------
-- Server version	5.6.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `coupon_list`
--

DROP TABLE IF EXISTS `coupon_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupon_list` (
  `CAPSULE_TEXT` varchar(20) DEFAULT NULL,
  `GENRE_NAME` varchar(50) DEFAULT NULL,
  `PRICE_RATE` int(11) DEFAULT NULL,
  `CATALOG_PRICE` int(11) DEFAULT NULL,
  `DISCOUNT_PRICE` int(11) DEFAULT NULL,
  `DISPFROM` date DEFAULT NULL,
  `DISPEND` date DEFAULT NULL,
  `DISPPERIOD` int(11) DEFAULT NULL,
  `VALIDFROM` date DEFAULT NULL,
  `VALIDEND` date DEFAULT NULL,
  `VALIDPERIOD` int(11) DEFAULT NULL,
  `USABLE_DATE_MON` char(1) DEFAULT NULL,
  `USABLE_DATE_TUE` char(1) DEFAULT NULL,
  `USABLE_DATE_WED` char(1) DEFAULT NULL,
  `USABLE_DATE_THU` char(1) DEFAULT NULL,
  `USABLE_DATE_FRI` char(1) DEFAULT NULL,
  `USABLE_DATE_SAT` char(1) DEFAULT NULL,
  `USABLE_DATE_SUN` char(1) DEFAULT NULL,
  `USABLE_DATE_HOLIDAY` char(1) DEFAULT NULL,
  `USABLE_DATE_BEFORE_HOLIDAY` char(1) DEFAULT NULL,
  `large_area_name` varchar(30) DEFAULT NULL,
  `key_name` varchar(8) DEFAULT NULL,
  `small_area_name` varchar(30) DEFAULT NULL,
  `COUPON_ID_hash` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `coupon_visit`
--

DROP TABLE IF EXISTS `coupon_visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupon_visit` (
  `id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_list`
--

DROP TABLE IF EXISTS `user_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_list` (
  `USER_ID_hash` varchar(32) DEFAULT NULL,
  `REG_DATE` date DEFAULT NULL,
  `SEX_ID` char(1) DEFAULT NULL,
  `AGE` int(11) DEFAULT NULL,
  `WITHDRAW_DATE` date DEFAULT NULL,
  `PREF_NAME` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-26  0:55:17
