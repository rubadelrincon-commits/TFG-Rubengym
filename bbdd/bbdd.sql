CREATE DATABASE  IF NOT EXISTS `fitzone` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fitzone`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fitzone
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `rol` enum('ROLE_ADMIN','ROLE_CLIENTE') NOT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (48,'anual3234','anual23@gmail.com','$2a$10$VcPfXWXSfUXZBeY38jyeNOvYdCuop7bV2WZHItMu8ryXkQtpXCQYa',NULL,'ROLE_ADMIN','2025-04-27 15:47:16'),(49,'holaklkdsfsdfeegasdadasd','anual11@gmail.com','$2a$10$rSU.B2G/EIJOOhKDrg2WBuoAu8L45/x/0EuwzSkGQZ4ACmq6jetuG',NULL,'ROLE_ADMIN','2025-04-27 15:53:21'),(56,'v','v@gmail.com','$2a$10$pDf64rhlhhcqrbmejLfAV.bebP1Xll.MGP/ArKJY8lqHK5V7i2dC6',NULL,'ROLE_ADMIN','2025-04-27 21:39:22'),(72,'pessi1 adf','pessi1@gmail.com','$2a$10$j4OU7OknPOrUCxJeFNR0xuNaywJDvHewERWzoTpK27mYXczzqgHHa',NULL,'ROLE_CLIENTE','2025-05-01 12:04:25'),(74,'p2epsi23','pepsi123@gmail.com','$2a$10$Si9FSqI0uU40p/6OwheEbeGBbq1HF0RDqIwFonT33YQErehJaoTCy',NULL,'ROLE_CLIENTE','2025-05-02 12:19:46'),(75,'anual12','anual1122123@gmail.com','$2a$10$S/6RdwyAEg4DMNMQbAi51uUv28fwluCjFcj/TGX6WuoWNPWiN3o1S',NULL,'ROLE_CLIENTE','2025-05-02 14:09:18'),(76,'bb','bbb23345@gmail.com','$2a$10$047BfGp.t8SE2CaZWTzRieacj71bEZyoakOTSNXSfQHQEfEkfaiQ2',NULL,'ROLE_CLIENTE','2025-05-02 16:31:33'),(78,'cambio','cambio@gmail.com','$2a$10$TUJO3jyz4gZyqPLEgDLNgO1ybKBMDeqfBmLtAHCYdKr40SAiwYTvm',NULL,'ROLE_CLIENTE','2025-05-02 17:25:28'),(79,'prueba','prueba1@gmail.com','$2a$10$IFI5MWSnppZhx8G6kc2fhuIgOEqMTRe2xPKCoMXMMXONEGdpdLVn.',NULL,'ROLE_CLIENTE','2025-06-05 17:42:56'),(80,'prueba2','prueba2@gmail.com','$2a$10$Txq0NB.FcGzFhcr82RaPtOlNWvgDTDMojTYCHvqp2pB4jI2pteHiK',NULL,'ROLE_CLIENTE','2025-06-05 18:35:23'),(81,'prueba3','prueba3@gmail.com','$2a$10$g5lCewhRQPCzO1x518dGDeCl9c4tb1d.oCDR1A2yi7oAskriZW8jO',NULL,'ROLE_CLIENTE','2025-06-05 18:42:45'),(82,'a','a@gmail.com','$2a$10$wGuST69I.4NAy0d72PG15OLR1kZdjZ4yKsjsE4VkqeH/jlauz8d6i',NULL,'ROLE_CLIENTE','2025-06-05 19:33:32'),(83,'b','b@gmail.com','$2a$10$WEG1SrSjZYhJTje1RiqlUO..okDrVZKFDVcMq6W0Q7P0gZKCtCgjG',NULL,'ROLE_CLIENTE','2025-06-05 19:41:18'),(84,'c','c@gmail.com','$2a$10$3hoDtJi97PISBUlYl3jUpu6AMKwB10LB2kgPu7pKXgAyMNszkQi6C',NULL,'ROLE_CLIENTE','2025-06-05 20:07:13');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'fitzone'
--

--
-- Dumping routines for database 'fitzone'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-05 22:46:05
