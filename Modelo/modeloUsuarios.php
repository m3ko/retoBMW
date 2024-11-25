<?php

require(__DIR__.'/connect.php');
require_once 'connect.php';
session_start();
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
    
    public function getUsuarios($id) {
        $con = modeloUsuarios::conexion();
        $query = $con->prepare('SELECT * FROM usuario WHERE id_usuario = ?');
    
       
    
        $query->bind_param("i", $id);
        $executeResult = $query->execute();
    
    
        $resultado = $query->get_result();
        
    
    
        $usuarioSesion = [];
        while ($fila = $resultado->fetch_assoc()) {
            $usuarioSesion[] = $fila;
        }       
    
        return $usuarioSesion;
    }

    public function getCochesCarrito() {

        $id = $_SESSION['usuario_id'];
        $con = modeloUsuarios::conexion();
        $query = $con->prepare('SELECT 
    pf.id_producto_final, 
    m.nombre_modelo AS modelo, 
    mo.nombre_motor AS motor, 
    mo.caballos AS potencia, 
    s.nombre_suspension AS suspension, 
    k.nombre_kit AS kit_aerodinamico, 
    l.nombre_llanta AS llanta, 
    f.tipo AS freno, 
    pf.nombre_producto, -- Esta columna debe contener el nombre generado según las reglas
    pf.precio_total, 
    pf.cantidad, 
    pf.img,
    pf.id_descuento, -- Nueva columna
    pf.precio_despues_descuento, -- Nueva columna
    pf.visibilidad
FROM 
    producto_final pf
JOIN 
    modelo m ON pf.id_modelo = m.id_modelo
JOIN 
    motor mo ON pf.id_motor = mo.id_motor
JOIN 
    suspension s ON pf.id_suspension = s.id_suspension
JOIN 
    kit_aerodinamico k ON pf.id_kit = k.id_kit
JOIN 
    llanta l ON pf.id_llanta = l.id_llanta
JOIN 
    freno f ON pf.id_freno = f.id_freno
JOIN 
    carrito c ON pf.id_producto_final = c.id_producto_final -- Relación con la tabla de carrito
WHERE 
    c.id_usuario = ?');
    
       
    
        $query->bind_param("i", $id);
        $executeResult = $query->execute();
    
    
        $resultado = $query->get_result();
        
    
    
        $idCoches = [];
        while ($fila = $resultado->fetch_assoc()) {
            $idCoches[] = $fila;
        }       
    
        return $idCoches;
    }
}    

?>