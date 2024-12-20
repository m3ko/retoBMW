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
    public function comprobarvisibilidad_Producto($visibilidadcom) {
        $con = self::conexion();
        $sentencia = $con->prepare("SELECT visibilidad FROM producto_final WHERE id_producto_final = ?");
        
        if ($sentencia) {
            // Asociar parámetros y ejecutar la sentencia
            $sentencia->bind_param("i", $visibilidadcom['id_producto_final']);
            $sentencia->execute();
            $resultado = $sentencia->get_result();
    
            // Procesar resultados
            $visibilidad = [];
            while ($fila = $resultado->fetch_assoc()) {
                $visibilidad[] = array(
                    'visibilidad' => $fila['visibilidad']
                );
            }
    
            // Devolver resultado como JSON
            header("Content-Type: application/json");
            echo json_encode($visibilidad);
    
            // Cerrar sentencia
            $sentencia->close();
        } else {
            // Manejo de error si la sentencia no se prepara
            header("Content-Type: application/json");
            echo json_encode([
                "error" => "No se pudo preparar la consulta SQL"
            ]);
        }
    
        // Cerrar conexión
        $con->close();
    }
    public function visible($visible){
        $con = $this->conexion(); 
        $stmt= $con->prepare("UPDATE producto_final SET   visibilidad = ? WHERE id_producto_final = ?");
        $stmt->bind_param("ii",   $visible["visibilidad"],$visible["id_producto_final"]);
    
        if ($stmt->execute()) {
            echo "visble  con éxito";
        } else {
            echo "Error al crear el pedidos: " . $stmt->error;
        }
        $stmt->close();
    }

// SELECTS 
public function getCarritos(){
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT c.id_carrito, u.usuario, pf.nombre_producto FROM carrito c JOIN usuario u ON c.id_usuario = u.id_usuario JOIN producto_final pf ON c.id_producto_final = pf.id_producto_final;");

    $Carritos = [];
    
    while($fila = $query->fetch_assoc()){
        $Carritos[] = $fila;
    }

    header("Content-Type: application/json");
    echo json_encode($Carritos);
}
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
    $query = $con->query("SELECT id_pedido,u.usuario AS usuario, pf.nombre_producto AS nombre_producto,fecha_pedido,direccion_entrega, d.descuento_porcentaje AS descuento_porcentaje FROM pedido p 
    JOIN usuario u ON p.id_usuario = u.id_usuario 
    JOIN producto_final pf ON p.id_producto_final = pf.id_producto_final
    JOIN codigo_descuento d ON p.id_codigo = d.id_codigo ");

    $pedidos= [];
    
    while($fila = $query->fetch_assoc()){
        $pedidos[] = $fila;
        }
        header("Content-Type: application/json");
        echo json_encode($pedidos);
}
public function getproductos_finales(){
    $con = modeloAdmin::conexion();
    $query = $con->query("
      SELECT 
            pf.id_producto_final, 
            m.nombre_modelo AS nombre_modelo, 
            mo.nombre_motor AS nombre_motor, 
            s.nombre_suspension AS nombre_suspension, 
            k.nombre_kit AS nombre_kit, 
            ll.nombre_llanta AS nombre_llanta, 
            fr.tipo AS nombre_freno, 
            pf.nombre_producto, 
            pf.cantidad, 
            pf.img,
           
                pf.precio_total, 
                pf.precio_despues_descuento,
                id_descuento,visibilidad	
        FROM producto_final pf 
        JOIN modelo m ON pf.id_modelo = m.id_modelo 
        JOIN motor mo ON pf.id_motor = mo.id_motor 
        JOIN suspension s ON pf.id_suspension = s.id_suspension 
        JOIN kit_aerodinamico k ON pf.id_kit = k.id_kit 
        JOIN llanta ll ON pf.id_llanta = ll.id_llanta 
        JOIN freno fr ON pf.id_freno = fr.id_freno 
        ORDER BY pf.id_producto_final ASC;
    ");

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

// NO SE PUEDE ELIMINAR 
public function eliminar_descuento($descuentodel){
    $con = modeloAdmin::conexion();
    $sentencia = $con->prepare("DELETE FROM codigo_descuento WHERE id_codigo = ?");
    $sentencia->bind_param("s", $descuentodel);
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
public function eliminar_carrito($id_carritodel){
    $con = modeloAdmin::conexion();
    $sentencia = $con->prepare("DELETE FROM carrito  WHERE id_carrito = ?");
    $sentencia->bind_param("i", $id_carritodel);
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

    $stmt = $con->prepare("INSERT INTO codigo_descuento (id_codigo,descuento_porcentaje) 
                           VALUES (?,?)");
    $stmt->bind_param("si",   $descuento["id_codigo"],$descuento["descuento_porcentaje"]);

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
public function crearcarrito($crearcarrito) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt = $con->prepare("INSERT INTO carrito (id_usuario,id_producto_final) 
                           VALUES (?, ?)");
    $stmt->bind_param("ii",  $crearcarrito["id_usuario"], $crearcarrito["id_producto_final"]);

    if ($stmt->execute()) {
        echo "modelo creado con éxito";
    } else {
        echo "Error al crear la carrito: " . $stmt->error;
    }

    $stmt->close();
}

public function crearproducto_final($productocrear)
{
    // Obtener la conexión a la base de datos
    $con = $this->conexion();

    // Asegúrate de que las claves en el array coincidan con las columnas en la base de datos
    $query = "
        INSERT INTO producto_final 
        (id_modelo, id_motor, id_suspension, id_kit, id_llanta, id_freno, nombre_producto, cantidad, id_descuento, precio_total, img, precio_despues_descuento)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ";

    // Preparar la consulta
    $stmt = $con->prepare($query);

    // Asignar los valores de los parámetros
    $stmt->bind_param(
        "iiiiiisiiisi", 
        $productocrear['id_modelo'], 
        $productocrear['id_motor'], 
        $productocrear['id_suspension'], 
        $productocrear['id_kit'], 
        $productocrear['id_llanta'], 
        $productocrear['id_freno'], 
        $productocrear['nombre_producto'], 
        $productocrear['cantidad'], 
        $productocrear['id_descuento'], 
        $productocrear['precio_total'], 
        $productocrear['img'],
        $productocrear['precio_despues_descuento']
    );

    // Ejecutar la consulta
    if ($stmt->execute()) {
        return true;
    } else {
        // Si hay un error, obtener más detalles
        throw new Exception("Error al insertar el producto: " . $stmt->error);
    }
}





//Modificar

public function modificar_producto_final1($producto_finalesmdf1) {
    $con = $this->conexion(); 
    $stmt = $con->prepare("UPDATE producto_final SET id_modelo = ?, id_motor = ?, id_suspension = ?, id_kit = ?, id_llanta = ?, id_freno = ?, precio_total = ?, nombre_producto = ?, cantidad = ?, img = ?, precio_despues_descuento = ?,id_descuento =? WHERE id_producto_final = ?");
    $stmt->bind_param(
        "iiiiiiisisiii",
        $producto_finalesmdf1["id_modelo"],
        $producto_finalesmdf1["id_motor"],
        $producto_finalesmdf1["id_suspension"],
        $producto_finalesmdf1["id_kit"],
        $producto_finalesmdf1["id_llanta"],
        $producto_finalesmdf1["id_freno"],
        $producto_finalesmdf1["precio_total"],
        $producto_finalesmdf1["nombre_producto"],
        $producto_finalesmdf1["cantidad"],
        $producto_finalesmdf1["img"],
        $producto_finalesmdf1["precio_despues_descuento"],
        $producto_finalesmdf1["id_descuento"],
        $producto_finalesmdf1["id_producto_final"]
    );
    if ($stmt->execute()) {
        echo "Producto final modificado con éxito";
    } else {
        echo "Error al modificar el producto final: " . $stmt->error;
    }
    $stmt->close();
}
public function modificar_pedidos($pedidosmodif1) {

    $con = $this->conexion(); 
    $stmt= $con->prepare("UPDATE pedido SET   id_usuario = ?, id_producto_final = ?, fecha_pedido = ?, direccion_entrega = ?, id_codigo = ? WHERE id_pedido = ?");
    $stmt->bind_param("iisssi",   $pedidosmodif1["id_usuario"], $pedidosmodif1["id_producto_final"], $pedidosmodif1["fecha_pedido"], $pedidosmodif1["direccion_entrega"], $pedidosmodif1["id_codigo"],$pedidosmodif1["id_pedido"],);

    if ($stmt->execute()) {
        echo "pedidos creado con éxito";
    } else {
        echo "Error al crear el pedidos: " . $stmt->error;
    }
    $stmt->close();
}

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
    $stmt->bind_param("siii", $frenomdf["tipo"], $frenomdf["precio"], $frenomdf["oferta"], $frenomdf["id_freno"]);

    if ($stmt->execute()) {
        echo "freno creado con éxito";
    } else {
        echo "Error al crear el freno: " . $stmt->error;
    }

    $stmt->close();
}



public function modificar_descuento($codigo_descuentomdf) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt= $con->prepare("UPDATE codigo_descuento SET    descuento_porcentaje = ?, id_codigo = ? WHERE id_codigo = ?");
    $stmt->bind_param("iss",   $codigo_descuentomdf["descuento_porcentaje"],$codigo_descuentomdf["id_nuevo_codigo"],$codigo_descuentomdf["id_codigo"]);

    if ($stmt->execute()) {
        echo "descuento creado con éxito";
    } else {
        echo "Error al crear el descuento: " . $stmt->error;
    }

    $stmt->close();
}
public function modificar_carrito($carritomdf) {
    $con = $this->conexion(); // Usamos el método conexion de la clase base

    $stmt= $con->prepare("UPDATE carrito SET    id_producto_final = ?, id_usuario = ? WHERE id_carrito = ?");
    $stmt->bind_param("iii",   $carritomdf["id_producto_final"],$carritomdf["id_usuario"],$carritomdf["id_carrito"]);

    if ($stmt->execute()) {
        echo "descuento creado con éxito";
    } else {
        echo "Error al crear el descuento: " . $stmt->error;
    }

    $stmt->close();
}
public function getMotores_nombre() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_motor, nombre_motor,precio FROM motor");

    $motores_nombres = [];
    
    while($fila = $query->fetch_assoc()){
        $motores_nombres[] = array(
            'id_motor' => $fila['id_motor'],
            'nombre_motor' => $fila['nombre_motor'],
            'precio' => $fila['precio']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($motores_nombres);
}

public function getSuspensiones_nombre() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_suspension, nombre_suspension,oferta,precio FROM suspension");

    $suspensiones_nombres = [];
    
    while($fila = $query->fetch_assoc()){
        $suspensiones_nombres[] = array(
            'id_suspension' => $fila['id_suspension'],
            'nombre_suspension' => $fila['nombre_suspension'],
            'oferta' => $fila['oferta'],
            'precio' => $fila['precio']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($suspensiones_nombres);
}

public function getLlantas_nombre() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_llanta, nombre_llanta,oferta,precio FROM llanta");

    $llantes_nombres = [];
    
    while($fila = $query->fetch_assoc()){
        $llantes_nombres[] = array(
            'id_llanta' => $fila['id_llanta'],
            'nombre_llanta' => $fila['nombre_llanta'],
            'oferta' => $fila['oferta'],
            'precio' => $fila['precio']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($llantes_nombres);
}

public function getFrenos_nombre() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_freno, tipo,oferta,precio FROM freno");

    $frenos_nombres = [];
    
    while($fila = $query->fetch_assoc()){
        $frenos_nombres[] = array(
            'id_freno' => $fila['id_freno'],
            'tipo' => $fila['tipo'],
            'oferta' => $fila['oferta'],
            'precio' => $fila['precio']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($frenos_nombres);
}
public function getModelos_nombre() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_modelo, nombre_modelo,precio_base FROM modelo");

    $modelos_nombres = [];
    
    while($fila = $query->fetch_assoc()){
        $modelos_nombres[] = array(
            'id_modelo' => $fila['id_modelo'],
            'nombre_modelo' => $fila['nombre_modelo'],
            'precio_base' => $fila['precio_base']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($modelos_nombres);
}
public function getproducto_nombre_carrito() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_producto_final, nombre_producto FROM producto_final");

    $producto_carrito = [];
    
    while($fila = $query->fetch_assoc()){
        $producto_carrito[] = array(
            'id_producto_final' => $fila['id_producto_final'],
            'nombre_producto' => $fila['nombre_producto']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($producto_carrito);
}
public function getUsuario_carrito() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_usuario, usuario FROM usuario");

    $usuario_carrito = [];
    
    while($fila = $query->fetch_assoc()){
        $usuario_carrito[] = array(
            'id_usuario' => $fila['id_usuario'],
            'usuario' => $fila['usuario']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($usuario_carrito);
}
public function getProducto_nombre() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_producto_final, nombre_producto FROM producto_final");

    $producto_nombres = [];
    
    while($fila = $query->fetch_assoc()){
        $producto_nombres[] = array(
            'id_producto_final' => $fila['id_producto_final'],
            'nombre_producto' => $fila['nombre_producto']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($producto_nombres);
}

public function getUsuario_nombre() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_usuario,usuario FROM usuario");

    $Usuario_nombres = [];
    
    while($fila = $query->fetch_assoc()){
        $Usuario_nombres[] = array(
            'id_usuario' => $fila['id_usuario'],
            'usuario' => $fila['usuario']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($Usuario_nombres);
}
public function getKit_nombre() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_kit,nombre_kit,oferta,precio FROM kit_aerodinamico");

    $kit_aerodinamico_nombre = [];
    
    while($fila = $query->fetch_assoc()){
        $kit_aerodinamico_nombre[] = array(
            'id_kit' => $fila['id_kit'],
            'nombre_kit' => $fila['nombre_kit'],
            'oferta' => $fila['oferta'],
            'precio' => $fila['precio']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($kit_aerodinamico_nombre);
}
public function getID_Codigo_descuento() {
    $con = modeloAdmin::conexion();
    $query = $con->query("SELECT id_codigo,descuento_porcentaje FROM codigo_descuento");

    $porcentaje_descuento = [];
    
    while($fila = $query->fetch_assoc()){
        $porcentaje_descuento[] = array(
            'id_codigo' => $fila['id_codigo'],
            'descuento_porcentaje' => $fila['descuento_porcentaje']
        );
    }

    header("Content-Type: application/json");
    echo json_encode($porcentaje_descuento);
}

//Errores

public function ErrorUsuario($usuarioError) {
    $con = self::conexion();
    $sentencia = $con->prepare("SELECT * FROM usuario WHERE usuario = ?");
    
    if ($sentencia) {
        $sentencia->bind_param("s", $usuarioError['usuario']);
        $sentencia->execute();
        $resultado = $sentencia->get_result();
        
        if ($resultado->num_rows > 0) {
            $sentencia->close();
            $con->close();
            echo json_encode([
                "existe" => true, 
                "mensaje" => "Usuario ya existe"
            ]);
            exit();  // Asegúrate de llamar exit() para evitar que se imprima cualquier otro contenido
        } else {
            $sentencia->close();
            $con->close();
            echo json_encode([
                "existe" => false, 
                "mensaje" => "Usuario no existe"
            ]);
            exit();  // Asegúrate de llamar exit() para evitar que se imprima cualquier otro contenido
        }
    } else {
        $con->close();
        throw new Exception("Error en la preparación de la consulta SQL.");
    }
}



public function errorEmail($emailError) {
    $con = self::conexion();
    $sentencia = $con->prepare("SELECT * FROM usuario WHERE email = ?");
    if ($sentencia) {
        $sentencia->bind_param("s", $emailError['email']);
        $sentencia->execute();
        $resultado = $sentencia->get_result();
        if ($resultado->num_rows > 0) {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => true,
                "mensaje" => "El email ya existe"
            ]);
            exit(); 
        } else {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => false,
                "mensaje" => "El email no existe"
            ]);
            exit(); 
        }
    } else {
        $con->close();
        throw new Exception("Error en la preparación de la consulta SQL.");
    }
}
public function errorPedido_Usuario($usuario_pedido_Error) {
    $con = self::conexion();
    $sentencia = $con->prepare("SELECT * FROM pedido WHERE id_usuario = ?");
    if ($sentencia) {
        $sentencia->bind_param("i", $usuario_pedido_Error['id_usuario']);
        $sentencia->execute();
        $resultado = $sentencia->get_result();
        if ($resultado->num_rows > 0) {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => true,
                "mensaje" => "El usuario tiene un pedido en mente"
            ]);
            exit(); 
        } else {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => false,
                "mensaje" => "El usuario no  tiene un pedido en mente"
            ]);
            exit(); 
        }
    } else {
        $con->close();
        throw new Exception("Error en la preparación de la consulta SQL.");
    }
}

public function errorSuspension_Producto($ErrorSuspension) {
    $con = self::conexion();
    $sentencia = $con->prepare("SELECT * FROM producto_final WHERE id_suspension = ?");
    if ($sentencia) {
        $sentencia->bind_param("i", $ErrorSuspension['id_suspension']);
        $sentencia->execute();
        $resultado = $sentencia->get_result();
        if ($resultado->num_rows > 0) {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => true,
                "mensaje" => "La suspension Esta asignado a un producto"
            ]);
            exit(); 
        } else {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => false,
                "mensaje" => "La suspension no Esta asignado a un producto"
            ]);
            exit(); 
        }
    } else {
        $con->close();
        throw new Exception("Error en la preparación de la consulta SQL.");
    }
}
public function errorMotor_Producto($ErrorMotor) {
    $con = self::conexion();
    $sentencia = $con->prepare("SELECT * FROM producto_final WHERE id_motor = ?");
    if ($sentencia) {
        $sentencia->bind_param("i", $ErrorMotor['id_motor']);
        $sentencia->execute();
        $resultado = $sentencia->get_result();
        if ($resultado->num_rows > 0) {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => true,
                "mensaje" => "El motor Esta asignado a un producto"
            ]);
            exit(); 
        } else {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => false,
                "mensaje" => "El motor no Esta asignado a un producto"
            ]);
            exit(); 
        }
    } else {
        $con->close();
        throw new Exception("Error en la preparación de la consulta SQL.");
    }
}
public function errorllanta_Producto($Errorllanta) {
    $con = self::conexion();
    $sentencia = $con->prepare("SELECT * FROM producto_final WHERE id_llanta = ?");
    if ($sentencia) {
        $sentencia->bind_param("i", $Errorllanta['id_llanta']);
        $sentencia->execute();
        $resultado = $sentencia->get_result();
        if ($resultado->num_rows > 0) {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => true,
                "mensaje" => " La llanta Esta asignado a un producto"
            ]);
            exit(); 
        } else {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => false,
                "mensaje" => "La llanta no Esta asignado a un producto"
            ]);
            exit(); 
        }
    } else {
        $con->close();
        throw new Exception("Error en la preparación de la consulta SQL.");
    }
}
public function errormodelo_Producto($Errormodelo) {
    $con = self::conexion();
    $sentencia = $con->prepare("SELECT * FROM producto_final WHERE id_modelo = ?");
    if ($sentencia) {
        $sentencia->bind_param("i", $Errormodelo['id_modelo']);
        $sentencia->execute();
        $resultado = $sentencia->get_result();
        if ($resultado->num_rows > 0) {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => true,
                "mensaje" => " El modelo Esta asignado a un producto"
            ]);
            exit(); 
        } else {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => false,
                "mensaje" => "El modelo no Esta asignado a un producto"
            ]);
            exit(); 
        }
    } else {
        $con->close();
        throw new Exception("Error en la preparación de la consulta SQL.");
    }
}
public function errorkit_Producto($Errorkit) {
    $con = self::conexion();
    $sentencia = $con->prepare("SELECT * FROM producto_final WHERE id_kit = ?");
    if ($sentencia) {
        $sentencia->bind_param("i", $Errorkit['id_kit']);
        $sentencia->execute();
        $resultado = $sentencia->get_result();
        if ($resultado->num_rows > 0) {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => true,
                "mensaje" => " El kit Esta asignado a un producto"
            ]);
            exit(); 
        } else {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => false,
                "mensaje" => "El kit no Esta asignado a un producto"
            ]);
            exit(); 
        }
    } else {
        $con->close();
        throw new Exception("Error en la preparación de la consulta SQL.");
    }
}
public function errorfreno_Producto($Errorfreno) {
    $con = self::conexion();
    $sentencia = $con->prepare("SELECT * FROM producto_final WHERE id_freno = ?");
    if ($sentencia) {
        $sentencia->bind_param("i", $Errorfreno['id_freno']);
        $sentencia->execute();
        $resultado = $sentencia->get_result();
        if ($resultado->num_rows > 0) {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => true,
                "mensaje" => " El freno Esta asignado a un producto"
            ]);
            exit(); 
        } else {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => false,
                "mensaje" => "El freno no Esta asignado a un producto"
            ]);
            exit(); 
        }
    } else {
        $con->close();
        throw new Exception("Error en la preparación de la consulta SQL.");
    }
}
public function errorcodigo_Pedido($Errorcodigo) {
    $con = self::conexion();
    $sentencia = $con->prepare("SELECT * FROM pedido WHERE id_codigo = ?");
    if ($sentencia) {
        $sentencia->bind_param("s", $Errorcodigo['id_codigo']);
        $sentencia->execute();
        $resultado = $sentencia->get_result();
        if ($resultado->num_rows > 0) {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => true,
                "mensaje" => " El codigo Esta asignado a un pedido"
            ]);
            exit(); 
        } else {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => false,
                "mensaje" => "El codigo no Esta asignado a un pedido"
            ]);
            exit(); 
        }
    } else {
        $con->close();
        throw new Exception("Error en la preparación de la consulta SQL.");
    }
}
public function Errorcarrito_producto($Errorcarrito_producto) {
    $con = self::conexion();
    $sentencia = $con->prepare("SELECT * FROM carrito WHERE id_producto_final = ?");
    if ($sentencia) {
        $sentencia->bind_param("i", $Errorcarrito_producto['id_producto_final']);
        $sentencia->execute();
        $resultado = $sentencia->get_result();
        if ($resultado->num_rows > 0) {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => true,
                "mensaje" => "El producto Esta asignado a un carrito"
            ]);
            exit(); 
        } else {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => false,
                "mensaje" => "El no producto Esta asignado a un carrito"
            ]);
            exit(); 
        }
    } else {
        $con->close();
        throw new Exception("Error en la preparación de la consulta SQL.");
    }
}
public function Errorproducto_pedido($Errorpedido_producto) {
    $con = self::conexion();
    $sentencia = $con->prepare("SELECT * FROM pedido WHERE id_producto_final = ?");
    if ($sentencia) {
        $sentencia->bind_param("i", $Errorpedido_producto['id_producto_final']);
        $sentencia->execute();
        $resultado = $sentencia->get_result();
        if ($resultado->num_rows > 0) {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => true,
                "mensaje" => "El producto Esta asignado a un Pedido"
            ]);
            exit(); 
        } else {
            $sentencia->close();
            $con->close();
            header("Content-Type: application/json");
            echo json_encode([
                "existe" => false,
                "mensaje" => "El no producto Esta asignado a un Pedido"
            ]);
            exit(); 
        }
    } else {
        $con->close();
        throw new Exception("Error en la preparación de la consulta SQL.");
    }
}


}
?>