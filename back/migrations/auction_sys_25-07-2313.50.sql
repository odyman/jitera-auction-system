# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.1.38-MariaDB)
# Database: auction_sys
# Generation Time: 2023-07-25 06:50:01 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table bidhistory
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bidhistory`;

CREATE TABLE `bidhistory` (
  `bidID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `productID` int(11) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  `bidPrice` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`bidID`),
  KEY `productID` (`productID`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `bidhistory` WRITE;
/*!40000 ALTER TABLE `bidhistory` DISABLE KEYS */;

INSERT INTO `bidhistory` (`bidID`, `productID`, `userID`, `bidPrice`)
VALUES
	(1,1,1,2500.00),
	(2,2,2,300.00),
	(3,1,1,2501.50),
	(4,2,1,153.00),
	(5,1,2,2502.88),
	(6,3,1,120.00),
	(7,7,12,25.00),
	(8,7,12,28.00);

/*!40000 ALTER TABLE `bidhistory` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `productID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT '0.00',
  `userID` int(11) DEFAULT NULL,
  `publish` int(1) DEFAULT '1' COMMENT ' (1=draft, 2=publish)',
  `completed` int(1) DEFAULT '1' COMMENT ' (1=ongoing, 2=completed)',
  `duration` int(11) DEFAULT NULL,
  PRIMARY KEY (`productID`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`productID`, `name`, `price`, `userID`, `publish`, `completed`, `duration`)
VALUES
	(1,'Black Sneaker',250.00,1,1,1,1689605963),
	(2,'White Backpack',152.00,2,2,2,1689605964),
	(4,'Luminaire Giotto Headphones',252.00,1,2,1,1689605964),
	(5,'Red Hoodies',23.00,1,2,1,1689605964),
	(6,'Blue Hoodies',22.00,2,2,1,1689605964),
	(7,'Gray Hoodies',28.00,2,2,1,1689605964),
	(8,'Blue Backpack',52.00,1,2,1,1689605964),
	(9,'White Sneaker',70.00,1,2,2,1689605964),
	(10,'Apple Watch',390.00,2,2,1,1689615923),
	(11,'Beats Solo Headphone',125.00,1,2,1,1689605964),
	(12,'Apple Macbook Pro',1580.00,2,2,1,1689605964),
	(13,'Mi Band',254.00,1,1,1,1689605963),
	(14,'Strip Analog Watch',389.00,2,2,1,1689605964),
	(19,'DELL XPS 159510',2360.54,1,1,1,1689605963),
	(20,'Nokia 3110',126.00,1,2,1,1690135200),
	(22,'iMac 2022',2450.00,12,2,1,1690225200),
	(23,'Mac Mini 2012',1010.00,12,2,1,1690228800),
	(24,'Redmi Note',320.00,12,2,1,1690226400);

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `balance` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`userID`, `username`, `password`, `avatar`, `email`, `balance`)
VALUES
	(1,'admin','bb68b7232bb4fcba4cd6bd26b29b544f','/img/avatars/thumb-2.jpg','admin@support.com',687.00),
	(2,'thawk','bb68b7232bb4fcba4cd6bd26b29b544f','/img/avatars/thumb-1.jpg','thawk@jetira.com',0.00),
	(3,'odyman','bb68b7232bb4fcba4cd6bd26b29b544f','/img/avatars/thumb-1.jpg','odyman@example.com',180.00),
	(4,'jeremy','bb68b7232bb4fcba4cd6bd26b29b544f','/img/avatars/thumb-1.jpg','jeremy@example.com',0.00),
	(5,'yourname','bb68b7232bb4fcba4cd6bd26b29b544f','/img/avatars/thumb-1.jpg','email@example.com',0.00),
	(6,'johndoe','bb68b7232bb4fcba4cd6bd26b29b544f','/img/avatars/thumb-1.jpg','johndoe@example.com',0.00),
	(7,'leon','bb68b7232bb4fcba4cd6bd26b29b544f','/img/avatars/thumb-1.jpg','leon@leonhayes.com',0.00),
	(8,'silke','bb68b7232bb4fcba4cd6bd26b29b544f','/img/avatars/thumb-1.jpg','silke@leonhayes.com',0.00),
	(9,'annie','988b64ad585ecf5c0516c69a7e136232','/img/avatars/thumb-1.jpg','annie@sample.com',0.00),
	(10,'tom','988b64ad585ecf5c0516c69a7e136232','/img/avatars/thumb-1.jpg','tom@sample.com',0.00),
	(11,'yondu','988b64ad585ecf5c0516c69a7e136232','/img/avatars/thumb-1.jpg','yondu@sample.com',350.00),
	(12,'houry','988b64ad585ecf5c0516c69a7e136232','/img/avatars/thumb-1.jpg','houry@yahoo.com',1137.00);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
