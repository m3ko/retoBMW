<?php

require_once 'connect.php';
class ModeloCoches extends \Conectar
{

    public function getModelos()
    {


        $con = ModeloCoches::conexion();

        $resultado = $con->query('SELECT nombre_modelo FROM `modelo`;');
        $modelos = [];

        while ($fila = $resultado->fetch_assoc()) {

            $modelos[] = $fila;

        }
        return $modelos;



    }

    public function getNomProdFinal()
    {

        $con = ModeloCoches::conexion();
        $resultado = $con->query('SELECT 
    pf.id_producto_final, 
    m.nombre_modelo AS modelo, 
    mo.nombre_motor AS motor, 
    s.nombre_suspension AS suspension, 
    k.nombre_kit AS kit_aerodinamico, 
    l.nombre_llanta AS llanta, 
    f.tipo AS freno, 
    pf.nombre_producto, 
    pf.precio_total, 
    pf.cantidad,         -- Nueva columna para la cantidad
    pf.img               -- Nueva columna para el link de la imagen
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
    freno f ON pf.id_freno = f.id_freno;
');
        $nomProdFinales = [];
        // id_producto_final	
        // modelo	
        // motor	
        // suspension	
        // kit_aerodinamico	
        // llanta	
        // freno	
        // nombre_producto	
        // precio_total
        // cantidad
        //img
        while ($fila = $resultado->fetch_assoc()) {

            $nomProdFinales[] = $fila;
        }
        return $nomProdFinales;


    }

    public function getFrenos()
    {


        $con = ModeloCoches::conexion();

        $resultado = $con->query('SELECT nombre_modelo FROM `modelo`;');
        $modelos = [];

        while ($fila = $resultado->fetch_assoc()) {

            $modelos[] = $fila;

        }
        return $modelos;



    }



}


?>