-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: LINUS_OSS
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `STT` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `IDFood` int NOT NULL,
  `Amount` int NOT NULL,
  `Price` int NOT NULL,
  `Total` int NOT NULL,
  PRIMARY KEY (`STT`),
  KEY `user` (`UserID`),
  KEY `food` (`IDFood`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`IDFood`) REFERENCES `food` (`IDFood`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user_table` (`IDUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `idBL` int NOT NULL AUTO_INCREMENT,
  `IDUser` int NOT NULL,
  `IDFood` int NOT NULL,
  `Date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Comment` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idBL`),
  KEY `IDUser` (`IDUser`,`IDFood`),
  KEY `IDFood` (`IDFood`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user_table` (`IDUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`IDFood`) REFERENCES `food` (`IDFood`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (5,18,1,'2024-10-03 17:28:36','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to '),(6,1,1,'2024-10-03 17:29:54',' when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially'),(7,18,2,'2024-10-03 17:41:53','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to '),(8,18,1,'2024-10-04 17:25:43','demo v2'),(9,18,15,'2024-10-17 23:16:42','Lorem ipsum odor amet, consectetuer adipiscing elit. Orci velit magnis habitasse, faucibus suspendisse class? Laoreet dis hac eros urna nam libero fringilla. Imperdiet lacus urna orci hac lorem sit duis phasellus. Sit imperdiet euismod netus inceptos semper curae; aliquet etiam. Bibendum netus viverra arcu felis amet. Feugiat vel ultricies accumsan vulputate sapien sapien augue.'),(10,18,6,'2024-10-17 23:49:35','demo'),(11,18,6,'2024-10-17 23:49:56','demo1'),(12,18,6,'2024-10-17 23:52:05','demo2'),(13,18,7,'2024-10-18 00:01:06','demo v1'),(14,18,7,'2024-10-18 00:04:55','Lorem ipsum odor amet, consectetuer adipiscing elit. Orci velit magnis habitasse, faucibus suspendisse class? Laoreet dis hac eros urna nam libero fringilla. Imperdiet lacus urna orci hac lorem sit duis phasellus. Sit imperdiet euismod netus inceptos semper curae; aliquet etiam. Bibendum netus viverra arcu felis amet. Feugiat vel ultricies accumsan vulputate sapien sapien augue.'),(15,18,7,'2024-10-18 00:08:17','aloo'),(16,1,10,'2024-10-18 13:30:20','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'),(17,1,8,'2024-10-19 23:13:39','hellllo');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `IDFood` int NOT NULL AUTO_INCREMENT,
  `Food` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `Price` int NOT NULL,
  `Amount` int NOT NULL DEFAULT '50',
  `TypeID` int NOT NULL,
  `img_src` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `info_Detail` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`IDFood`),
  UNIQUE KEY `food` (`Food`),
  KEY `TypeID` (`TypeID`),
  CONSTRAINT `food_ibfk_1` FOREIGN KEY (`TypeID`) REFERENCES `type_of_food` (`IDType`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (1,'Pear cake',20,43,2,'assets/imgs/gallary-1.jpg','<p><strong>Infomation:</strong></p><p>Pear cake is a delicious dessert made with fresh pears and a moist cake batter. It typically consists of sliced or diced pears mixed into the batter and baked until golden brown. The pears add a sweet and juicy flavor to the cake, making it a popular choice for those who enjoy fruity desserts. You can find various recipes for pear cake online, which may include additional ingredients such as spices, nuts, or a glaze. It\'s a delightful treat that can be enjoyed on its own or served with a dollop of whipped cream or a scoop of vanilla ice cream.</p><p><strong>Ingredients:</strong></p><ul><li>2 cups all-purpose flour</li><li>1 1/2 teaspoons baking powder</li><li>1/2 teaspoon baking soda</li><li>1/2 teaspoon salt</li><li>1/2 teaspoon ground cinnamon</li><li>1/4 teaspoon ground nutmeg</li><li>1/2 cup unsalted butter, softened</li><li>1 cup granulated sugar</li><li>2 large eggs</li><li>1 teaspoon vanilla extract</li><li>1/2 cup buttermilk</li><li>2 ripe pears, peeled, cored, and chopped<br><strong>Instructions:</strong></li></ul><ol><li>Preheat your oven to 350°F (175°C) and grease a 9-inch round cake pan.</li><li>In a medium bowl, whisk together the flour, baking powder, baking soda, salt, cinnamon, and nutmeg.</li><li>In a separate large bowl, cream together the softened butter and sugar until light and fluffy.</li><li>Beat in the eggs one at a time, then stir in the vanilla extract.</li><li>Gradually add the dry ingredient mixture to the butter mixture, alternating with the buttermilk. Mix until just combined.</li><li>Gently fold in the chopped pears.<br>Pour the batter into the prepared cake pan and smooth the top with a spatula.<br>Bake for about 40-45 minutes, or until a toothpick inserted into the center comes out clean.</li><li>Remove from the oven and let the cake cool in the pan for about 10 minutes before transferring it to a wire rack to cool completely.</li><li>Once cooled, you can dust the cake with powdered sugar or drizzle with a glaze if desired.<br>Slice and serve the pear cake as a delightful dessert.</li></ol>'),(2,'Salad nuts and berries',15,43,4,'assets/imgs/gallary-2.jpg','<p>Salad nuts and berries are popular ingredients in various types of salads. Here\'s some information about them:</p><ol><li>Salad: Salad refers to a dish made primarily of vegetables, fruits, or a combination of both. It is often served as an appetizer or side dish.</li><li>Nuts: Nuts are nutrient-dense foods that can add texture and flavor to salads. Common nuts used in salads include almonds, walnuts, pecans, and cashews. They provide healthy fats, protein, and various vitamins and minerals.</li><li>Berries: Berries are small, juicy fruits that are commonly used in salads for their vibrant colors and sweet-tart flavors. Examples of berries used in salads include strawberries, blueberries, raspberries, and blackberries. They are rich in antioxidants, fiber, and vitamins.</li></ol><p>When using salad nuts and berries, you can mix them with leafy greens, other vegetables, cheese, and dressings to create a delicious and nutritious salad. Feel free to experiment with different combinations to suit your taste preferences.</p>'),(3,'Fruit salad with cheese and ham',15,49,4,'assets/imgs/gallary-3.jpg','<p>Fruit salad with cheese and ham is a delicious and savory dish that combines the sweetness of fruits with the richness of cheese and ham. Here\'s some information about it:</p><p><strong>Ingredients:</strong></p><ul><li>Assorted fruits (such as apples, grapes, oranges, and pineapples)</li><li>Cheese (such as cheddar, Swiss, or feta)</li><li>Ham (cooked and diced)</li><li>Optional: Nuts (such as walnuts or almonds)</li><li>Optional: Dressing (such as honey mustard or balsamic vinaigrette)</li></ul><p><strong>Preparation:</strong></p><ol><li>Wash and prepare the fruits by cutting them into bite-sized pieces.</li><li>Cube or shred the cheese according to your preference.</li><li>Cook and dice the ham into small pieces.</li><li>If using nuts, chop them into smaller pieces.</li><li>In a large bowl, combine the fruits, cheese, ham, and nuts (if desired).</li><li>Toss everything together gently to mix well.</li><li>If desired, drizzle your preferred dressing over the salad and toss again.</li></ol>'),(4,'Guacamole',10,44,4,'assets/imgs/gallary-4.jpg','<p><strong>Ingredients:</strong></p><ul><li>Ripe avocados.</li><li>Lime or lemon juice.</li><li>Red onion, finely chopped.</li><li>Tomato, diced.</li><li>Fresh cilantro, chopped.</li><li>Jalapeno or serrano pepper, finely chopped (optional).</li><li>Salt and pepper to taste.</li><li>Garlic powder or minced garlic (optional).</li></ul><p><strong>Preparation:</strong></p><ol><li>Cut the avocados in half, remove the pit, and scoop out the flesh into a bowl.</li><li>Mash the avocados with a fork until desired consistency.</li><li>Add lime or lemon juice to prevent browning and enhance flavor.</li><li>Add the finely chopped red onion, diced tomato, chopped cilantro, and optional chopped jalapeno or serrano pepper.<br>Season with salt, pepper, and optional garlic powder or minced garlic.</li><li>Gently mix all the ingredients together until well combined.</li></ol>'),(5,'Beef steak',30,49,1,'assets/imgs/gallary-5.jpg','<p><strong>Preparation and Cooking:</strong></p><ul><li>Before cooking, it\'s important to let the steak come to room temperature for about 30 minutes to ensure even cooking.</li><li>Season the steak with salt, pepper, and any desired additional seasonings or marinades.</li><li>Cooking methods for steak include grilling, pan-searing, broiling, or sous vide.</li><li>The cooking time will depend on the thickness of the steak and the desired level of doneness (rare, medium-rare, medium, well-done).</li></ul><p><strong>Serving:</strong></p><ul><li>Once cooked, allow the steak to rest for a few minutes to retain its juices before slicing or serving.</li><li>Steak can be enjoyed as the main course alongside side dishes like roasted vegetables, mashed potatoes, or a fresh salad.</li><li>It can also be used in sandwiches, stir-fries, or sliced for salads.</li></ul>'),(6,'Blueberry cake',10,43,2,'assets/imgs/gallary-6.jpg','<ul><li>Blueberry cake is a delicious dessert that features the sweet and tart flavors of blueberries. Here are some details about it:<br>&nbsp;</li><li><strong>Ingredients:</strong> Flour, sugar, baking powder, salt, butter, eggs, milk, vanilla extract, blueberries.</li><li><strong>Preparation:</strong> Mix dry ingredients, cream butter and sugar, add eggs and vanilla extract, alternate adding dry ingredients and milk. Fold in blueberries. Bake in a preheated oven until golden brown.</li><li><strong>Serving:</strong> Allow the cake to cool before serving. Enjoy it as a dessert or a sweet treat.</li></ul>'),(7,'Avocado toast with poached egg',5,42,4,'assets/imgs/gallary-7.jpg','<ul><li>Avocado toast with poached egg is a popular and nutritious breakfast or brunch option. Here\'s some information about it:</li><li><strong>Ingredients:</strong> Bread, avocado, lemon juice, salt, pepper, poached egg.</li><li><strong>Preparation:</strong> Toast bread slices. Mash avocado with lemon juice, salt, and pepper. Spread avocado mixture on the toast. Top with a poached egg.</li><li><strong>Serving:</strong> Serve as a hearty breakfast or a light meal.</li></ul>'),(8,'Almond Pastry Cookies',5,41,2,'assets/imgs/gallary-8.jpg','<ul><li>Almond pastry cookies are delicious and nutty treats that can be enjoyed as snacks or desserts. Here\'s some information about them:</li><li><strong>Ingredients</strong>: Almond flour, sugar, butter, vanilla extract.</li><li><strong>Preparation</strong>: Mix almond flour and sugar. Cut in butter until crumbly. Add vanilla extract. Shape into cookies and bake until golden brown.</li><li><strong>Serving</strong>: Allow cookies to cool before serving. Enjoy them as a sweet treat with a cup of tea or coffee.</li></ul>'),(9,'Coconut Banana Pancakes ',10,50,2,'assets/imgs/gallary-9.jpg','<ul><li>Coconut banana pancakes are a delicious and tropical twist on traditional pancakes. Here are some details about them:</li><li><strong>Ingredients</strong>: Flour, baking powder, salt, sugar, coconut milk, mashed bananas, eggs, vanilla extract.</li><li><strong>Preparation</strong>: Mix dry ingredients, add coconut milk, mashed bananas, eggs, and vanilla extract. Stir until well combined. Cook pancakes on a griddle or skillet until golden brown.</li><li><strong>Serving</strong>: Serve the pancakes warm with toppings like sliced bananas, shredded coconut, or maple syrup.</li></ul>'),(10,'Grilled salmon',25,48,1,'assets/imgs/gallary-10.jpg','<ul><li>Grilled salmon is a delicious and healthy dish that can be enjoyed as a main course. Here are some details about it:</li><li><strong>Ingredients</strong>: Salmon fillets, olive oil, lemon juice, salt, pepper, herbs or spices (optional).</li><li><strong>Preparation</strong>: Preheat the grill. Brush salmon fillets with olive oil and season with lemon juice, salt, pepper, and optional herbs or spices. Grill the salmon until cooked through and slightly charred.</li><li><strong>Serving</strong>: Serve the grilled salmon with a side of roasted vegetables, rice, or a fresh salad.</li></ul>'),(11,'Foie gras',30,48,1,'assets/imgs/gallary-11.jpg','<ul><li>Foie gras is a luxury food made from the liver of a duck or goose. Here are some details about it:</li><li><strong>Preparation</strong>: Foie gras can be seared, pan-fried, or used in various gourmet recipes. It is known for its rich and buttery flavor.</li><li><strong>Serving</strong>: Foie gras is often served as an appetizer or part of a fine dining experience. It pairs well with brioche, fruit compote, or a sweet wine.</li></ul>'),(12,'Buffalo wings',25,49,1,'assets/imgs/gallary-12.jpg','<ul><li>Buffalo wings are a popular and flavorful appetizer. Here are some details about them:</li><li><strong>Ingredients</strong>: Chicken wings, hot sauce, butter, garlic powder, salt, pepper.</li><li><strong>Preparation</strong>: Preheat the oven. Bake the chicken wings until crispy. In a separate saucepan, melt butter and mix with hot sauce, garlic powder, salt, and pepper. Toss the baked wings in the sauce until coated.</li><li><strong>Serving</strong>: Serve the buffalo wings with celery sticks and blue cheese or ranch dressing for dipping. They make a great party snack or game-day treat.</li></ul>'),(13,'Strawberry smoothie',5,45,3,'assets/imgs/gallary-13.jpg','<ul><li>Strawberry smoothie is a classic and delightful drink. Here are some details about it:</li><li><strong>Ingredients</strong>: Strawberries, yogurt or milk, honey or sweetener (optional), ice cubes (optional).</li><li><strong>Preparation</strong>: Blend strawberries, yogurt or milk, honey or sweetener (if desired), and ice cubes (if desired) until smooth. Adjust the consistency and sweetness according to your preference.</li><li><strong>Serving</strong>: Enjoy the strawberry smoothie chilled as a tasty breakfast option or a delicious treat.</li></ul>'),(14,'Black berries smoothie',5,50,3,'assets/imgs/gallary-14.jpg','<ul><li>Blackberry smoothie is a refreshing and nutritious beverage. Here are some details about it:</li><li><strong>Ingredients</strong>: Blackberries, yogurt or milk, honey or sweetener (optional), ice cubes (optional).</li><li><strong>Preparation</strong>: Blend blackberries, yogurt or milk, honey or sweetener (if desired), and ice cubes (if desired) until smooth. Adjust the consistency and sweetness according to your preference.</li><li><strong>Serving</strong>: Serve the blackberry smoothie chilled as a healthy breakfast or a refreshing snack.</li></ul>'),(15,'Peanut smoothie',5,48,3,'assets/imgs/gallary-15.jpg','<ul><li>Peanut smoothie is a creamy and protein-packed beverage. Here are some details about it:</li><li><strong>Ingredients</strong>: Peanut butter, banana, milk (dairy or plant-based), honey or sweetener (optional), ice cubes (optional).</li><li><strong>Preparation</strong>: Blend peanut butter, banana, milk, honey or sweetener (if desired), and ice cubes (if desired) until smooth. Adjust the consistency and sweetness according to your preference.</li><li><strong>Serving</strong>: Enjoy the peanut smoothie as a satisfying breakfast option or a nutritious snack.</li></ul>'),(16,'Cappuccino coffee',7,40,3,'assets/imgs/gallary-16.jpg','<p>Cappuccino coffee is a popular espresso-based beverage. Here\'s some information about it:</p><ul><li>Cappuccino is made with equal parts of espresso, steamed milk, and milk foam.</li><li>The espresso is the base of the drink, providing a strong and rich flavor.</li><li>The steamed milk adds a creamy and smooth texture to the cappuccino.</li><li>The milk foam is added on top, creating a frothy layer that adds an extra touch to the presentation.<br>Cappuccinos are often served in a small cup, typically 6 ounces in size.</li><li>The drink can be enjoyed as is or with a sprinkle of cocoa powder or cinnamon on top for added flavor.</li></ul>');
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `general_info_order`
--

DROP TABLE IF EXISTS `general_info_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `general_info_order` (
  `IDOrder` int NOT NULL AUTO_INCREMENT,
  `IDUser` int NOT NULL,
  `Address` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `Date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Payment` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`IDOrder`),
  KEY `IDUser` (`IDUser`),
  CONSTRAINT `general_info_order_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user_table` (`IDUser`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `general_info_order`
--

LOCK TABLES `general_info_order` WRITE;
/*!40000 ALTER TABLE `general_info_order` DISABLE KEYS */;
INSERT INTO `general_info_order` VALUES (1,1,'470 Tran Dai Nghia','2024-10-03 14:28:34','Credit Card'),(2,1,'26 Huynh Van Nghe','2024-10-10 00:13:29','Cash'),(3,1,'Tran Dai Nghĩa 470','2024-10-20 20:06:37','Credit Card');
/*!40000 ALTER TABLE `general_info_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `STT` int NOT NULL AUTO_INCREMENT,
  `IDOrder` int NOT NULL,
  `IDFood` int NOT NULL,
  `Amount` int NOT NULL,
  `Price` int NOT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`STT`),
  KEY `IDOrder` (`IDOrder`),
  KEY `IDFood` (`IDFood`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`IDOrder`) REFERENCES `general_info_order` (`IDOrder`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`IDFood`) REFERENCES `food` (`IDFood`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,1,1,3,20,1),(2,1,2,4,15,1),(3,1,6,1,10,1),(4,2,9,1,10,0),(5,2,12,1,25,0),(6,2,1,1,20,0),(7,2,4,2,10,0),(8,2,3,1,15,0),(9,3,6,1,10,0),(10,3,9,1,10,0),(11,3,7,1,5,0);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_of_food`
--

DROP TABLE IF EXISTS `type_of_food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_of_food` (
  `IDType` int NOT NULL AUTO_INCREMENT,
  `Type` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`IDType`),
  UNIQUE KEY `Type` (`Type`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_of_food`
--

LOCK TABLES `type_of_food` WRITE;
/*!40000 ALTER TABLE `type_of_food` DISABLE KEYS */;
INSERT INTO `type_of_food` VALUES (2,'Cake'),(3,'Drink'),(1,'Main meal'),(4,'Others');
/*!40000 ALTER TABLE `type_of_food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_table` (
  `IDUser` int NOT NULL AUTO_INCREMENT,
  `User_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Mail` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `Phone` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `Pass` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci DEFAULT 'member',
  PRIMARY KEY (`IDUser`),
  UNIQUE KEY `user` (`User_name`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table`
--

LOCK TABLES `user_table` WRITE;
/*!40000 ALTER TABLE `user_table` DISABLE KEYS */;
INSERT INTO `user_table` VALUES (1,'Ánh Ly','melpmelp002@gmail.com','0123456789','1234','member'),(2,'Hoàng Việt','HoangViet@gmail.com','9876543210','1234','member'),(3,'Mai Li','Maily@gmail.com','6549873210','9874','member'),(4,'Gia Bảo','BaoNgo@gmail.com','0147258369','147258','member'),(5,'Linh Phương','LinhPg@gmail.com','0147283695','1236','member'),(7,'Mỹ Linh','MyLinhk@gmail.com','0321649871','1475','member'),(14,'Quỳnh Châu','ChauQuynh@gmail.com','0945880566','1234','member'),(15,'Trung Kiên','KienDang@gmail.com','9746123580','4567','member'),(17,'Mèo','dangloc2110@gmail.com','0945880566','44444','member'),(18,'phuong','Demo@gmail.com','0123556478','1234','member'),(19,'admin','Demo@gmail.com','0123556478','admin','admin'),(21,'string','string','string','string','member'),(22,'demo','Doe@gmail.com','123456789','demo','member');
/*!40000 ALTER TABLE `user_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-25 14:16:05
