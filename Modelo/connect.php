<?php

class Conectar
{

    public static function conexion()
    {

        $conexion = new mysqli("localhost", "root", "", "bmw");
        if ($conexion->connect_error) {

            echo "fallo al conectar a la base de datos";
        }
        $conexion->query("SET NAMES 'utf8'");
        return $conexion;

    }
}


?>