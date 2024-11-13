<?php

require(__DIR__.'/connect.php');
require_once 'connect.php';

class modeloAdmin extends \Conectar{


    public function comprobarCredenciales($email, $contraseña){

        $con = $this->conexion();
        $query = $con -> prepare('SELECT * FROM `usuario` WHERE (email = "?") AND (contrasena = "?");');
        $query -> bind_param("ss", $email, $contraseña);
        $resultado = $query->get_result();

        while($fila = $resultado->fetch_assoc()){

            $concuerda = true;
        }

        return $concuerda;
    }

    
    public static function tienePermiso($email, $contraseña)
    {
       
        if ($email == "admin@admin" && $contraseña == "admin") {
            return true;
        }
        return false;
    }

// SELECTS
public function getUsuarios(){
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT * FROM usuario");

    $usuarios = [];
    
    while($fila = $query->fetch_assoc()){
        $usuarios[] = $fila;
    }

    header("Content-Type: application/json");
    echo json_encode($usuarios);
}

public function getCodigo_descuento(){
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT * FROM codigo_descuento ");

    $codigo_descuento = [];
    
    while($fila = $query->fetch_assoc()){
        $codigo_descuento[] = $fila;
    }
    header("Content-Type: application/json");
    echo json_encode($codigo_descuento);
}
public function getfrenos(){
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT * FROM freno ");

    $freno = [];
    
    while($fila = $query->fetch_assoc()){
        $freno[] = $fila;
        }
        header("Content-Type: application/json");
        echo json_encode($freno);
}
public function getkit_aerodinamico(){
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT * FROM kit_areodinamico ");

    $kit_areodinamico = [];
    
    while($fila = $query->fetch_assoc()){
        $kit_areodinamico[] = $fila;
        }
        header("Content-Type: application/json");
        echo json_encode($kit_areodinamico);
}
public function getllantas(){
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT * FROM llanta ");

    $llantas = [];
    
    while($fila = $query->fetch_assoc()){
        $llantas[] = $fila;
        }
        header("Content-Type: application/json");
        echo json_encode($llantas);
}
public function getmodelos(){
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT * FROM modelo ");

    $modelos = [];
    
    while($fila = $query->fetch_assoc()){
        $modelos[] = $fila;
        }
        header("Content-Type: application/json");
        echo json_encode($modelos);
}
public function getmotores(){
    $con = modeloAdmin::conexion();
    $query =$con->query("SELECT * FROM motor ");

    $motores= [];
    
    while($fila = $query->fetch_assoc()){
        $motores[] = $fila;
        }
        header("Content-Type: application/json");
        echo json_encode($motores);
}
public function getpedidos(){
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT * FROM pedido ");

    $pedidos= [];
    
    while($fila = $query->fetch_assoc()){
        $pedidos[] = $fila;
        }
        header("Content-Type: application/json");
        echo json_encode($pedidos);
}
public function getproductos_finales(){
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT * FROM producto_final ");

    $producto_finales= [];
    
    while($fila = $query->fetch_assoc()){
        $producto_finales[] = $fila;
        }
        header("Content-Type: application/json");
        echo json_encode($producto_finales);
}
public function getsuspensiones(){
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT * FROM suspension ");

    $suspensiones= [];
    while($fila = $query->fetch_assoc()){
        $suspensiones[] = $fila;
        }
        header("Content-Type: application/json");
        echo json_encode($suspensiones);
}


//Eliminar
public function eliminarUsuario($usudel){
    $con = modeloAdmin::conexion();
    $sentencia = $con->prepare("DELETE FROM usuario WHERE id_usuario = ?");
    $sentencia->bind_param("i", $usudel);
    $sentencia->execute();
    $sentencia->close();

}


public function eliminar_descuento($descuentodel){
    $con = modeloAdmin::conexion();
    $sentencia = $this->getCon()->prepare("DELETE FROM codigo_descuento WHERE id_codigo = ?");
    $sentencia->bind_param("i", $descuentodel);
    $sentencia->execute();
    $sentencia->close();
    
}
        
public function eliminar_freno($frenodel){
    $con = modeloAdmin::conexion();
    $sentencia = $con->prepare("DELETE FROM freno WHERE id_freno = ?");
    $sentencia->bind_param("i", $frenodel);
    $sentencia->execute();
    $sentencia->close();
        
}
public function eliminar_kit($kit_del){
    $con = modeloAdmin::conexion();
    $sentencia = $con->prepare("DELETE FROM kit_aerodinamico  WHERE id_kit = ?");
    $sentencia->bind_param("i", $kit_del);
    $sentencia->execute();
    $sentencia->close();
            
}
public function eliminar_llanta($llantadel){
    $con = modeloAdmin::conexion();
    $sentencia = $con->prepare("DELETE FROM llanta  WHERE id_llanta = ?");
    $sentencia->bind_param("i", $llantadel);
    $sentencia->execute();
    $sentencia->close();
                
}
public function eliminar_motor($motordel){
    $con = modeloAdmin::conexion();
    $sentencia = $con->prepare("DELETE FROM motor  WHERE id_motor = ?");
    $sentencia->bind_param("i", $motordel);
    $sentencia->execute();
    $sentencia->close();
                   
}
public function eliminar_pedido($delpedidio){
    $con = modeloAdmin::conexion();
    $sentencia = $con->prepare("DELETE FROM motor  WHERE id_pedido = ?");
    $sentencia->bind_param("i", $delpedidio);
    $sentencia->execute();
    $sentencia->close();
                   
}
public function eliminar_producto_final($delpedidio_final){
    $con = modeloAdmin::conexion();
    $sentencia =$con->prepare("DELETE FROM producto_final  WHERE id_producto_final = ?");
    $sentencia->bind_param("i", $delpedidio_final);
    $sentencia->execute();
    $sentencia->close();
                   
}
public function eliminar_suspension($delsuspension){
    $con = modeloAdmin::conexion();
    $sentencia = $con->prepare("DELETE FROM suspension  WHERE id_suspension = ?");
    $sentencia->bind_param("i", $delsuspension);
    $sentencia->execute();
    $sentencia->close();
                   
}

//insert
public function crearUsuario($usuario) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt = $con->prepare("INSERT INTO usuario (nombre, apellidos, usuario, contrasena, email, direccion, rol) 
                           VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $usuario["nombre"], $usuario["apellidos"], $usuario["usuario"], 
                                    $usuario["contrasena"], $usuario["email"], $usuario["direccion"], $usuario["rol"]);

    if ($stmt->execute()) {
        echo "Usuario creado con éxito";
    } else {
        echo "Error al crear el usuario: " . $stmt->error;
    }

    $stmt->close();
}
public function crearSuspension($suspension) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt = $con->prepare("INSERT INTO suspension ( nombre_suspension, tipo, precio, oferta) 
                           VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $suspension["nombre_suspension"], $suspension["tipo"], $suspension["precio"], 
                                    $suspension["oferta"]);

    if ($stmt->execute()) {
        echo "Suspension creado con éxito";
    } else {
        echo "Error al crear el usuario: " . $stmt->error;
    }

    $stmt->close();
}
public function crearMotor($motor) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt = $con->prepare("INSERT INTO motor ( nombre_motor, caballos, cilindrada, precio, combustion) 
                           VALUES (?, ?, ?, ?,?)");
    $stmt->bind_param("siiis",  $motor["nombre_motor"], $motor["caballos"], $motor["cilindrada"], $motor["precio"], $motor["combustion"]);

    if ($stmt->execute()) {
        echo "Suspension creado con éxito";
    } else {
        echo "Error al crear el usuario: " . $stmt->error;
    }

    $stmt->close();
}
public function crearllanta($llanta) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt = $con->prepare("INSERT INTO llanta (nombre_llanta, tipo, precio, oferta) 
                           VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssii",  $llanta["nombre_llanta"], $llanta["tipo"], $llanta["precio"], $llanta["oferta"]);

    if ($stmt->execute()) {
        echo "llanta creada con éxito";
    } else {
        echo "Error al crear la llanta: " . $stmt->error;
    }

    $stmt->close();
}


//Modificar
public function modificar_usuario($usuario) {
    $con = $this->conexion(); 
    $stmt= $con->prepare("UPDATE usuario SET nombre = ?, apellidos = ?, usuario = ?, contrasena = ?, email = ?, direccion = ?, rol = ? WHERE id_usuario = ?");
    $stmt->bind_param("sssssssi", $usuario["nombre"], $usuario["apellidos"], $usuario["usuario"],$usuario["contrasena"],$usuario["email"],$usuario["direccion"],$usuario["rol"],$usuario["id_usuario"]);

    if ($stmt->execute()) {
        echo "Usuario creado con éxito";
    } else {
        echo "Error al crear el usuario: " . $stmt->error;
    }
    $stmt->close();
}

public function modificar_suspension($suspensionModifi) {
  

    $con = $this->conexion(); 
    $stmt= $con->prepare("UPDATE suspension SET  nombre_suspension = ?, tipo = ?, precio = ?, oferta = ? WHERE id_suspension = ?");
    $stmt->bind_param("ssiii",$suspensionModifi["nombre_suspension"],$suspensionModifi["tipo"],$suspensionModifi["precio"],$suspensionModifi["oferta"],$suspensionModifi["id_suspension"],);

    if ($stmt->execute()) {
        echo "suspension creado con éxito";
    } else {
        echo "Error al crear el suspension: " . $stmt->error;
    }
    $stmt->close();
}
public function modificar_motor($motorModifi) {

    $con = $this->conexion(); 
    $stmt= $con->prepare("UPDATE motor SET  nombre_motor = ?, caballos = ?, cilindrada = ?, precio = ?, combustion = ? WHERE id_motor = ?");
    $stmt->bind_param("siiisi",$motorModifi["nombre_motor"],$motorModifi["caballos"],$motorModifi["cilindrada"],$motorModifi["precio"],$motorModifi["combustion"],$motorModifi["id_motor"]);
    if ($stmt->execute()) {
        echo "suspension creado con éxito";
    } else {
        echo "Error al crear el suspension: " . $stmt->error;
    }
    $stmt->close();
}

public function modificar_llantas($llantamodifi) {

    $con = $this->conexion(); 
    $stmt= $con->prepare("UPDATE motor SET  nombre_motor = ?, caballos = ?, cilindrada = ?, precio = ?, combustion = ? WHERE id_motor = ?");
    $stmt->bind_param("siiisi",$motorModifi["nombre_motor"],$motorModifi["caballos"],$motorModifi["cilindrada"],$motorModifi["precio"],$motorModifi["combustion"],$motorModifi["id_motor"]);

    if ($stmt->execute()) {
        echo "suspension creado con éxito";
    } else {
        echo "Error al crear el suspension: " . $stmt->error;
    }
    $stmt->close();
}



}
?>