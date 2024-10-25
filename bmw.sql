-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-10-2024 a las 13:30:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bmw`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigo_descuento`
--

CREATE TABLE `codigo_descuento` (
  `id_codigo` char(6) NOT NULL,
  `descuento_porcentaje` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `codigo_descuento`
--

INSERT INTO `codigo_descuento` (`id_codigo`, `descuento_porcentaje`) VALUES
('A1B2C3', 10),
('D4E5F6', 15),
('G7H8I9', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `freno`
--

CREATE TABLE `freno` (
  `id_freno` int(11) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `oferta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `freno`
--

INSERT INTO `freno` (`id_freno`, `tipo`, `precio`, `oferta`) VALUES
(1, 'Deportivo', 1500, NULL),
(2, 'Estándar', 1000, NULL),
(3, 'Cerámico', 2500, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kit_aerodinamico`
--

CREATE TABLE `kit_aerodinamico` (
  `id_kit` int(11) NOT NULL,
  `nombre_kit` varchar(50) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `oferta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `kit_aerodinamico`
--

INSERT INTO `kit_aerodinamico` (`id_kit`, `nombre_kit`, `tipo`, `precio`, `oferta`) VALUES
(1, 'M Sport', 'Deportivo', 2500, NULL),
(2, 'Estándar', 'Normal', 1200, NULL),
(3, 'High Performance', 'Deportivo avanzado', 3000, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `llanta`
--

CREATE TABLE `llanta` (
  `id_llanta` int(11) NOT NULL,
  `nombre_llanta` varchar(50) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `oferta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `llanta`
--

INSERT INTO `llanta` (`id_llanta`, `nombre_llanta`, `tipo`, `precio`, `oferta`) VALUES
(1, 'Radial', '18 pulgadas', 800, NULL),
(2, 'Deportiva', '19 pulgadas', 1000, 5),
(3, 'Aluminio', '20 pulgadas', 1200, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo`
--

CREATE TABLE `modelo` (
  `id_modelo` int(11) NOT NULL,
  `nombre_modelo` varchar(50) NOT NULL,
  `precio_base` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modelo`
--

INSERT INTO `modelo` (`id_modelo`, `nombre_modelo`, `precio_base`) VALUES
(1, 'BMW Serie 1', 20000),
(2, 'BMW Serie 2', 25000),
(3, 'BMW Serie 3', 30000),
(4, 'BMW Serie 4', 35000),
(5, 'BMW Serie 5', 40000),
(6, 'BMW Serie 6', 45000),
(7, 'BMW Serie 7', 50000),
(8, 'BMW Serie 8', 55000),
(9, 'BMW X1', 30000),
(10, 'BMW X3', 35000),
(11, 'BMW X5', 45000),
(12, 'BMW X6', 60000),
(13, 'BMW Z4', 28000),
(14, 'BMW i3', 35000),
(15, 'BMW i8', 70000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo_motor_compatibilidad`
--

CREATE TABLE `modelo_motor_compatibilidad` (
  `id_modelo` int(11) NOT NULL,
  `id_motor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modelo_motor_compatibilidad`
--

INSERT INTO `modelo_motor_compatibilidad` (`id_modelo`, `id_motor`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 5),
(7, 6),
(8, 4),
(9, 2),
(10, 3),
(11, 4),
(12, 6),
(13, 5),
(14, 1),
(15, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `motor`
--

CREATE TABLE `motor` (
  `id_motor` int(11) NOT NULL,
  `nombre_motor` varchar(50) NOT NULL,
  `caballos` int(11) DEFAULT NULL,
  `cilindrada` int(11) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `combustion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `motor`
--

INSERT INTO `motor` (`id_motor`, `nombre_motor`, `caballos`, `cilindrada`, `precio`, `combustion`) VALUES
(1, 'B38B15M0', 140, 1499, 2000, 'gasolina'),
(2, 'B48B20M0', 184, 1998, 3000, 'gasolina'),
(3, 'B58B30M0', 326, 2998, 6000, 'gasolina'),
(4, 'S63B44T4', 600, 4395, 15000, 'gasolina'),
(5, 'N20B20', 245, 1997, 5000, 'híbrido'),
(6, 'N55B30', 306, 2979, 8000, 'diesel');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_producto_final` int(11) DEFAULT NULL,
  `fecha_pedido` datetime NOT NULL,
  `direccion_entrega` varchar(100) DEFAULT NULL,
  `id_codigo` char(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `id_usuario`, `id_producto_final`, `fecha_pedido`, `direccion_entrega`, `id_codigo`) VALUES
(1, 1, 1, '2024-10-01 14:00:00', 'Calle 123, Ciudad', 'A1B2C3'),
(2, 2, 3, '2024-10-05 10:30:00', 'Calle 456, Ciudad', 'G7H8I9');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_final`
--

CREATE TABLE `producto_final` (
  `id_producto_final` int(11) NOT NULL,
  `id_modelo` int(11) DEFAULT NULL,
  `id_motor` int(11) DEFAULT NULL,
  `id_suspension` int(11) DEFAULT NULL,
  `id_kit` int(11) DEFAULT NULL,
  `id_llanta` int(11) DEFAULT NULL,
  `id_freno` int(11) DEFAULT NULL,
  `nombre_producto` varchar(50) NOT NULL,
  `precio_total` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_final`
--

INSERT INTO `producto_final` (`id_producto_final`, `id_modelo`, `id_motor`, `id_suspension`, `id_kit`, `id_llanta`, `id_freno`, `nombre_producto`, `precio_total`) VALUES
(1, 1, 1, 2, 2, 1, 2, 'BMW Serie 1 - Configuración 1', 25800),
(2, 2, 2, 1, 1, 2, 1, 'BMW Serie 2 - Configuración 1', 34200),
(3, 3, 3, 3, 3, 3, 3, 'BMW Serie 3 - Configuración 1', 44500),
(4, 4, 4, 1, 1, 2, 1, 'BMW Serie 4 - Configuración 1', 56200),
(5, 5, 5, 2, 2, 1, 2, 'BMW Serie 5 - Configuración 1', 48800),
(6, 6, 5, 3, 1, 3, 3, 'BMW Serie 6 - Configuración 1', 58000),
(7, 7, 6, 2, 2, 2, 2, 'BMW Serie 7 - Configuración 1', 62000),
(8, 8, 4, 3, 3, 3, 3, 'BMW Serie 8 - Configuración 1', 78500),
(9, 9, 2, 1, 1, 1, 2, 'BMW X1 - Configuración 1', 38500),
(10, 10, 3, 2, 2, 2, 1, 'BMW X3 - Configuración 1', 45500),
(11, 11, 4, 3, 3, 3, 3, 'BMW X5 - Configuración 1', 68500),
(12, 12, 6, 1, 1, 1, 2, 'BMW X6 - Configuración 1', 73500),
(13, 13, 5, 2, 2, 2, 1, 'BMW Z4 - Configuración 1', 37500),
(14, 14, 1, 2, 1, 1, 2, 'BMW i3 - Configuración 1', 42100),
(15, 15, 4, 3, 3, 3, 3, 'BMW i8 - Configuración 1', 93500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suspension`
--

CREATE TABLE `suspension` (
  `id_suspension` int(11) NOT NULL,
  `nombre_suspension` varchar(50) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `oferta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `suspension`
--

INSERT INTO `suspension` (`id_suspension`, `nombre_suspension`, `tipo`, `precio`, `oferta`) VALUES
(1, 'Deportiva', 'Adaptativa', 1200, 10),
(2, 'Confort', 'Estándar', 800, NULL),
(3, 'M Performance', 'Alta resistencia', 1800, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `rol` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellidos`, `usuario`, `contrasena`, `email`, `direccion`, `rol`) VALUES
(1, 'Juan', 'Pérez', 'jperez', 'hashedpassword123', 'jperez@example.com', 'Calle 123, Ciudad', 1),
(2, 'Ana', 'Gómez', 'agomez', 'hashedpassword456', 'agomez@example.com', 'Calle 456, Ciudad', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `codigo_descuento`
--
ALTER TABLE `codigo_descuento`
  ADD PRIMARY KEY (`id_codigo`);

--
-- Indices de la tabla `freno`
--
ALTER TABLE `freno`
  ADD PRIMARY KEY (`id_freno`);

--
-- Indices de la tabla `kit_aerodinamico`
--
ALTER TABLE `kit_aerodinamico`
  ADD PRIMARY KEY (`id_kit`);

--
-- Indices de la tabla `llanta`
--
ALTER TABLE `llanta`
  ADD PRIMARY KEY (`id_llanta`);

--
-- Indices de la tabla `modelo`
--
ALTER TABLE `modelo`
  ADD PRIMARY KEY (`id_modelo`);

--
-- Indices de la tabla `modelo_motor_compatibilidad`
--
ALTER TABLE `modelo_motor_compatibilidad`
  ADD PRIMARY KEY (`id_modelo`,`id_motor`),
  ADD KEY `id_motor` (`id_motor`);

--
-- Indices de la tabla `motor`
--
ALTER TABLE `motor`
  ADD PRIMARY KEY (`id_motor`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_producto_final` (`id_producto_final`),
  ADD KEY `fk_codigo_descuento` (`id_codigo`);

--
-- Indices de la tabla `producto_final`
--
ALTER TABLE `producto_final`
  ADD PRIMARY KEY (`id_producto_final`),
  ADD KEY `id_modelo` (`id_modelo`),
  ADD KEY `id_motor` (`id_motor`),
  ADD KEY `id_suspension` (`id_suspension`),
  ADD KEY `id_kit` (`id_kit`),
  ADD KEY `id_llanta` (`id_llanta`),
  ADD KEY `id_freno` (`id_freno`);

--
-- Indices de la tabla `suspension`
--
ALTER TABLE `suspension`
  ADD PRIMARY KEY (`id_suspension`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `freno`
--
ALTER TABLE `freno`
  MODIFY `id_freno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `kit_aerodinamico`
--
ALTER TABLE `kit_aerodinamico`
  MODIFY `id_kit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `llanta`
--
ALTER TABLE `llanta`
  MODIFY `id_llanta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `modelo`
--
ALTER TABLE `modelo`
  MODIFY `id_modelo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `motor`
--
ALTER TABLE `motor`
  MODIFY `id_motor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `producto_final`
--
ALTER TABLE `producto_final`
  MODIFY `id_producto_final` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `suspension`
--
ALTER TABLE `suspension`
  MODIFY `id_suspension` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `modelo_motor_compatibilidad`
--
ALTER TABLE `modelo_motor_compatibilidad`
  ADD CONSTRAINT `modelo_motor_compatibilidad_ibfk_1` FOREIGN KEY (`id_modelo`) REFERENCES `modelo` (`id_modelo`),
  ADD CONSTRAINT `modelo_motor_compatibilidad_ibfk_2` FOREIGN KEY (`id_motor`) REFERENCES `motor` (`id_motor`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_codigo_descuento` FOREIGN KEY (`id_codigo`) REFERENCES `codigo_descuento` (`id_codigo`),
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`id_producto_final`) REFERENCES `producto_final` (`id_producto_final`);

--
-- Filtros para la tabla `producto_final`
--
ALTER TABLE `producto_final`
  ADD CONSTRAINT `producto_final_ibfk_1` FOREIGN KEY (`id_modelo`) REFERENCES `modelo` (`id_modelo`),
  ADD CONSTRAINT `producto_final_ibfk_2` FOREIGN KEY (`id_motor`) REFERENCES `motor` (`id_motor`),
  ADD CONSTRAINT `producto_final_ibfk_3` FOREIGN KEY (`id_suspension`) REFERENCES `suspension` (`id_suspension`),
  ADD CONSTRAINT `producto_final_ibfk_4` FOREIGN KEY (`id_kit`) REFERENCES `kit_aerodinamico` (`id_kit`),
  ADD CONSTRAINT `producto_final_ibfk_5` FOREIGN KEY (`id_llanta`) REFERENCES `llanta` (`id_llanta`),
  ADD CONSTRAINT `producto_final_ibfk_6` FOREIGN KEY (`id_freno`) REFERENCES `freno` (`id_freno`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
