<?php

// Este código importa y requiere los archivos necesarios para el funcionamiento del controlador de usuarios



// Requiere el archivo que contiene la clase Conexion
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$usudel = $_GET['id_usuario'];
$con = new modeloAdmin();
$con->eliminarUsuario($usudel);


exit();
?>
