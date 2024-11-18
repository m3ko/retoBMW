<?php

require(__DIR__.'/connect.php');
require_once 'connect.php';

class modeloUsuarios extends \Conectar{

    public function existe($email){


        $con = modeloUsuarios::conexion();
        $query = $con -> prepare('SELECT * FROM usuario WHERE email = ?;');
        $query -> bind_param("s", $email);
        $resultado = $query->get_result();

        while($resultado->fetch_assoc()){

            $existeUsuario = true;
        }

        return $existeUsuario;


    }

    public function comprobarCredenciales($email, $contraseña){

        $con = modeloUsuarios::conexion();
        $query = $con -> prepare('SELECT * FROM `usuario` WHERE (email = "?") AND (contrasena = "?");');
        $query -> bind_param("ss", $email, $contraseña);
        $resultado = $query->get_result();

        while($fila = $resultado->fetch_assoc()){

            $concuerda = true;
        }

        return $concuerda;
    }
    


}



?>