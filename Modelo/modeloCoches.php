<?php

require_once 'connect.php';
class ModeloCoches extends \Conectar
{

    public function getModelos()
    {


        $con = ModeloCoches::conexion();

        $resultado = $con->query('SELECT * FROM `modelo`;');
        $modelos = [];

        while ($fila = $resultado->fetch_assoc()) {

            $modelos[] = $fila;

        }
        return $modelos;
        



    }

    public function getNomProdFinal()
    {

        $con = ModeloCoches::conexion();
        $resultado = $con->query('SELECT pf.id_producto_final, m.nombre_modelo AS modelo, mo.nombre_motor AS motor, mo.caballos AS potencia, s.nombre_suspension AS suspension, k.nombre_kit AS kit_aerodinamico, l.nombre_llanta AS llanta, f.tipo AS freno, pf.nombre_producto, pf.precio_total, pf.cantidad, pf.img FROM producto_final pf JOIN modelo m ON pf.id_modelo = m.id_modelo JOIN motor mo ON pf.id_motor = mo.id_motor JOIN suspension s ON pf.id_suspension = s.id_suspension JOIN kit_aerodinamico k ON pf.id_kit = k.id_kit JOIN llanta l ON pf.id_llanta = l.id_llanta JOIN freno f ON pf.id_freno = f.id_freno ORDER BY m.nombre_modelo ASC;
');
        $nomProdFinales = [];
        // id_producto_final	
        // modelo	
        // motor
        // potencia	
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
        header("Content-Type: application/json");
        echo json_encode($nomProdFinales);

    }

    public function getFrenos()
    {


        $con = ModeloCoches::conexion();

        $resultado = $con->query('SELECT * FROM `freno`;');
        

        while ($fila = $resultado->fetch_assoc()) {

            $frenos[] = $fila;

        }
        return $frenos;



    }

    public function getMotores()
    {


        $con = ModeloCoches::conexion();

        $resultado = $con->query('SELECT * FROM `motor`;');
        $modelos = [];

        while ($fila = $resultado->fetch_assoc()) {

            $motores[] = $fila;

        }
        return $motores;



    }

    public function getSuspensiones()
    {


        $con = ModeloCoches::conexion();

        $resultado = $con->query('SELECT * FROM `suspension`;');
        $suspensiones = [];

        while ($fila = $resultado->fetch_assoc()) {

            $suspensiones[] = $fila;

        }
        return $suspensiones;



    }

    public function getLlantas()
    {


        $con = ModeloCoches::conexion();

        $resultado = $con->query('SELECT * FROM `llanta`;');
        $suspensiones = [];

        while ($fila = $resultado->fetch_assoc()) {

            $llantas[] = $fila;

        }
        return $llantas;



    }

    public function getKitAerodinamico()
    {


        $con = ModeloCoches::conexion();

        $resultado = $con->query('SELECT * FROM `kit_aerodinamico`;');
        $suspensiones = [];

        while ($fila = $resultado->fetch_assoc()) {

            $kitAerodinamicos[] = $fila;

        }
        return $kitAerodinamicos;



    }

    public function getModelosPorSerie($serie){

        $con = ModeloCoches::conexion();
        $resultado = $con->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW Serie 1'");
        $serie1 = [];

        while ($fila = $resultado->fetch_assoc()) {
            $serie1[] = $fila;
        }

        header("Content-Type: application/json");
        echo json_encode($serie1);

    }
    

}





?>