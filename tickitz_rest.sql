-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 28 Jan 2021 pada 11.14
-- Versi server: 8.0.22-0ubuntu0.20.04.3
-- Versi PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tickitz_rest`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cinemas`
--

CREATE TABLE `cinemas` (
  `id` int NOT NULL,
  `cinemaName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pricePerSeat` int NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `picture` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `cinemas`
--

INSERT INTO `cinemas` (`id`, `cinemaName`, `address`, `pricePerSeat`, `city`, `picture`, `createdAt`, `updatedAt`) VALUES
(1, 'Ebv.id', 'dimana aja', 40000, 'Surabaya', 'nodejs-1611683309808.png', '2021-01-26 17:48:29', NULL),
(2, 'Hiflix', 'dimana aja', 50000, 'Jakarta', 'Yashiro-1611683549901.jpg', '2021-01-26 17:52:29', '2021-01-27 07:02:28'),
(3, 'Cineone21', 'dimana aja', 40000, 'Jakarta', 'Yashiro-1611717806279.jpg', '2021-01-27 03:23:26', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `genres`
--

CREATE TABLE `genres` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `genres`
--

INSERT INTO `genres` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Action', '2021-01-24 20:04:07', NULL),
(2, 'Adventure', '2021-01-24 20:04:30', NULL),
(3, 'Cartoon', '2021-01-24 20:04:36', NULL),
(4, 'Horror', '2021-01-24 20:04:55', NULL),
(5, 'Drama', '2021-01-25 04:37:59', NULL),
(6, 'Thriller', '2021-01-25 04:38:26', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `moviegoers`
--

CREATE TABLE `moviegoers` (
  `id` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `moviegoers`
--

INSERT INTO `moviegoers` (`id`, `email`, `createdAt`, `updatedAt`) VALUES
(1, 'siapaaja01@gmail.com', '2021-01-25 14:38:39', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `movies`
--

CREATE TABLE `movies` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `releaseDate` date NOT NULL,
  `month` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `duration` int NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `director` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `casts` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `synopsis` text COLLATE utf8mb4_general_ci NOT NULL,
  `picture` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `movies`
--

INSERT INTO `movies` (`id`, `title`, `releaseDate`, `month`, `duration`, `category`, `director`, `casts`, `synopsis`, `picture`, `createdAt`, `updatedAt`) VALUES
(1, 'Koe no Katachi', '2021-06-10', 'June', 150, 'PG-13', 'Rizki Ramadhan', 'banyak, banget, siapa, aja, boleh', 'lorem ipsum dolor sit amet', 'nodejs-1611549566525.png', '2021-01-25 04:39:26', NULL),
(2, 'Spider-Man: Homecoming', '2021-06-10', 'January', 300, 'PG-13', 'Rizki Ramadhan', 'banyak, banget, siapa, aja, boleh', 'lorem ipsum dolor sit amet', 'nodejs-1611549674924.png', '2021-01-25 04:41:14', '2021-01-27 11:08:14'),
(4, 'Black Widow', '2021-06-10', 'June', 150, 'PG-13', 'Rizki Ramadhan', 'banyak, banget, siapa, aja, boleh', 'lorem ipsum dolor sit amet', 'blackwidow-1611630435081.jpg', '2021-01-26 03:07:15', NULL),
(5, 'Attack on Titan', '2021-06-10', 'June', 150, 'PG-13', 'Rizki Ramadhan', 'banyak, banget, siapa, aja, boleh', 'lorem ipsum dolor sit amet', 'blackwidow-1611630604557.jpg', '2021-01-26 03:10:04', NULL),
(6, 'Yakusoku no Neverland', '2021-06-10', 'June', 150, 'PG-13', 'Rizki Ramadhan', 'banyak, banget, siapa, aja, boleh', 'lorem ipsum dolor sit amet', 'blackwidow-1611751915160.jpg', '2021-01-27 12:51:55', NULL),
(7, 'Gintama', '2021-06-10', 'June', 150, 'PG-13', 'Rizki Ramadhan', 'banyak, banget, siapa, aja, boleh', 'lorem ipsum dolor sit amet', 'blackwidow-1611751993470.jpg', '2021-01-27 12:53:13', NULL),
(16, 'Re:Zero Kara Hajimeru Isekai Seikatsu', '2021-01-10', 'January', 150, 'PG-13', 'Rizki Ramadhan', 'banyak, banget, siapa, aja, boleh', 'lorem ipsum dolor sit amet', 'Yashiro-1611753002807.jpg', '2021-01-27 13:10:02', NULL),
(17, 'Naruto', '2021-01-10', 'January', 150, 'PG-13', 'Rizki Ramadhan', 'banyak, banget, siapa, aja, boleh', 'lorem ipsum dolor sit amet', 'Yashiro-1611758805298.jpg', '2021-01-27 14:46:45', NULL),
(23, 'Bleach', '2021-01-10', 'January', 150, 'PG-13', 'Rizki Ramadhan', 'banyak, banget, siapa, aja, boleh', 'lorem ipsum dolor sit amet', 'Yashiro-1611807021651.jpg', '2021-01-28 04:10:21', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `movie_genres`
--

CREATE TABLE `movie_genres` (
  `id` int NOT NULL,
  `genre_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `movie_genres`
--

INSERT INTO `movie_genres` (`id`, `genre_id`, `movie_id`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, '2021-01-25 04:39:26', NULL),
(2, 5, 1, '2021-01-25 04:39:26', NULL),
(3, 1, 2, '2021-01-25 04:41:14', NULL),
(4, 2, 2, '2021-01-25 04:41:14', NULL),
(7, 1, 4, '2021-01-26 03:07:15', NULL),
(8, 2, 4, '2021-01-26 03:07:15', NULL),
(9, 1, 5, '2021-01-26 03:10:04', NULL),
(10, 2, 5, '2021-01-26 03:10:04', NULL),
(11, 1, 6, '2021-01-27 12:51:55', NULL),
(12, 2, 6, '2021-01-27 12:51:55', NULL),
(13, 1, 7, '2021-01-27 12:53:13', NULL),
(14, 2, 7, '2021-01-27 12:53:13', NULL),
(31, 1, 16, '2021-01-27 13:10:02', NULL),
(32, 4, 16, '2021-01-27 13:10:02', NULL),
(33, 1, 17, '2021-01-27 14:46:45', NULL),
(34, 4, 17, '2021-01-27 14:46:45', NULL),
(45, 1, 23, '2021-01-28 04:10:21', NULL),
(46, 4, 23, '2021-01-28 04:10:21', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `showtimes`
--

CREATE TABLE `showtimes` (
  `id` int NOT NULL,
  `showTimeDate` date NOT NULL,
  `timeId` int NOT NULL,
  `cinemaId` int NOT NULL,
  `movieId` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `showtimes`
--

INSERT INTO `showtimes` (`id`, `showTimeDate`, `timeId`, `cinemaId`, `movieId`, `createdAt`, `updatedAt`) VALUES
(1, '2021-01-28', 3, 3, 4, '2021-01-27 08:52:23', NULL),
(2, '2021-01-28', 1, 3, 4, '2021-01-27 09:23:03', NULL),
(3, '2021-01-28', 2, 1, 4, '2021-01-27 10:23:18', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `sold_seats`
--

CREATE TABLE `sold_seats` (
  `id` int NOT NULL,
  `showTimeId` int NOT NULL,
  `seatCode` char(3) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `times`
--

CREATE TABLE `times` (
  `id` int NOT NULL,
  `showTime` time NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `times`
--

INSERT INTO `times` (`id`, `showTime`, `createdAt`, `updatedAt`) VALUES
(1, '07:30:00', '2021-01-27 08:16:18', NULL),
(2, '09:00:00', '2021-01-27 08:17:09', NULL),
(3, '10:15:00', '2021-01-27 08:17:35', NULL),
(4, '11:45:00', '2021-01-27 08:17:55', NULL),
(5, '14:00:00', '2021-01-27 08:18:11', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `ticketDate` date NOT NULL,
  `ticketTime` time NOT NULL,
  `movieTitle` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `cinemaName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `ticketCount` int NOT NULL,
  `seats` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `totalPayment` int NOT NULL,
  `paymentMethod` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'nophoto.jpg',
  `phone` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `loyaltyPoints` int NOT NULL DEFAULT '0',
  `role` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `verified` tinyint(1) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `picture`, `phone`, `loyaltyPoints`, `role`, `verified`, `createdAt`, `updatedAt`) VALUES
(1, 'Rizki', 'Ramadhan', 'rizukirimu@gmail.com', '$2b$08$Myh0UGNuLK7eRDgm3EzjgOg1EhYLDa9VbqJaaqrDA7jEEikWaZW0i', 'nophoto.jpg', NULL, 0, 'admin', 1, '2021-01-23 05:19:11', '2021-01-28 02:16:54'),
(12, NULL, NULL, 'seekloser@gmail.com', '$2b$10$ARFlP89GTHCzLjYQB2vtk.mkdR6i/m5aeSDu.L2juLfLaG/C4h/4K', 'nophoto.jpg', NULL, 0, 'user', 1, '2021-01-23 14:27:49', '2021-01-23 15:26:33'),
(13, NULL, NULL, 'rim261102@gmail.com', '$2b$10$rqdDnU33CHsD9okorca46uZxdnubbp2MSk1Tgb3BM0JezxV7CHbUG', 'nophoto.jpg', NULL, 0, 'user', 0, '2021-01-23 15:30:10', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cinemas`
--
ALTER TABLE `cinemas`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `moviegoers`
--
ALTER TABLE `moviegoers`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `movie_genres`
--
ALTER TABLE `movie_genres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre_id` (`genre_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indeks untuk tabel `showtimes`
--
ALTER TABLE `showtimes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `timeId` (`timeId`),
  ADD KEY `cinemaId` (`cinemaId`),
  ADD KEY `movieId` (`movieId`);

--
-- Indeks untuk tabel `sold_seats`
--
ALTER TABLE `sold_seats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `showTimeId` (`showTimeId`);

--
-- Indeks untuk tabel `times`
--
ALTER TABLE `times`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `cinemas`
--
ALTER TABLE `cinemas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `moviegoers`
--
ALTER TABLE `moviegoers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT untuk tabel `movie_genres`
--
ALTER TABLE `movie_genres`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT untuk tabel `showtimes`
--
ALTER TABLE `showtimes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `sold_seats`
--
ALTER TABLE `sold_seats`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `times`
--
ALTER TABLE `times`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `movie_genres`
--
ALTER TABLE `movie_genres`
  ADD CONSTRAINT `movie_genres_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movie_genres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `showtimes`
--
ALTER TABLE `showtimes`
  ADD CONSTRAINT `showtimes_ibfk_1` FOREIGN KEY (`timeId`) REFERENCES `times` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `showtimes_ibfk_2` FOREIGN KEY (`cinemaId`) REFERENCES `cinemas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `showtimes_ibfk_3` FOREIGN KEY (`movieId`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `sold_seats`
--
ALTER TABLE `sold_seats`
  ADD CONSTRAINT `sold_seats_ibfk_1` FOREIGN KEY (`showTimeId`) REFERENCES `showtimes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
