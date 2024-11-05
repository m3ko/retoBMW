<?php
namespace Model;
require_once 'Conexion.php';   
class modeloCoches extends Conexion
{

    public function getModelos()
    {


        $resultado = $this->getCon()->query("SELECT nombre_modelo,precio_base,imagen_url FROM modelo");
        $modelos = [];

        while ($fila = $resultado->fetch_assoc()) {

            $modelos[] = $fila;

        }
       header("Content-Type: application/json");
       echo json_encode($modelos);



    }
    public function getSerie1() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW Serie 1'");
        $serie1 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $serie1[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($serie1);
    }
    
    public function getSerie2() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW Serie 2'");
        $serie2 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $serie2[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($serie2);
    }
    
    public function getSerie3() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW Serie 3'");
        $serie3 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $serie3[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($serie3);
    }
    
    public function getSerie4() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW Serie 4'");
        $serie4 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $serie4[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($serie4);
    }
    
    public function getSerie5() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW Serie 5'");
        $serie5 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $serie5[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($serie5);
    }
    
    public function getSerie6() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW Serie 6'");
        $serie6 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $serie6[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($serie6);
    }
    
    public function getSerie7() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW Serie 7'");
        $serie7 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $serie7[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($serie7);
    }
    
    public function getSerie8() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW Serie 8'");
        $serie8 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $serie8[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($serie8);
    }
    public function getX1() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW X1'");
        $x1 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $x1[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($x1);
    }
    
    public function getX3() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW X3'");
        $x3 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $x3[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($x3);
    }
    
    public function getX5() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW X5'");
        $x5 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $x5[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($x5);
    }
    
    public function getX6() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW X6'");
        $x6 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $x6[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($x6);
    }
    
    public function getZ4() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW Z4'");
        $z4 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $z4[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($z4);
    }
    
    public function getI3() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW i3'");
        $i3 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $i3[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($i3);
    }
    
    public function getI8() {
        $resultado = $this->getCon()->query("SELECT nombre_modelo, precio_base, imagen_url FROM modelo WHERE nombre_modelo = 'BMW i8'");
        $i8 = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $i8[] = $fila;
        }
    
        header("Content-Type: application/json");
        echo json_encode($i8);
    }
    
}    