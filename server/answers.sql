-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2022 at 02:15 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `interactive_form`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `answer` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`answer`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `topic_id`, `answer`) VALUES
(1, 1, '[{\"id\":1,\"question\":\"What is your name ?\",\"inputType\":1,\"options\":{\"option1\":\"\",\"option2\":\"\",\"option3\":\"\",\"option4\":\"\"},\"answer\":\"sadman\"},{\"id\":2,\"question\":\"Tell me about yourself\",\"inputType\":2,\"options\":{\"option1\":\"\",\"option2\":\"\",\"option3\":\"\",\"option4\":\"\"},\"answer\":\"I am a noob software engineer\"},{\"id\":3,\"question\":\"Area/Location\",\"inputType\":3,\"options\":{\"option1\":\"Banani\",\"option2\":\"Gulshan\",\"option3\":\"Mirpur\",\"option4\":\"Motijheel\"},\"answer\":\"Mirpur\"},{\"id\":4,\"question\":\"Select your educational background\",\"inputType\":4,\"options\":{\"option1\":\"Science\",\"option2\":\"Commerce\",\"option3\":\"Arts\",\"option4\":\"Diploma\"},\"answer\":\"Science\"},{\"id\":5,\"question\":\"Select your hobby\",\"inputType\":5,\"options\":{\"option1\":\"Playing guitar\",\"option2\":\"Listening song\",\"option3\":\"Gardening\",\"option4\":\"None\"},\"answer\":\"Playing guitar,Listening song,\"},{\"id\":6,\"question\":\"Rate yourself out of 10\",\"inputType\":6,\"options\":{\"option1\":\"\",\"option2\":\"\",\"option3\":\"\",\"option4\":\"\"},\"answer\":\"9\"}]'),
(2, 2, '[{\"id\":1,\"question\":\"Choose one site that you prefer for online shopping\",\"inputType\":4,\"options\":{\"option1\":\"Daraz\",\"option2\":\"Evaly\",\"option3\":\"E Orange\",\"option4\":\"Alesha Mart\"},\"answer\":\"Daraz\"},{\"id\":2,\"question\":\"Choose the best site for IT products\",\"inputType\":4,\"options\":{\"option1\":\"Ryans Computer\",\"option2\":\"Smart BD\",\"option3\":\"Star Tech\",\"option4\":\"Techland\"},\"answer\":\"Ryans Computer\"},{\"id\":3,\"question\":\"Which media is best for breaking news ?\",\"inputType\":4,\"options\":{\"option1\":\"Somoy TV\",\"option2\":\"Jamuna TV\",\"option3\":\"Channel 24\",\"option4\":\"DBC News\"},\"answer\":\"Jamuna TV\"}]'),
(3, 3, '[{\"id\":1,\"question\":\"Describe your feelings\",\"inputType\":1,\"options\":{\"option1\":\"\",\"option2\":\"\",\"option3\":\"\",\"option4\":\"\"},\"answer\":\"Happy to design such thing\"},{\"id\":2,\"question\":\"What feature can be added ?\",\"inputType\":4,\"options\":{\"option1\":\"Search\",\"option2\":\"Flexible Options\",\"option3\":\"Deleting Options\",\"option4\":\"Nothing\"},\"answer\":\"Flexible Options\"},{\"id\":3,\"question\":\"Rate our service\",\"inputType\":6,\"options\":{\"option1\":\"\",\"option2\":\"\",\"option3\":\"\",\"option4\":\"\"},\"answer\":\"8\"}]'),
(4, 3, '[{\"id\":1,\"question\":\"Describe your feelings\",\"inputType\":1,\"options\":{\"option1\":\"\",\"option2\":\"\",\"option3\":\"\",\"option4\":\"\"},\"answer\":\"So happy\"},{\"id\":2,\"question\":\"What feature can be added ?\",\"inputType\":4,\"options\":{\"option1\":\"Search\",\"option2\":\"Flexible Options\",\"option3\":\"Deleting Options\",\"option4\":\"Nothing\"},\"answer\":\"Deleting Options\"},{\"id\":3,\"question\":\"Rate our service\",\"inputType\":6,\"options\":{\"option1\":\"\",\"option2\":\"\",\"option3\":\"\",\"option4\":\"\"},\"answer\":\"4\"}]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
