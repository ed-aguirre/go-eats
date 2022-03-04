-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-02-2019 a las 20:18:01
-- Versión del servidor: 5.7.25-0ubuntu0.18.04.2
-- Versión de PHP: 7.0.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `comida`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineas`
--

CREATE TABLE `lineas` (
  `id` int(20) NOT NULL,
  `tipo` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `icono` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `lineas`
--

INSERT INTO `lineas` (`id`, `tipo`, `icono`) VALUES
(1, 'POLLO', 'egg'),
(2, 'POSTRE', 'ice-cream'),
(3, 'ENSALADA', 'nutrition'),
(4, 'OTROS', 'pizza'),
(5, 'CARNES', 'basket'),
(6, 'MARISCOS', 'boat');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes`
--

CREATE TABLE `ordenes` (
  `id` int(10) NOT NULL,
  `usuario_id` int(9) NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `ordenes`
--

INSERT INTO `ordenes` (`id`, `usuario_id`, `creado_en`, `status`) VALUES
(9, 3, '2018-07-02 15:22:11', 0),
(14, 1, '2019-01-03 02:43:18', 0),
(15, 1, '2019-01-03 02:44:08', 1),
(16, 1, '2019-01-03 02:53:04', 2),
(17, 1, '2019-01-03 04:36:49', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes_detalle`
--

CREATE TABLE `ordenes_detalle` (
  `id` int(11) NOT NULL,
  `orden_id` int(11) NOT NULL,
  `producto_id` varchar(20) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `ordenes_detalle`
--

INSERT INTO `ordenes_detalle` (`id`, `orden_id`, `producto_id`) VALUES
(22, 9, 'F_0'),
(23, 9, 'F_2'),
(24, 9, 'N_7'),
(32, 14, 'N_0'),
(33, 14, 'N_10'),
(34, 14, 'N_9'),
(35, 15, 'N_0'),
(36, 15, 'N_10'),
(37, 15, 'N_9'),
(38, 16, 'N_10'),
(39, 17, 'N_10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes`
--

CREATE TABLE `planes` (
  `id_plan` int(5) NOT NULL,
  `info` varchar(90) NOT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `nombre` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `planes`
--

INSERT INTO `planes` (`id_plan`, `info`, `precio`, `nombre`) VALUES
(1, 'Con el paquete de Bronce tendras la posibilad de ordenar un nutritivo platillo por día', '90.00', 'bronce'),
(2, 'Con el paquete de Plata tendras la posibilad de ordenar dos nutritivos platillos por día', '110.00', 'plata'),
(3, 'Con el paquete de Oro tendras la posibilad de ordenar tres nutritivos platillos por día', '130.00', 'oro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `por_tipo`
--

CREATE TABLE `por_tipo` (
  `id` int(5) NOT NULL,
  `por_tipo` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `por_tipo`
--

INSERT INTO `por_tipo` (`id`, `por_tipo`) VALUES
(1, 'DESAYUNOS'),
(2, 'COMIDAS'),
(3, 'CENAS'),
(4, 'POSTRES');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `codigo` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `por_tipo_id` int(8) NOT NULL,
  `nombre` varchar(70) COLLATE utf8_spanish_ci NOT NULL,
  `categoria` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `linea_id` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `grasas` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `lipidos` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `carbo` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `stock` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`codigo`, `por_tipo_id`, `nombre`, `categoria`, `linea_id`, `precio`, `grasas`, `lipidos`, `carbo`, `descripcion`, `stock`) VALUES
('F_0', 1, 'Pollo fit', 'pollo', 1, '150.00', '15%', '45%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('F_1', 1, 'Ensalada fit', 'ensalada', 3, '150.00', '15%', '45%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('F_2', 1, 'Mix fit', 'ensalada', 3, '150.00', '15%', '45%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('F_3', 1, 'Fit fit', 'pollo', 1, '150.00', '15%', '45%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('F_4', 1, 'Fajitas fit', 'pollo', 1, '150.00', '15%', '45%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('F_5', 2, 'Express fit', 'ensalada', 3, '150.00', '15%', '45%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('F_6', 2, 'Verduras fit', 'ensalada', 3, '150.00', '15%', '45%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('F_7', 2, 'Tazon fit', 'carne', 5, '150.00', '15%', '45%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('F_8', 2, 'Camarones fit', 'marisco', 6, '150.00', '15%', '45%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('F_9', 2, 'Carnes fit', 'carne', 5, '150.00', '15%', '45%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('N_0', 3, 'Sayonara', 'pollo', 1, '150.00', '47%', '23%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('N_1', 3, 'Bisteck', 'carne', 5, '150.00', '47%', '23%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('N_10', 4, 'Ice cream roll', 'postre', 2, '20.50', '50%', '25%', '25%', 'El helado a la plancha o I-Tim-Pad,también llamado Ice Roll o Ice Cream Roll es una técnica artesanal de elaboración de helado originaria de Tailandia, motivo por el que también es conocido popularmente como helado tailandés. Este postre es a menudo clasificado como una variante del helado frito o un plato similar a este,​ y ha empezado a ganar notoriedad y popularidad internacionalmente,sobre todo desde 2015.', 1),
('N_2', 3, 'Tacos', 'carne', 5, '150.00', '47%', '23%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('N_3', 3, 'Enchiladas', 'pollo', 1, '150.00', '47%', '23%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('N_4', 2, 'Pollo americano', 'pollo', 1, '150.00', '47%', '23%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('N_5', 2, 'Albóndigas', 'carne', 5, '150.00', '47%', '23%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('N_6', 2, 'Pozole', 'carne', 5, '150.00', '47%', '23%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('N_7', 4, 'Imposible', 'postre', 2, '150.00', '47%', '23%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('N_8', 2, 'Hamburguesa', 'comida rápida', 4, '150.00', '47%', '23%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1),
('N_9', 3, 'Macarrones', 'pastas', 4, '150.00', '47%', '23%', '68%', 'Asdasfadsavfgfagggafhdfhadffbafbdfbsfghfghrtsfhsghsfghsgfhsfghsthsthghrthdghdfghd', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_user`
--

CREATE TABLE `tb_user` (
  `id_user` int(8) NOT NULL,
  `nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `ap_P` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `ap_M` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `contra` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `ciudad` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `calle` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `colonia` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `numero` varchar(8) COLLATE utf8_spanish_ci NOT NULL,
  `cp` varchar(8) COLLATE utf8_spanish_ci NOT NULL,
  `FK_suscripcion` int(1) NOT NULL,
  `token` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `puntos` int(10) UNSIGNED DEFAULT NULL,
  `wallet` decimal(10,2) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_user`
--

INSERT INTO `tb_user` (`id_user`, `nombre`, `ap_P`, `ap_M`, `correo`, `contra`, `ciudad`, `calle`, `colonia`, `numero`, `cp`, `FK_suscripcion`, `token`, `puntos`, `wallet`) VALUES
(1, 'luis ed', 'aguirre', 'fuentes', 'luis@prueba.com', '123456', 'coatza', 'francisco', 'luis echeverria', '152', '96440', 3, '631723a65a755ab3f871a15a99e6ac07e1476300', 1, '9.50'),
(2, 'bryan', 'javier', 'chiz', 'bryan@nose.com', '456321', 'minatitlan', 'privada', 'santa fe', '32', '96445', 0, 'f4e09ec02df0c9497f26eb9775c11995504e7ae4', 0, '0.00'),
(3, 'isais', 'lopez', 'SANTIAGO', 'isa@inver.com', '123456', 'coatza', 'diamantes', 'victoria', '313', '96536', 2, 'cc801cfa7caee8557f99029b0359b2005eca8fd0', 0, '0.00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `lineas`
--
ALTER TABLE `lineas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ordenes_detalle`
--
ALTER TABLE `ordenes_detalle`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `planes`
--
ALTER TABLE `planes`
  ADD PRIMARY KEY (`id_plan`);

--
-- Indices de la tabla `por_tipo`
--
ALTER TABLE `por_tipo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `ordenes_detalle`
--
ALTER TABLE `ordenes_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `por_tipo`
--
ALTER TABLE `por_tipo`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id_user` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
