<?php

// Este código importa y requiere los archivos necesarios para el funcionamiento del controlador de usuarios



// Requiere el archivo que contiene la clase Conexion
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$pedidodel = $_GET['id_pedido'];
$con = new modeloAdmin();
$con->eliminar_pedido($pedidodel);


exit();
?>
