-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 192.168.1.102    Database: wechat
-- ------------------------------------------------------
-- Server version	5.5.29-log

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
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img_name` varchar(100) DEFAULT NULL,
  `img_url` varchar(300) NOT NULL,
  `group_id` int(11) DEFAULT '1',
  `material_id` varchar(100) DEFAULT NULL,
  `local_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (4,'d','d',12,NULL,NULL),(5,'e','e',NULL,NULL,NULL),(6,'hah','',NULL,NULL,NULL),(7,'你好啊','imgUrl',NULL,NULL,NULL),(9,'F:wechatwechatuploadsupload_cd31ea9e9074ebf69131579440271866.png','undefined',1,NULL,NULL),(10,'F:wechatwechatuploadsupload_b59b6e23570fa95ae40e0914ff780844.png','undefined',1,NULL,NULL),(11,'2017-04-17_000231.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdy3ia27CaOmH51lnKUz6cATSRWlJHYx2loxeFY9Ohk9LiclPbKmWb000iag/0',1,NULL,'F:wechatwechatuploadsupload_db6d34f6897d96ffa1b3c21469663818.png'),(12,'2017-04-17_000231.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdy3ia27CaOmH51lnKUz6cATSRWlJHYx2loxeFY9Ohk9LiclPbKmWb000iag/0',1,NULL,'F:wechatwechatuploadsupload_14cd0ddfddf10a1d69bbe59729dea94a.png'),(13,'2017-04-17_000553.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdycyr25cGF43ay5gDyRRBViblYkUI72JVG8G7nLrgPWqy3fGK2zrVb6NA/0',1,NULL,'F:wechatwechatuploadsupload_0ba385a7add65f43e80fb6b0f265f734.png'),(14,'2017-04-17_000553.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdycyr25cGF43ay5gDyRRBViblYkUI72JVG8G7nLrgPWqy3fGK2zrVb6NA/0',1,NULL,'F:wechatwechatuploadsupload_6bce9aaef9d12a63754a206256526aa2.png'),(15,'2017-04-17_000553.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdycyr25cGF43ay5gDyRRBViblYkUI72JVG8G7nLrgPWqy3fGK2zrVb6NA/0',1,NULL,'F:wechatwechatuploadsupload_12f38a99cae7f7c5e6b41fc1d037341b.png'),(16,'2017-04-16_232856.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdyzM3Ho9xwdFmUvSzDYHMFibvgM3ATYwdWNMtILhgEDf9QARHoxntwRUg/0',1,NULL,'F:wechatwechatuploadsupload_b66b652b6116056dd87802352c4e41cb.png'),(17,'2017-04-17_000553.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdycyr25cGF43ay5gDyRRBViblYkUI72JVG8G7nLrgPWqy3fGK2zrVb6NA/0',1,NULL,'F:wechatwechatuploadsupload_0c645e97604b61ccc83bfcae44dc9474.png'),(18,'2017-04-23_153903.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdyibQvS3J44VlzUV6YNhxmKG4HRYO5mia1LaBYzLib5uwjEEwqysAsZV42Q/0',1,NULL,'F:wechatwechatuploadsupload_5a5f80661a66a33f91376b5997a00de1.png'),(19,'2017-04-17_000553.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdycyr25cGF43ay5gDyRRBViblYkUI72JVG8G7nLrgPWqy3fGK2zrVb6NA/0',1,NULL,'F:wechatwechatuploadsupload_4b531885432090f08df53d5a5cf8e8a6.png'),(20,'2017-04-17_000553.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdycyr25cGF43ay5gDyRRBViblYkUI72JVG8G7nLrgPWqy3fGK2zrVb6NA/0',1,NULL,'F:wechatwechatuploadsupload_cfecb7dfe0834220559982f3f5643adb.png'),(21,'2017-04-17_000553.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdycyr25cGF43ay5gDyRRBViblYkUI72JVG8G7nLrgPWqy3fGK2zrVb6NA/0',1,NULL,'F:wechatwechatuploadsupload_9715f453f9dd73f9b8d4fb3b71d49a2f.png'),(22,'2017-04-17_000553.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdycyr25cGF43ay5gDyRRBViblYkUI72JVG8G7nLrgPWqy3fGK2zrVb6NA/0',1,NULL,'F:wechatwechatuploadsupload_3cb86da871164acfb35935f3d517fb9f.png'),(23,'2017-04-17_000553.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdycyr25cGF43ay5gDyRRBViblYkUI72JVG8G7nLrgPWqy3fGK2zrVb6NA/0',1,NULL,'F:wechatwechatuploadsupload_c16a8498cff4af19a9f4fa937f5fea69.png'),(24,'2017-04-17_000553.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdycyr25cGF43ay5gDyRRBViblYkUI72JVG8G7nLrgPWqy3fGK2zrVb6NA/0',1,NULL,'F:wechatwechatuploadsupload_f7e60a16d7278c4fb6d05a6dd905b119.png'),(25,'2017-04-17_000553.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdycyr25cGF43ay5gDyRRBViblYkUI72JVG8G7nLrgPWqy3fGK2zrVb6NA/0',1,NULL,'F:wechatwechatuploadsupload_c73956c3fc5531cec5636d817af2fe8e.png'),(26,'2017-04-17_000553.png','http://mmbiz.qpic.cn/mmbiz_png/WqexQeHKjNnicT6az9vQVdRnDI0I7fhdycyr25cGF43ay5gDyRRBViblYkUI72JVG8G7nLrgPWqy3fGK2zrVb6NA/0',1,NULL,'F:wechatwechatuploadsupload_75e52f61b5575b2fbb3d56f43c4c4c40.png');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-21 21:46:45
