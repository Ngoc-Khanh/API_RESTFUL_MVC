-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 09, 2024 lúc 12:37 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `api_resful_kytucxa`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `accounts`
--

CREATE TABLE `accounts` (
  `id_account` int(11) NOT NULL,
  `user_account` varchar(255) NOT NULL,
  `pass_account` varchar(255) NOT NULL,
  `type_account` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `accounts`
--

INSERT INTO `accounts` (`id_account`, `user_account`, `pass_account`, `type_account`) VALUES
(1, 'nguyenvana', 'password123', 'student'),
(2, 'tranthib', 'password4563', 'student'),
(3, 'phamdinhc', 'password789', 'student'),
(4, 'hoangthid', 'password101112', 'student'),
(5, 'levane', 'password131415', 'student'),
(6, 'admin', 'admin', 'student'),
(10, 'Khanh', '1', 'student'),
(13, 'ngockhanh', 'huyenhin', 'student');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
--

CREATE TABLE `hoadon` (
  `MaHD` int(11) NOT NULL,
  `MaPhong` varchar(255) NOT NULL,
  `Thang` int(11) NOT NULL,
  `TienDien` decimal(10,2) NOT NULL,
  `TienNuoc` decimal(10,2) NOT NULL,
  `TienMang` decimal(10,2) NOT NULL,
  `TinhTrang` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`MaHD`, `MaPhong`, `Thang`, `TienDien`, `TienNuoc`, `TienMang`, `TinhTrang`) VALUES
(1, '101', 1, 200000.00, 150000.00, 50000.00, 'Đã thanh toán'),
(3, '102', 1, 220000.00, 160000.00, 53000.00, 'Chưa thanh toán'),
(4, '102', 2, 230000.00, 165000.00, 54000.00, 'Đã thanh toán'),
(5, '201', 1, 240000.00, 170000.00, 55000.00, 'Đã thanh toán'),
(6, '202', 1, 10000.00, 10000.00, 10000.00, 'Đã thu'),
(7, '101', 3, 10000.00, 10000.00, 10000.00, 'Đã thu'),
(8, '101', 4, 10000.00, 10000.00, 10000.00, 'Chưa thu'),
(9, '102', 3, 10000.00, 10000.00, 10000.00, 'Chưa thu');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khu`
--

CREATE TABLE `khu` (
  `MaKhu` varchar(255) NOT NULL,
  `TenKhu` varchar(255) NOT NULL,
  `GioiTinh` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khu`
--

INSERT INTO `khu` (`MaKhu`, `TenKhu`, `GioiTinh`) VALUES
('A', 'Khu A', 'Nam'),
('B', 'Khu B', 'Nữ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phong`
--

CREATE TABLE `phong` (
  `MaPhong` varchar(255) NOT NULL,
  `MaKhu` varchar(255) NOT NULL,
  `SoNguoiToiDa` int(11) NOT NULL,
  `SoNguoiHienTai` int(11) NOT NULL,
  `Gia` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phong`
--

INSERT INTO `phong` (`MaPhong`, `MaKhu`, `SoNguoiToiDa`, `SoNguoiHienTai`, `Gia`) VALUES
('101', 'A', 2, 1, 1500000),
('102', 'A', 3, 2, 1800000),
('201', 'B', 2, 1, 1600000),
('202', 'B', 4, 3, 1900000),
('203', 'B', 5, 0, 200000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sinhvien`
--

CREATE TABLE `sinhvien` (
  `MaSV` varchar(11) NOT NULL,
  `HoTen` varchar(255) NOT NULL,
  `NgaySinh` varchar(255) NOT NULL,
  `GioiTinh` varchar(255) NOT NULL,
  `DiaChi` varchar(255) NOT NULL,
  `SDT` varchar(11) NOT NULL,
  `Mail` varchar(255) NOT NULL,
  `MaPhong` varchar(225) NOT NULL,
  `TenKhu` varchar(255) NOT NULL,
  `user_account` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sinhvien`
--

INSERT INTO `sinhvien` (`MaSV`, `HoTen`, `NgaySinh`, `GioiTinh`, `DiaChi`, `SDT`, `Mail`, `MaPhong`, `TenKhu`, `user_account`) VALUES
('SV11', 'lê văn e', '2024-04-15', 'Nữ', '111q@gmail.com', '09878788', '32424@gmail.com', '101', 'Khu B', 'levane'),
('SV12', 'như quỳnh', '2024-04-23', 'Nữ', 'quang ninh', '099087878', 'quynh@gmail.com', '101', 'Khu B', 'hoangthid'),
('SV2', 'Trần Thị B', '2024-04-16', 'Nam', '456 Đường XYZ', '24214883435', 'tranthib@gmail.com', '102', 'Khu A', 'tranthib'),
('SV3', 'Phạm Đình C', '2024-04-23', 'Nam', '789 Đường DEF', '0369852147', 'phamdinhc@gmail.com', '201', 'Khu B', 'phamdinhc'),
('SV5', 'hong khanh', '2024-04-10', 'Nữ', 'myetyrt', '9475749', 'dshfgh@gmail.com', '101', 'Khu B', 'Khanh');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id_account`),
  ADD UNIQUE KEY `user_account` (`user_account`);

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`MaHD`),
  ADD KEY `MaPhong` (`MaPhong`);

--
-- Chỉ mục cho bảng `khu`
--
ALTER TABLE `khu`
  ADD PRIMARY KEY (`MaKhu`);

--
-- Chỉ mục cho bảng `phong`
--
ALTER TABLE `phong`
  ADD PRIMARY KEY (`MaPhong`),
  ADD KEY `phong_ibfk_1` (`MaKhu`);

--
-- Chỉ mục cho bảng `sinhvien`
--
ALTER TABLE `sinhvien`
  ADD PRIMARY KEY (`MaSV`),
  ADD KEY `user_account` (`user_account`),
  ADD KEY `MaPhong` (`MaPhong`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id_account` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `MaHD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`MaPhong`) REFERENCES `phong` (`MaPhong`);

--
-- Các ràng buộc cho bảng `phong`
--
ALTER TABLE `phong`
  ADD CONSTRAINT `phong_ibfk_1` FOREIGN KEY (`MaKhu`) REFERENCES `khu` (`MaKhu`);

--
-- Các ràng buộc cho bảng `sinhvien`
--
ALTER TABLE `sinhvien`
  ADD CONSTRAINT `sinhvien_ibfk_1` FOREIGN KEY (`user_account`) REFERENCES `accounts` (`user_account`),
  ADD CONSTRAINT `sinhvien_ibfk_2` FOREIGN KEY (`MaPhong`) REFERENCES `phong` (`MaPhong`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
