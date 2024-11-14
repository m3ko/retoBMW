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
    $query = $con->query("SELECT * FROM kit_aerodinamico ");

    $kit_aerodinamico = [];
    
    while($fila = $query->fetch_assoc()){
        $kit_aerodinamico[] = $fila;
        }
        header("Content-Type: application/json");
        echo json_encode($kit_aerodinamico);
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
    $query = $con->query("SELECT pf.id_producto_final, m.nombre_modelo AS nombre_modelo, mo.nombre_motor AS nombre_motor, s.nombre_suspension AS nombre_suspension, ll.nombre_llanta AS nombre_llanta, fr.tipo AS nombre_freno, pf.precio_total, pf.nombre_producto, pf.cantidad, pf.img 
    FROM producto_final pf 
    JOIN modelo m ON pf.id_modelo = m.id_modelo 
    JOIN motor mo ON pf.id_motor = mo.id_motor 
    JOIN suspension s ON pf.id_suspension = s.id_suspension 
    JOIN llanta ll ON pf.id_llanta = ll.id_llanta 
    JOIN freno fr ON pf.id_freno = fr.id_freno");

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
    $sentencia = $con->prepare("DELETE FROM pedido  WHERE id_pedido = ?");
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
public function eliminar_modelo($modelodel){
    $con = modeloAdmin::conexion();
    $sentencia = $con->prepare("DELETE FROM modelo  WHERE id_modelo = ?");
    $sentencia->bind_param("i", $modelodel);
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
    $stmt->bind_param("ssss", $suspension["nombre_suspension"], $suspension["tipo"], $suspension["precio"], $suspension["oferta"]);

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

public function crearpedido($pedido) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt = $con->prepare("INSERT INTO pedido (id_usuario, id_producto_final, fecha_pedido, direccion_entrega,id_codigo) 
                           VALUES (?, ?, ?, ?,?)");
    $stmt->bind_param("iisss",  $pedido["id_usuario"], $pedido["id_producto_final"], $pedido["fecha_pedido"], $pedido["direccion_entrega"], $pedido["id_codigo"]);

    if ($stmt->execute()) {
        echo "pedido creado con éxito";
    } else {
        echo "Error al crear pedido: " . $stmt->error;
    }

    $stmt->close();
}
public function crearkit($kit) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt = $con->prepare("INSERT INTO kit_aerodinamico ( nombre_kit, tipo, precio, oferta) 
                           VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssii",  $kit["nombre_kit"], $kit["tipo"], $kit["precio"], $kit["oferta"]);

    if ($stmt->execute()) {
        echo "kit creado con éxito";
    } else {
        echo "Error al crear la kit: " . $stmt->error;
    }

    $stmt->close();
}
public function crearfreno($freno) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt = $con->prepare("INSERT INTO freno (tipo, precio, oferta) 
                           VALUES (?, ?, ?)");
    $stmt->bind_param("sii",   $freno["tipo"], $freno["precio"], $freno["oferta"]);

    if ($stmt->execute()) {
        echo "freno creado con éxito";
    } else {
        echo "Error al crear el freno: " . $stmt->error;
    }

    $stmt->close();
}
public function creardescuento($descuento) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt = $con->prepare("INSERT INTO codigo_descuento (descuento_porcentaje,) 
                           VALUES (?)");
    $stmt->bind_param("i",   $descuento["descuento_porcentaje"],);

    if ($stmt->execute()) {
        echo "descuento creado con éxito";
    } else {
        echo "Error al crear el descuento: " . $stmt->error;
    }

    $stmt->close();
}
public function crearmodelo($modelo) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt = $con->prepare("INSERT INTO modelo (nombre_modelo, precio_base) 
                           VALUES (?, ?)");
    $stmt->bind_param("si",  $modelo["nombre_modelo"], $modelo["precio_base"]);

    if ($stmt->execute()) {
        echo "modelo creado con éxito";
    } else {
        echo "Error al crear la modelo: " . $stmt->error;
    }

    $stmt->close();
}

public function crearproducto_final($producto)
{
    // Obtener la conexión a la base de datos
    $con = $this->conexion();

    // Asegúrate de que las claves en el array coincidan con las columnas en la base de datos
    $query = "
        INSERT INTO producto_final 
        (id_modelo, id_motor, id_suspension, id_llanta, id_freno, precio_total, nombre_producto, cantidad, img)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ";

    // Preparar la consulta
    $stmt = $con->prepare($query);

    // Asignar los valores de los parámetros
    $stmt->bind_param("iiiiiisis", 
        $producto['id_modelo'], 
        $producto['id_motor'], 
        $producto['id_suspension'], 
        $producto['id_llanta'], 
        $producto['id_freno'], 
        $producto['precio_total'], 
        $producto['nombre_producto'], 
        $producto['cantidad'], 
        $producto['img']
    );

    // Ejecutar la consulta
    if ($stmt->execute()) {
        return true;
    } else {
        // Si hay un error, obtener más detalles
        throw new Exception("Error al insertar el producto: " . implode(", ", $stmt->errorInfo()));
    }
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
public function modificar_producto_final($producto_finalesmdf) {

    $con = $this->conexion(); 
    $stmt= $con->prepare("UPDATE producto_final SET  id_modelo = ?, id_motor = ?, id_suspension = ?, id_kit = ?, id_llanta = ?, id_freno = ?, precio_total = ? , nombre_producto = ?, cantidad = ?, img = ? WHERE id_producto_final = ?");
    $stmt->bind_param("iiiiiiisisi",$producto_finalesmdf["id_modelo"],$producto_finalesmdf["id_motor"],$producto_finalesmdf["id_suspension"],$producto_finalesmdf["id_kit"],$producto_finalesmdf["id_llanta"],$producto_finalesmdf["precio_total"],$producto_finalesmdf["nombre_producto"],$producto_finalesmdf["cantidad"],$producto_finalesmdf["img"],$producto_finalesmdf["id_producto_final"]);
    if ($stmt->execute()) {
        echo "motor creado con éxito";
    } else {
        echo "Error al crear el motor: " . $stmt->error;
    }
    $stmt->close();
}
public function modificar_pedidos($pedidosmodif) {

    $con = $this->conexion(); 
    $stmt= $con->prepare("UPDATE pedido SET   id_usuario = ?, id_producto_final = ?, fecha_pedido = ?, direccion_entrega = ?, id_codigo = ? WHERE id_pedido = ?");
    $stmt->bind_param("iisssi",   $pedidosmodif["id_usuario"], $pedidosmodif["id_producto_final"], $pedidosmodif["fecha_pedido"], $pedidosmodif["direccion_entrega"], $pedidosmodif["id_codigo"],$pedidosmodif["id_pedido"],);

    if ($stmt->execute()) {
        echo "pedidos creado con éxito";
    } else {
        echo "Error al crear el pedidos: " . $stmt->error;
    }
    $stmt->close();
}
public function modificar_motor($motorModifi) {

    $con = $this->conexion(); 
    $stmt= $con->prepare("UPDATE motor SET  nombre_motor = ?, caballos = ?, cilindrada = ?, precio = ?, combustion = ? WHERE id_motor = ?");
    $stmt->bind_param("siiisi",$motorModifi["nombre_motor"],$motorModifi["caballos"],$motorModifi["cilindrada"],$motorModifi["precio"],$motorModifi["combustion"],$motorModifi["id_motor"]);
    if ($stmt->execute()) {
        echo "motor creado con éxito";
    } else {
        echo "Error al crear el motor: " . $stmt->error;
    }
    $stmt->close();
}
public function modificar_modelos($modelomodifi) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt= $con->prepare("UPDATE modelo SET nombre_modelo = ?, precio_base = ?  WHERE id_modelo = ?");
    $stmt->bind_param("sii",  $modelomodifi["nombre_modelo"], $modelomodifi["precio_base"], $modelomodifi["id_modelo"]);

    if ($stmt->execute()) {
        echo "modelo creado con éxito";
    } else {
        echo "Error al crear la modelo: " . $stmt->error;
    }

    $stmt->close();
}


public function modificar_llantas($llantamodifi) {

    $con = $this->conexion(); 
    $stmt= $con->prepare("UPDATE llanta SET  nombre_llanta = ?, tipo = ?, precio = ?, oferta = ? WHERE id_llanta = ?");
    $stmt->bind_param("ssiii",$llantamodifi["nombre_llanta"],$llantamodifi["tipo"],$llantamodifi["precio"],$llantamodifi["oferta"],$llantamodifi["id_llanta"]);

    if ($stmt->execute()) {
        echo "llanta creado con éxito";
    } else {
        echo "Error al crear el llanta: " . $stmt->error;
    }
    $stmt->close();
}
public function modificar_kits($kitmdf) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt= $con->prepare("UPDATE kit_aerodinamico SET    nombre_kit = ?, tipo = ?, precio = ?, oferta = ?  WHERE id_kit = ?");
    $stmt->bind_param("ssiii",  $kitmdf["nombre_kit"], $kitmdf["tipo"], $kitmdf["precio"], $kitmdf["oferta"], $kitmdf["id_kit"]);

    if ($stmt->execute()) {
        echo "kit creado con éxito";
    } else {
        echo "Error al crear el kit: " . $stmt->error;
    }

    $stmt->close();
}
public function modificar_freno($frenomdf) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt= $con->prepare("UPDATE freno SET    tipo = ?, precio = ?, oferta = ?  WHERE id_freno = ?");
    $stmt->bind_param("siii", $frenomdf["tipo"], $frenomdf["precio"], $frenomdf["oferta"], $frenomdf["id_kit"]);

    if ($stmt->execute()) {
        echo "freno creado con éxito";
    } else {
        echo "Error al crear el freno: " . $stmt->error;
    }

    $stmt->close();
}



public function modificar_descuento($codigo_descuentomdf) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt= $con->prepare("UPDATE modelo SET    descuento_porcentaje = ?  WHERE id_codigo = ?");
    $stmt->bind_param("ii",  $codigo_descuentomdf["descuento_porcentaje"], $codigo_descuentomdf["id_codigo"]);

    if ($stmt->execute()) {
        echo "descuento creado con éxito";
    } else {
        echo "Error al crear el descuento: " . $stmt->error;
    }

    $stmt->close();
}
public function getMotores_nombre() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_motor, nombre_motor FROM motor");

    $motores_nombres = [];
    
    while($fila = $query->fetch_assoc()){
        $motores_nombres[] = array(
            'id_motor' => $fila['id_motor'],
            'nombre_motor' => $fila['nombre_motor']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($motores_nombres);
}

public function getSuspensiones_nombre() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_suspension, nombre_suspension FROM suspension");

    $suspensiones_nombres = [];
    
    while($fila = $query->fetch_assoc()){
        $suspensiones_nombres[] = array(
            'id_suspension' => $fila['id_suspension'],
            'nombre_suspension' => $fila['nombre_suspension']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($suspensiones_nombres);
}

public function getLlantas_nombre() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_llanta, nombre_llanta FROM llanta");

    $llantes_nombres = [];
    
    while($fila = $query->fetch_assoc()){
        $llantes_nombres[] = array(
            'id_llanta' => $fila['id_llanta'],
            'nombre_llanta' => $fila['nombre_llanta']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($llantes_nombres);
}

public function getFrenos_nombre() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_freno, tipo FROM freno");

    $frenos_nombres = [];
    
    while($fila = $query->fetch_assoc()){
        $frenos_nombres[] = array(
            'id_freno' => $fila['id_freno'],
            'tipo' => $fila['tipo']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($frenos_nombres);
}
public function getModelos_nombre() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_modelo, nombre_modelo FROM modelo");

    $modelos_nombres = [];
    
    while($fila = $query->fetch_assoc()){
        $modelos_nombres[] = array(
            'id_modelo' => $fila['id_modelo'],
            'nombre_modelo' => $fila['nombre_modelo']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($modelos_nombres);
}



}
?>