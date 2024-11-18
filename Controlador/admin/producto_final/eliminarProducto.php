<?php

// Este código importa y requiere los archivos necesarios para el funcionamiento del controlador de usuarios



// Requiere el archivo que contiene la clase Conexion
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$productodel = $_GET['id_producto_final'];
$con = new modeloAdmin();
$con->eliminar_producto_final($productodel);


exit();
?>
