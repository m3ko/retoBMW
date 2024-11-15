-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-11-2024 a las 11:29:31
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
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id_carrito` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_producto_final` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `precio_base` int(11) NOT NULL,
  `img` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modelo`
--

INSERT INTO `modelo` (`id_modelo`, `nombre_modelo`, `precio_base`, `img`) VALUES
(1, 'BMW Serie 1', 20000, 'https://www.bmw.es/content/dam/bmw/common/all-models/1-series/5-door/2024/navigation/bmw-1-series-modelfinder.png'),
(2, 'BMW Serie 2', 25000, 'https://prod.cosy.bmw.cloud/bmvis/cosySec?COSY-EU-100-2545J3qAHyFnz5cRoHSWRzMESDsVcRoH7QRzMESV59VMb3G6bUJ1rjGRPixrQbUoaFoGq0zdpbo6l38mrjGm7SErQbCUQMs2q0zSDUW8J13882q0zAanCbl382hhq0zkRNSQBL4QSW8zLAd8W8J1ExSnQNUMESQdoiuKUUqoQEdcNq0zkdHNqoQqRrjGr9ovUW8zWubtJqogqaJ2zl3ilUQt9cRScH8ZuMbnMdoPdyJGy53LtrQ%25r9YEAW8zWuEfbqogqaGQFl3ilU%2575cRScHzesMbnMdg70yJGy5iKErQ%25r9SDGW8zWunfGqogqaGs0l3ilUC7gcRScH4%25oMbnMdeziyJGy5QsnrQ%25r98R5W8zWuon%25qogqa3s7l3ilUUJ5cRScHHQ8MbnMdd8syJGy55snrQ%25r99oUW8zWuuaCqoQLds3%251UMESCJzVMb3Vq0zoaDHdl38vontCcYiYU8l38NrjGl3guUHqoQUyFnHm'),
(3, 'BMW Serie 3', 30000, 'https://mdm.n3rd.ca/storage/images/vehicles/2024/bmw/m3/437767/medium_exteriorGallery_2024-bmw-m3-berline-cs-1686072125.webp'),
(4, 'BMW Serie 4', 35000, 'https://prod.cosy.bmw.cloud/connext-bmw/cosySec?COSY-EU-100-7331c9Nv2Z7d5yKlHS9gwyljT5lkQM37fNw2M2CpLjSk%25S8QvsrGZIGtAlaptvX%25oKNHkJENmb4Ws86OG7c1QUD4IxxbZG%25I4Y%25E9CpL0FkP%25QJX2YIxZU2hilpRBqSrxlzK%25yoKG%25Ty8nvzTomvhv0v1SyX3242YfTQdjcjiR3azDxDL0dnkq8cnCzOALUx%25skIFJG8OQABKupUP8FeWS6GbSKMPVYp9gWhbNmQtiPo90yaAwbHi4Tnx99%25wc3O8Qiftxd9WMw178zi1htECUkwEP7slGAtW4CrXpF7MplZQ6KCJqXRaYWluEQ5nmPXf3agOybQ3ynvIT9aMlO2B3iK2RIjedwW%255BDMztPfjeqhk7bXHMLoAC9VAhJHFliNgou%25KXwM6HSfWQthX%25V1PaZILfNEbnR2V10s9O58oE4riIgUdscZwBvGkrxRte2FNZ857Mj2lRUgChD3A5GvloqVdgp2XHLDMv6jQ%25dJW2YDafzoajmqn1kUUDyLOEAwqqTJIsFevL3uBru5kJdSeZSUbuzVMRVrlSkNh5NbCVA0og02wNF4Hv4jB0Kc%252cx74Wxfjx7pcP81D8CjxbZsM%251EKzWNRxjuE3aJzMxQUdqf973NF1VgxNJ0%25lJ2oubJR1EsHWpe05tE6RJei0Zq4gpnjTrBzcMfCV81ekFKdnuUswTYB1v'),
(5, 'BMW Serie 5', 40000, 'https://motork.com/media/2024/06/k12-3.png'),
(6, 'BMW Serie 6', 45000, 'https://avantirenting.es/wp-content/uploads/2023/01/BMW-Serie-8-840d-xDrive-M-Sport-sin-fondo-principal-avanti.png'),
(7, 'BMW Serie 7', 50000, 'https://i0.wp.com/macote.fr/wp-content/uploads/2024/01/BMW-SERIE-7-G70-BLACK-NO-BACKGROUND.png?fit=890%2C501&ssl=1'),
(8, 'BMW Serie 8', 55000, 'https://images.dealer.com/ddc/vehicles/2024/BMW/M8%20Gran%20Coupe/Sedan/color/Aventurin%20Red%20Metallic-C57-70,22,29-640-en_US.jpg'),
(9, 'BMW X1', 30000, 'https://cdn.bymycar.eu/es-bo/assets/images/vehicles/vn/835735/65e9a8f7a8fec.png'),
(10, 'BMW X3', 35000, 'https://www.bmw.com.mx/content/dam/bmw/common/all-models/x-series/x3/2024/phev/navigation/bmw-x-series-x3-30e-xdrive.png.asset.1718691839329.png'),
(11, 'BMW X5', 45000, 'https://di-uploads-pod23.dealerinspire.com/bmwofowingsmills/uploads/2023/06/TRANSPARENT_cc_2024BMS220013_01_1280_475-1.png'),
(12, 'BMW X6', 60000, 'https://www.bmw.es/content/dam/bmw/common/all-models/m-series/x6m/2023/highlights/bmw-m-series-x6-m-gallery-image-impressionen-03_1920.jpg.asset.1675123934752.jpg'),
(13, 'BMW Z4', 28000, 'https://contenido.bmw.lurauto.com/recursos-web/modelos/BMW-Z4-2023/cosySec-3.webp       '),
(14, 'BMW i3', 35000, ''),
(15, 'BMW i8', 70000, 'https://www.real-luxury.es/media/tz_portfolio_plus/article/cache/noleggio-bmw-i8-37-8_o.png       ');

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
  `precio_total` int(11) DEFAULT NULL,
  `nombre_producto` varchar(255) DEFAULT NULL,
  `cantidad` int(11) DEFAULT 0,
  `img` text NOT NULL,
  `id_descuento` int(11) DEFAULT NULL,
  `precio_despues_descuento` decimal(10,2) DEFAULT NULL,
  `visibilidad` tinyint(1) GENERATED ALWAYS AS (if(`cantidad` > 0,1,0)) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_final`
--

INSERT INTO `producto_final` (`id_producto_final`, `id_modelo`, `id_motor`, `id_suspension`, `id_kit`, `id_llanta`, `id_freno`, `precio_total`, `nombre_producto`, `cantidad`, `img`, `id_descuento`, `precio_despues_descuento`) VALUES
(1, 1, 1, 2, 2, 1, 2, 25800, 'BMW Serie 1 115i', 36, 'https://www.bmw.es/content/dam/bmw/common/all-models/1-series/5-door/2024/navigation/bmw-1-series-modelfinder.png', NULL, 25800.00),
(2, 2, 2, 1, 1, 2, 1, 34200, 'BMW Serie 2 220i', 12, 'https://prod.cosy.bmw.cloud/bmvis/cosySec?COSY-EU-100-2545J3qAHyFnz5cRoHSWRzMESDsVcRoH7QRzMESV59VMb3G6bUJ1rjGRPixrQbUoaFoGq0zdpbo6l38mrjGm7SErQbCUQMs2q0zSDUW8J13882q0zAanCbl382hhq0zkRNSQBL4QSW8zLAd8W8J1ExSnQNUMESQdoiuKUUqoQEdcNq0zkdHNqoQqRrjGr9ovUW8zWubtJqogqaJ2zl3ilUQt9cRScH8ZuMbnMdoPdyJGy53LtrQ%25r9YEAW8zWuEfbqogqaGQFl3ilU%2575cRScHzesMbnMdg70yJGy5iKErQ%25r9SDGW8zWunfGqogqaGs0l3ilUC7gcRScH4%25oMbnMdeziyJGy5QsnrQ%25r98R5W8zWuon%25qogqa3s7l3ilUUJ5cRScHHQ8MbnMdd8syJGy55snrQ%25r99oUW8zWuuaCqoQLds3%251UMESCJzVMb3Vq0zoaDHdl38vontCcYiYU8l38NrjGl3guUHqoQUyFnHm', NULL, 34200.00),
(3, 3, 3, 3, 3, 3, 3, 44500, 'BMW Serie 3 330i Competition', 3, 'https://mdm.n3rd.ca/storage/images/vehicles/2024/bmw/m3/437767/medium_exteriorGallery_2024-bmw-m3-berline-cs-1686072125.webp', 1, 40050.00),
(4, 4, 4, 1, 1, 2, 1, 56200, 'BMW M4', 29, 'https://prod.cosy.bmw.cloud/connext-bmw/cosySec?COSY-EU-100-7331c9Nv2Z7d5yKlHS9gwyljT5lkQM37fNw2M2CpLjSk%25S8QvsrGZIGtAlaptvX%25oKNHkJENmb4Ws86OG7c1QUD4IxxbZG%25I4Y%25E9CpL0FkP%25QJX2YIxZU2hilpRBqSrxlzK%25yoKG%25Ty8nvzTomvhv0v1SyX3242YfTQdjcjiR3azDxDL0dnkq8cnCzOALUx%25skIFJG8OQABKupUP8FeWS6GbSKMPVYp9gWhbNmQtiPo90yaAwbHi4Tnx99%25wc3O8Qiftxd9WMw178zi1htECUkwEP7slGAtW4CrXpF7MplZQ6KCJqXRaYWluEQ5nmPXf3agOybQ3ynvIT9aMlO2B3iK2RIjedwW%255BDMztPfjeqhk7bXHMLoAC9VAhJHFliNgou%25KXwM6HSfWQthX%25V1PaZILfNEbnR2V10s9O58oE4riIgUdscZwBvGkrxRte2FNZ857Mj2lRUgChD3A5GvloqVdgp2XHLDMv6jQ%25dJW2YDafzoajmqn1kUUDyLOEAwqqTJIsFevL3uBru5kJdSeZSUbuzVMRVrlSkNh5NbCVA0og02wNF4Hv4jB0Kc%252cx74Wxfjx7pcP81D8CjxbZsM%251EKzWNRxjuE3aJzMxQUdqf973NF1VgxNJ0%25lJ2oubJR1EsHWpe05tE6RJei0Zq4gpnjTrBzcMfCV81ekFKdnuUswTYB1v', NULL, 56200.00),
(5, 5, 5, 2, 2, 1, 2, 48800, 'BMW Serie 5 520h', 36, 'https://motork.com/media/2024/06/k12-3.png', NULL, 48800.00),
(6, 6, 5, 3, 1, 3, 3, 58000, 'BMW Serie 6 620h', 44, 'https://avantirenting.es/wp-content/uploads/2023/01/BMW-Serie-8-840d-xDrive-M-Sport-sin-fondo-principal-avanti.png', NULL, 58000.00),
(7, 7, 6, 2, 2, 2, 2, 62000, 'BMW Serie 7 730d', 11, 'https://i0.wp.com/macote.fr/wp-content/uploads/2024/01/BMW-SERIE-7-G70-BLACK-NO-BACKGROUND.png?fit=890%2C501&ssl=1', NULL, 62000.00),
(8, 8, 4, 3, 3, 3, 3, 78500, 'BMW M8 Competition', 24, 'https://images.dealer.com/ddc/vehicles/2024/BMW/M8%20Gran%20Coupe/Sedan/color/Aventurin%20Red%20Metallic-C57-70,22,29-640-en_US.jpg', NULL, 78500.00),
(9, 9, 2, 1, 1, 1, 2, 38500, 'BMW X1 120i', 38, 'https://cdn.bymycar.eu/es-bo/assets/images/vehicles/vn/835735/65e9a8f7a8fec.png', NULL, 38500.00),
(10, 10, 3, 2, 2, 2, 1, 45500, 'BMW X3 330i', 16, 'https://www.bmw.com.mx/content/dam/bmw/common/all-models/x-series/x3/2024/phev/navigation/bmw-x-series-x3-30e-xdrive.png.asset.1718691839329.png', NULL, 45500.00),
(11, 11, 4, 3, 3, 3, 3, 68500, 'BMW X5 M Competition ', 18, 'https://di-uploads-pod23.dealerinspire.com/bmwofowingsmills/uploads/2023/06/TRANSPARENT_cc_2024BMS220013_01_1280_475-1.png', NULL, 68500.00),
(12, 12, 6, 1, 1, 1, 2, 73500, 'BMW X6 630d', 40, 'https://www.bmw.es/content/dam/bmw/common/all-models/m-series/x6m/2023/highlights/bmw-m-series-x6-m-gallery-image-impressionen-03_1920.jpg.asset.1675123934752.jpg', NULL, 73500.00),
(13, 13, 5, 2, 2, 2, 1, 37500, 'BMW Z4 420h', 46, 'https://contenido.bmw.lurauto.com/recursos-web/modelos/BMW-Z4-2023/cosySec-3.webp       ', NULL, 37500.00),
(15, 15, 4, 3, 3, 3, 3, 93500, 'BMW Mi8 Competition', 7, 'https://www.real-luxury.es/media/tz_portfolio_plus/article/cache/noleggio-bmw-i8-37-8_o.png       ', 1, 84150.00);

--
-- Disparadores `producto_final`
--
DELIMITER $$
CREATE TRIGGER `aplicar_descuento` BEFORE INSERT ON `producto_final` FOR EACH ROW BEGIN
    DECLARE descuento DECIMAL(10, 2);
    
    -- Calcular el precio con descuento si la cantidad es <= 10
    IF NEW.cantidad <= 10 THEN
        SET descuento = NEW.precio_total * 0.1;
        SET NEW.precio_despues_descuento = NEW.precio_total - descuento;
        SET NEW.id_descuento = 1; -- Puedes ajustar el id_descuento según el tipo de descuento que uses
    ELSE
        SET NEW.precio_despues_descuento = NEW.precio_total;
        SET NEW.id_descuento = NULL;
    END IF;
END
$$
DELIMITER ;

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
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_producto_final` (`id_producto_final`);

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
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT;

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
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`id_producto_final`) REFERENCES `producto_final` (`id_producto_final`) ON DELETE CASCADE;

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
