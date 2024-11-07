<?php
namespace Model;
require_once 'Conexion.php';   
class modeloCoches extends Conexion
{

    public function getModelos()
    {


        $resultado = $this->getCon()->query("SELECT * FROM modelo");
        $modelos = [];

        while ($fila = $resultado->fetch_assoc()) {

            $modelos[] = $fila;

        }
       header("Content-Type: application/json");
       echo json_encode($modelos);



    }
    public function getModelos_motor($idModelo)
    {
        // Preparar la consulta SQL con un marcador de posición
        $stmt = $this->getCon()->prepare("SELECT motor.* FROM motor JOIN modelo_motor_compatibilidad ON motor.id_motor = modelo_motor_compatibilidad.id_motor WHERE modelo_motor_compatibilidad.id_modelo = ?");
        
        // Vincular el parámetro
        $stmt->bind_param("i", $idModelo); // "i" indica que el parámetro es un número entero
        
        // Ejecutar la consulta
        $stmt->execute();
        
        // Obtener el resultado
        $resultado = $stmt->get_result();
        $motor = [];
        
        // Recorrer los resultados y almacenarlos en un array
        while ($fila = $resultado->fetch_assoc()) {
            $motor[] = $fila;
        }
        
        // Liberar recursos
        $stmt->close();
        
        // Asegurarse de que no haya salida previa y devolver el JSON
        // Establecer el encabezado Content-Type
        header("Content-Type: application/json");
        
        // Evitar cualquier salida previa o caracteres adicionales
        echo json_encode($motor);
        exit; // Evitar cualquier salida adicional después del JSON
    }
    public function getfrenos()
    {


        $resultado = $this->getCon()->query("SELECT * FROM freno");
        $frenos = [];

        while ($fila = $resultado->fetch_assoc()) {

            $frenos[] = $fila;

        }
       header("Content-Type: application/json");
       echo json_encode($frenos);



    }
    public function getllantas()
    {


        $resultado = $this->getCon()->query("SELECT * FROM llanta");
        $llanta = [];

        while ($fila = $resultado->fetch_assoc()) {

            $llanta[] = $fila;

        }
       header("Content-Type: application/json");
       echo json_encode($llanta);



    }
    public function getkits()
    {


        $resultado = $this->getCon()->query("SELECT * FROM kit_aerodinamico");
        $llanta = [];

        while ($fila = $resultado->fetch_assoc()) {

            $llanta[] = $fila;

        }
       header("Content-Type: application/json");
       echo json_encode($llanta);



    }
    public function getsuspension()
    {


        $resultado = $this->getCon()->query("SELECT * FROM suspension");
        $suspension = [];

        while ($fila = $resultado->fetch_assoc()) {

            $suspension[] = $fila;

        }
       header("Content-Type: application/json");
       echo json_encode($suspension);



    }

    
    
   
    
}    