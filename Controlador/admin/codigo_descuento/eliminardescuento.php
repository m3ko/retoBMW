<?php

// Este código importa y requiere los archivos necesarios para el funcionamiento del controlador de usuarios



// Requiere el archivo que contiene la clase Conexion
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$desceuntodel = $_GET['id_codigo'];
$con = new modeloAdmin();
$con->eliminar_descuento($desceuntodel);


exit();
?>
