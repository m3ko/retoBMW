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
    public function crearUsuario($username, $nombre, $apellido, $email, $contraseña, $direccion) {
        
        $con = modeloUsuarios::conexion();
    
    
        $insertQuery = $con->prepare('INSERT INTO usuario (usuario, nombre, apellidos, email, contrasena, direccion) VALUES (?, ?, ?, ?, ?, ?)');
    
      
        $insertQuery->bind_param("ssssss", $username, $nombre, $apellido, $email, $contrasena, $direccion);
    
   
        if ($insertQuery->execute()) {
            return true;  
        } else {
            return false; 
        }
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
    public function iniciar_sesion($email, $contraseña){
        $con = modeloUsuarios::conexion();
        
     
        $query = $con->prepare('SELECT email, contrasena FROM usuario WHERE email = ?');
        
       
        $query->bind_param("s", $email);
        $query->execute();
        
       
        $resultado = $query->get_result();
        $concuerda = false; 
    
       
        if ($fila = $resultado->fetch_assoc()) {
            if ($fila['contrasena'] === $contraseña) {
                $concuerda = true;
            }
        }
    
      
        $query->close();
        $con->close();
    
        return $concuerda;
    }
    
    public static function tienePermiso($email, $contraseña)
    {
       
        if ($email == "admin@admin" && $contraseña == "admin") {
            return true;
        }
        return false;
    }
    


}



?>