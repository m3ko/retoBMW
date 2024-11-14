// Define the button names as an array of strings
var botones = [
    "codigo_descuento",
    "freno",
    "kit_aerodinamico",
    "llanta",
    "modelo",
    "motor",
    "pedido",
    "producto_final",
    "suspension",
    "usuario"
];
var usuarios = []

var suspensiones = []
var motores = []
var llantas = []
var pedidos = []
var modelos = []
var kits = []
var frenos = []
var descuentos = []
var productos = []
// Cargar botones
function cargarbotones(botones) {
    let rows = '';
    

    for (let boton of botones) {
        rows += `
            <div class="carta">
                <button class="coche" onclick="verificar('${boton}')">
                    ${boton}
                </button>
            </div>`;
    }

    let html = `
        <div class="modelos-list">
            ${rows}
        </div>
    `;

    document.getElementById('admin').innerHTML = html;
}
//verificar botones
function verificar(boton) {
    console.log("Button clicked: " + boton);

    if (boton === "usuario") {
        // Si el botón es "usuario", cargamos los datos de los usuarios
        cargardatosusuarios();
    } else if (boton === "suspension") {
        cargardatosuspension()
       
    } else if (boton === "producto_final") {
        cargardatosProducto()
       
    }else if (boton === "pedido") {
        cargardatosPedido()
       
    }else if (boton === "motor") {
        cargardatosmotor()
       
    }else if (boton === "llanta") {
        cargardatosllanta()
       
    }else if (boton === "freno") {
        cargardatosFreno()
       
    }else if (boton === "kit_aerodinamico") {
        cargardatosKit()
       
    }else if (boton === "codigo_descuento") {
        cargardatosDescuento()
       
    }else if (boton === "modelo") {
        cargardatosModelos()
       
    }else{
    // Si es otro botón, puedes hacer lo que necesites
    console.log("Se ha presionado otro botón: " + boton);
    }
}
//Usuarios
function cargardatosusuarios() {
    fetch("http://localhost/retoBMW-main/Controlador/admin/usuario/getusuarios.php") 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            usuarios = data; 
            mostrarDatosusaurios(usuarios);
           
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
}
//Mostrar usuario
function mostrarDatosusaurios(usuarios) {
    let rows = '';

   
    for (let usuario of usuarios) {
        rows += `
        <tr>
            <td>${usuario.id_usuario}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.usuario}</td>
            <td>${usuario.contrasena}</td>
            <td>${usuario.email}</td>
            <td>${usuario.direccion}</td>
            <td>${usuario.rol}</td>
            <td>
            <a href="#" onclick="eliminarUsuario(${usuario.id_usuario})">Eliminar</a> 
              <a href="#" onclick="modificarUsuario('${usuario.id_usuario}', '${usuario.nombre}', '${usuario.apellidos}', '${usuario.usuario}', '${usuario.contrasena}', '${usuario.email}', '${usuario.direccion}', '${usuario.rol}')">Modificar</a>
             </td>
        </tr>`;
    }
          
           
    let html  = `
              <a href="#" onclick="cargarbotones(botones)">Atras</a>
                <table class="table">
                <thead>
                <tr>
                <th>id_usuario</th>
                <th>nombre</th>
                <th>apellidos</th>
                <th>usuario</th>
                <th>contraseña</th>
                <th>email</th>
                <th>direccion</th>
                <th>rol</th>
                </tr>
                </thead>
                <tbody>
              
                ${rows}
                </tbody>
                </table>
                <a href="#" onclick="formCrearUsuario()">Crear</a>
                `;
        
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
}
//Eliminar Usuarios
function eliminarUsuario(id_usuario) {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        fetch(`http://localhost/retoBMW-main/Controlador/admin/usuario/eliminarusuario.php?id_usuario=${id_usuario}`)
            .then(() => {
                alert("Usuario eliminado correctamente.");
                cargardatosusuarios(); // Recarga la lista de usuarios
            })
            .catch(error => {
                console.error("Error al eliminar el usuario:", error);
                alert("Hubo un error al intentar eliminar el usuario.");
            });
    }
}


//Modificar Usuarios
function modificarUsuario(id_usuario, nombre, apellidos, usuario, contrasena, email, direccion, rol) {
    let html = `
        <a href="#" onclick="cargarbotones(botones)">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/usuario/editUsuario.php" method="post">
            <div>
                <label for="id_usuario">ID</label>
                <input type="text" id="id_usuario" name="id_usuario" value="${id_usuario}" readonly>
            </div>
            <div>
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" value="${nombre}" required>
            </div>
            <div>
                <label for="apellidos">Apellidos</label>
                <input type="text" id="apellidos" name="apellidos" value="${apellidos}" required>
            </div>
            <div>
                <label for="usuario">Usuario</label>
                <input type="text" id="usuario" name="usuario" value="${usuario}" required>
            </div>
            <div>
                <label for="contrasena">Contraseña</label>
                <input type="password" id="contrasena" name="contrasena" value="${contrasena}" required>
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" value="${email}" required>
            </div>
            <div>
                <label for="direccion">Dirección</label>
                <input type="text" id="direccion" name="direccion" value="${direccion}" required>
            </div>
            <div>
                <label for="rol">Rol</label>
                <input type="text" id="rol" name="rol" value="${rol}" required>
            </div>
            <button type="submit">Modificar</button>
        </form>
    `;

  
    document.getElementById('admin').innerHTML = html;
}
//Modificar Usuarios
function formCrearUsuario() {
    let html = `
        <a href="#" onclick="cargarbotones(botones)">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/usuario/crearUsuario.php" method="post">
            <div>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required><br>
                
                <label for="apellidos">Apellidos:</label>
                <input type="text" id="apellidos" name="apellidos" required><br>
                
                <label for="usuario">Usuario:</label>
                <input type="text" id="usuario" name="usuario" required><br>
                
                <label for="contrasena">Contraseña:</label>
                <input type="password" id="contrasena" name="contrasena" required><br>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br>
                
                <label for="direccion">Dirección:</label>
                <input type="text" id="direccion" name="direccion" required><br>
                
                <label for="rol">Rol:</label>
                <input type="text" id="rol" name="rol" required><br>
                
                <button type="submit">Crear</button>
            </div>
        </form>
    `;
    
    document.getElementById('admin').innerHTML = html;
}
//Suspension
function cargardatosuspension() {
    fetch("http://localhost/retoBMW-main/Controlador/admin/suspension/getsuspension.php") 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            suspensiones = data; 
            mostrarDatosuspension(suspensiones);
           
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
}
//Mostrar suspension
function mostrarDatosuspension(suspensiones) {
    let rows = '';

   
    for (let suspension of suspensiones) {
        rows += `
        <tr>
            <td>${suspension.id_suspension}</td>
            <td>${suspension.nombre_suspension}</td>
            <td>${suspension.tipo}</td>
            <td>${suspension.precio}</td>
            <td>${suspension.oferta}</td>
            
            <td>
            <a href="#" onclick="eliminarSuspension(${suspension.id_suspension})">Eliminar</a> 
              <a href="#" onclick="modificarSuspension('${suspension.id_suspension}', '${suspension.nombre_suspension}', '${suspension.tipo}', '${suspension.precio}', '${suspension.oferta}')">Modificar</a>
             </td>
        </tr>`;
    }
          
           
    let html  = `
              <a href="#" onclick="cargarbotones(botones)">Atras</a>
                <table class="table">
                <thead>
                <tr>
                <th>id_suspension</th>
                <th>nombre_suspension</th>
                <th>tipo</th>
                <th>precio</th>
                <th>oferta</th>
                </tr>
                </thead>
                <tbody>
              
                ${rows}
                </tbody>
                </table>
                <a href="#" onclick="formCrearSuspension()">Crear</a>
                `;
        
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
}
//Eliminar Supension
function eliminarSuspension(id_suspension) {
    if (confirm("¿Estás seguro de que deseas eliminar esta suspension?")) {
        fetch(`http://localhost/retoBMW-main/Controlador/admin/suspension/eliminarSuspension.php?id_suspension=${id_suspension}`)
            .then(() => {
                alert("suspension eliminado correctamente.");
                cargardatosuspension(); // Recarga la lista de suspension
            })
            .catch(error => {
                console.error("Error al eliminar el suspension:", error);
                alert("Hubo un error al intentar eliminar el suspension.");
            });
    }
}
// Modificar suspension
function modificarSuspension(id_suspension, nombre_suspension, tipo, precio, oferta) {
    let html = `
        <a href="#" onclick="cargarbotones(botones)">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/suspension/editSuspension.php" method="post">
            <div>
                <label for="id_suspension">ID Suspensión</label>
                <input type="text" id="id_suspension" name="id_suspension" value="${id_suspension}" readonly>
            </div>
            <div>
                <label for="nombre_suspension">Nombre Suspensión</label>
                <input type="text" id="nombre_suspension" name="nombre_suspension" value="${nombre_suspension}" required>
            </div>
            <div>
                <label for="tipo">Tipo</label>
                <input type="text" id="tipo" name="tipo" value="${tipo}" required>
            </div>
            <div>
                <label for="precio">Precio</label>
                <input type="number" id="precio" name="precio" value="${precio}" required>
            </div>
            <div>
                <label for="oferta">Oferta</label>
                <input type="number" id="oferta" name="oferta" value="${oferta}" required>
            </div>
           
            <button type="submit">Modificar</button>
        </form>
    `;

    document.getElementById('admin').innerHTML = html;
}

//Crear suspension
function formCrearSuspension() {
    let html = `
        <a href="#" onclick="cargarbotones(botones)">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/suspension/crearSuspension.php" method="post">
            <div>
                <label for="nombre_suspension">nombre_suspension:</label>
                <input type="text" id="nombre_suspension" name="nombre_suspension" required><br>
                
                <label for="tipo">tipo:</label>
                <input type="text" id="tipo" name="tipo" required><br>
                
                <label for="precio">precio:</label>
                <input type="text" id="precio" name="precio" required><br>
                
                <label for="oferta">oferta:</label>
                <input type="text" id="oferta" name="oferta" required><br>
                
                
                
                <button type="submit">Crear</button>
            </div>
        </form>
    `;
    
    document.getElementById('admin').innerHTML = html;
}

     



   
//Motores
function cargardatosmotor() {
    fetch("http://localhost/retoBMW-main/Controlador/admin/motor/getmotor.php") 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            motores = data; 
            mostrarDatosmotor(motores);
           
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
}
//Mostrar motor
function mostrarDatosmotor(motores) {
    let rows = '';

   
    for (let motor of motores) {
        rows += `
        <tr>
            <td>${motor.id_motor}</td>
            <td>${motor.nombre_motor}</td>
            <td>${motor.caballos}</td>
            <td>${motor.cilindrada}</td>
            <td>${motor.precio}</td>
            <td>${motor.combustion}</td>
            
            <td>
            <a href="#" onclick="eliminarmotor(${motor.id_motor})">Eliminar</a> 
              <a href="#" onclick="modificarmotor('${motor.id_motor}', '${motor.nombre_motor}', '${motor.caballos}', '${motor.cilindrada}', '${motor.precio}', '${motor.combustion}')">Modificar</a>
             </td>
        </tr>`;
    }
          
           
    let html  = `
              <a href="#" onclick="cargarbotones(botones)">Atras</a>
                <table class="table">
                <thead>
                <tr>
                <th>id_motor</th>
                <th>nombre_motor</th>
                <th>caballos</th>
                <th>cilindrada</th>
                <th>precio</th>
                <th>combustion</th>
                </tr>
                </thead>
                <tbody>
              
                ${rows}
                </tbody>
                </table>
                <a href="#" onclick="formCrearMotor()">Crear</a>
                `;
        
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
}

//Eliminar motor
function eliminarmotor(id_motor) {
    if (confirm("¿Estás seguro de que deseas eliminar esta motor?")) {
        fetch(`http://localhost/retoBMW-main/Controlador/admin/motor/eliminarmotor.php?id_motor=${id_motor}`)
            .then(() => {
                alert("motor eliminado correctamente.");
                cargardatosmotor(); // Recarga la lista de motor
            })
            .catch(error => {
                console.error("Error al eliminar el motor:", error);
                alert("Hubo un error al intentar eliminar el motor.");
            });
    }
}   
// Modificar motor
function modificarmotor(id_motor, nombre_motor, caballos, cilindrada, precio,combustion) {
    let html = `
        <a href="#" onclick="cargarbotones(botones)">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/motor/editMotor.php" method="post">
            <div>
                <label for="id_motor">ID id_motor</label>
                <input type="number" id="id_motor" name="id_motor" value="${id_motor}" readonly>
            </div>
            <div>
                <label for="nombre_motor">nombre_motor nombre_motor</label>
                <input type="text" id="nombre_motor" name="nombre_motor" value="${nombre_motor}" required>
            </div>
            <div>
                <label for="caballos">caballos</label>
                <input type="number" id="caballos" name="caballos" value="${caballos}" required>
            </div>
            <div>
                <label for="cilindrada">cilindrada</label>
                <input type="number" id="cilindrada" name="cilindrada" value="${cilindrada}" required>
            </div>
            <div>
                <label for="precio">precio</label>
                <input type="number" id="precio" name="precio" value="${precio}" required>
            </div>
            <div>
                <label for="combustion">combustion</label>
                <input type="text" id="combustion" name="combustion" value="${combustion}" required>
            </div>
           
            <button type="submit">Modificar</button>
        </form>
    `;

    document.getElementById('admin').innerHTML = html;
}
//Crear motor
function formCrearMotor() {
    let html = `
        <a href="#" onclick="cargarbotones(botones)">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/motor/crearMotor.php" method="post">
            <div>
                <label for="nombre_motor">nombre_motor:</label>
                <input type="text" id="nombre_motor" name="nombre_motor" required><br>
                
                <label for="caballos">caballos:</label>
                <input type="number" id="caballos" name="caballos" required><br>
                
                <label for="cilindrada">cilindrada:</label>
                <input type="number" id="cilindrada" name="cilindrada" required><br>
                
                <label for="precio">precio:</label>
                <input type="number" id="precio" name="precio" required><br>

                <label for="combustion">combustion:</label>
                <input type="text" id="combustion" name="combustion" required><br>
                
                
                
                <button type="submit">Crear</button>
            </div>
        </form>
    `;
    
    document.getElementById('admin').innerHTML = html;
}
//llanta
function cargardatosllanta() {
    fetch("http://localhost/retoBMW-main/Controlador/admin/llanta/getllanta.php") 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            llantas = data; 
            mostrarDatosllantas(llantas);
           
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
}
//Mostrar llanta
function mostrarDatosllantas(llantas) {
    let rows = '';

   
    for (let llanta of llantas) {
        rows += `
        <tr>
            <td>${llanta.id_llanta}</td>
            <td>${llanta.nombre_llanta}</td>
            <td>${llanta.tipo}</td>
            <td>${llanta.precio}</td>
            <td>${llanta.oferta}</td>
            <td>
            <a href="#" onclick="eliminarllanta(${llanta.id_llanta})">Eliminar</a> 
              <a href="#" onclick="modificarllanta('${llanta.id_motor}', '${llanta.nombre_llanta}', '${llanta.tipo}',  '${llanta.precio}', '${llanta.oferta}')">Modificar</a>
             </td>
        </tr>`;
    }
          
           
    let html  = `
              <a href="#" onclick="cargarbotones(botones)">Atras</a>
                <table class="table">
                <thead>
                <tr>
                <th>id_llanta</th>
                <th>nombre_llanta</th>
                <th>tipo</th>
                <th>precio</th>
                <th>oferta</th>
                </tr>
                </thead>
                <tbody>
              
                ${rows}
                </tbody>
                </table>
                <a href="#" onclick="formCrearllanta()">Crear</a>
                `;
        
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
}
//Eliminar llanta
function eliminarllanta(id_llanta) {
    if (confirm("¿Estás seguro de que deseas eliminar esta llanta?")) {
        fetch(`http://localhost/retoBMW-main/Controlador/admin/llanta/eliminarllanta.php?id_llanta=${id_llanta}`)
            .then(() => {
                alert("llanta eliminado correctamente.");
                cargardatosllanta(); // Recarga la lista de motor
            })
            .catch(error => {
                console.error("Error al eliminar el llanta:", error);
                alert("Hubo un error al intentar eliminar el llanta.");
            });
    }
}

// Modificar llanta
function modificarllanta(id_llanta, nombre_llanta, tipo, precio,oferta) {
    let html = `
        <a href="#" onclick="cargardatosllanta()">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/llanta/editllanta.php" method="post">
            <div>
                <label for="id_llanta"> id_llanta</label>
                <input type="number" id="id_llanta" name="id_llanta" value="${id_llanta}" readonly>
            </div>
              <div>
                <label for="nombre_llanta">nombre_llanta</label>
                <input type="text" id="nombre_llanta" name="nombre_llanta" value="${nombre_llanta}" required>
            </div>
            <div>
                <label for="tipo">tipo</label>
                <input type="text" id="tipo" name="tipo" value="${tipo}" required>
            </div>
            <div>
                <label for="precio">precio</label>
                <input type="number" id="precio" name="precio" value="${precio}" required>
            </div>
            <div>
                <label for="oferta">oferta</label>
                <input type="number" id="oferta" name="oferta" value="${oferta}" required>
            </div>
            <button type="submit">Modificar</button>
        </form>
    `;

    document.getElementById('admin').innerHTML = html;
}
//Crear llanta
function formCrearllanta() {
    let html = `
        <a href="#" onclick="cargarbotones(botones)">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/llanta/crearllanta.php" method="post">
            <div>
                <label for="nombre_llanta">nombre_llanta:</label>
                <input type="text" id="nombre_llanta" name="nombre_llanta" required><br>
                
                <label for="tipo">tipo:</label>
                <input type="text" id="tipo" name="tipo" required><br>
                
                <label for="precio">precio:</label>
                <input type="number" id="precio" name="precio" required><br>
                
                <label for="oferta">oferta:</label>
                <input type="number" id="oferta" name="oferta" required><br>
                
                
                
                <button type="submit">Crear</button>
            </div>
        </form>
    `;
    
    document.getElementById('admin').innerHTML = html;
}

//Pedido
function cargardatosPedido() {
    fetch("http://localhost/retoBMW-main/Controlador/admin/pedido/getpedido.php") 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            pedidos = data; 
            mostrarDatosPedidos(pedidos);
           
        })
        .catch(error => {
            console.error("Error al obtener los Pedido:", error);
        });
}

//Mostrar pedido
function mostrarDatosPedidos(pedidos) {
    let rows = '';

   
    for (let pedido of pedidos) {
        rows += `
        <tr>
            <td>${pedido.id_pedido}</td>
            <td>${pedido.id_usuario}</td>
            <td>${pedido.id_producto_final}</td>
            <td>${pedido.fecha_pedido}</td>
            <td>${pedido.direccion_entrega}</td>
            <td>${pedido.id_codigo}</td>
            <td>
            <a href="#" onclick="eliminarpedido(${pedido.id_pedido})">Eliminar</a> 
              <a href="#" onclick="modificarpedido('${pedido.id_pedido}', '${pedido.id_usuario}', '${pedido.id_producto_final}',  '${pedido.fecha_pedido}', '${pedido.direccion_entrega}', '${pedido.id_codigo}')">Modificar</a>
             </td>
        </tr>`;
    }
          
           
    let html  = `
              <a href="#" onclick="cargarbotones(botones)">Atras</a>
                <table class="table">
                <thead>
                <tr>
                <th>id_pedido</th>
                <th>id_usuario</th>
                <th>id_producto_final</th>
                <th>fecha_pedido</th>
                <th>direccion_entrega</th>
                <th>id_codigo</th>
                </tr>
                </thead>
                <tbody>
              
                ${rows}
                </tbody>
                </table>
                <a href="#" onclick="formCrearpedido()">Crear</a>
                `;
        
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
}

//Eliminar pedido
function eliminarpedido(id_pedido) {
    if (confirm("¿Estás seguro de que deseas eliminar esta llanta?")) {
        fetch(`http://localhost/retoBMW-main/Controlador/admin/pedido/eliminarpedido.php?id_pedido=${id_pedido}`)
            .then(() => {
                alert("Pedido eliminado correctamente.");
                cargardatosPedido(); // Recarga la lista de motor
            })
            .catch(error => {
                console.error("Error al eliminar el llanta:", error);
                alert("Hubo un error al intentar eliminar el Pedido.");
            });
    }
}
// Modificar pedido
function modificarpedido(id_pedido, id_usuario, id_producto_final, fecha_pedido,direccion_entrega,id_codigo) {
    let html = `
        <a href="#" onclick="cargardatosllanta()">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/pedido/editPedido.php" method="post">
            <div>
                <label for="id_pedido"> id_pedido</label>
                <input type="number" id="id_pedido" name="id_pedido" value="${id_pedido}" readonly>
            </div>
              <div>
                <label for="id_usuario">id_usuario</label>
                <input type="number" id="id_usuario" name="id_usuario" value="${id_usuario}" required>
            </div>
            <div>
                <label for="id_producto_final">id_producto_final</label>
                <input type="number" id="id_producto_final" name="id_producto_final" value="${id_producto_final}" required>
            </div>
            <div>
                <label for="fecha_pedido">fecha_pedido</label>
                <input type="date" id="fecha_pedido" name="fecha_pedido" value="${fecha_pedido}" required>
            </div>
            <div>
                <label for="direccion_entrega">direccion_entrega</label>
                <input type="text" id="direccion_entrega" name="direccion_entrega" value="${direccion_entrega}" required>
            </div>
              <div>
                <label for="id_codigo">id_codigo</label>
                <input type="text" id="id_codigo" name="id_codigo" value="${id_codigo}" required>
            </div>
            <button type="submit">Modificar</button>
        </form>
    `;

    document.getElementById('admin').innerHTML = html;
}

//Crear pedido
function formCrearpedido() {
    let html = `
        <a href="#" onclick="cargarbotones(botones)">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/pedido/crearpedido.php" method="post">
            <div>
              
                
                <label for="id_usuario">id_usuario:</label>
                <input type="number" id="id_usuario" name="id_usuario" required><br>
                
                <label for="id_producto_final">id_producto_final:</label>
                <input type="number" id="id_producto_final" name="id_producto_final" required><br>
                
                <label for="fecha_pedido">fecha_pedido:</label>
                <input type="date" id="fecha_pedido" name="fecha_pedido" required><br>

                <label for="direccion_entrega">direccion_entrega:</label>
                <input type="text" id="direccion_entrega" name="direccion_entrega" required><br>

                <label for="id_codigo">id_codigo:</label>
                <input type="text" id="id_codigo" name="id_codigo" required><br>
                
                
                
                <button type="submit">Crear</button>
            </div>
        </form>
    `;
    
    document.getElementById('admin').innerHTML = html;
}
//Modelo
function cargardatosModelos() {
    fetch("http://localhost/retoBMW-main/Controlador/admin/modelo/getmodelo.php") 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            modelos = data; 
            mostrarDatosModelos(modelos);
           
        })
        .catch(error => {
            console.error("Error al obtener los Pedido:", error);
        });
}
//Mostrar modelo
function mostrarDatosModelos(modelos) {
    let rows = '';

   
    for (let modelo of modelos) {
        rows += `
        <tr>
            <td>${modelo.id_modelo}</td>
            <td>${modelo.nombre_modelo}</td>
            <td>${modelo.precio_base}</td>
         
            <td>
            <a href="#" onclick="eliminarmodelo(${modelo.id_modelo})">Eliminar</a> 
              <a href="#" onclick="modificarmodelo('${modelo.id_modelo}', '${modelo.nombre_modelo}', '${modelo.precio_base}')">Modificar</a>
             </td>
        </tr>`;
    }
          
           
    let html  = `
              <a href="#" onclick="cargarbotones(botones)">Atras</a>
                <table class="table">
                <thead>
                <tr>
                <th>id_modelo</th>
                <th>nombre_modelo</th>
                <th>precio_base</th>
                </tr>
                </thead>
                <tbody>
              
                ${rows}
                </tbody>
                </table>
                <a href="#" onclick="formCrearmodelo()">Crear</a>
                `;
        
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
}
//Eliminar modelo
function eliminarmodelo(id_modelo) {
    if (confirm("¿Estás seguro de que deseas eliminar esta modelo?")) {
        fetch(`http://localhost/retoBMW-main/Controlador/admin/modelo/eliminarmodelo.php?id_modelo=${id_modelo}`)
            .then(() => {
                alert("Pedido eliminado correctamente.");
                cargardatosModelos(); // Recarga la lista de Modelos
            })
            .catch(error => {
                console.error("Error al eliminar el modelo:", error);
                alert("Hubo un error al intentar eliminar el modelo.");
            });
    }
}
// Modificar modelo
function modificarmodelo(id_modelo, nombre_modelo, precio_base) {
    let html = `
        <a href="#" onclick="cargardatosllanta()">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/modelo/editModelo.php" method="post">
            <div>
                <label for="id_modelo"> id_modelo</label>
                <input type="number" id="id_modelo" name="id_modelo" value="${id_modelo}" readonly>
            </div>
              <div>
                <label for="nombre_modelo">nombre_modelo</label>
                <input type="text" id="nombre_modelo" name="nombre_modelo" value="${nombre_modelo}" required>
            </div>
            <div>
                <label for="precio_base">precio_base</label>
                <input type="number" id="precio_base" name="precio_base" value="${precio_base}" required>
            </div>
            <button type="submit">Modificar</button>
        </form>
    `;

    document.getElementById('admin').innerHTML = html;
}
//Crear modelo
function formCrearmodelo() {
    let html = `
        <a href="#" onclick="cargarbotones(botones)">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/modelo/crearModelo.php" method="post">
            <div>
              
                <label for="nombre_modelo">nombre_modelo:</label>
                <input type="text" id="nombre_modelo" name="nombre_modelo" required><br>
                
                <label for="precio_base">precio_base:</label>
                <input type="text" id="precio_base" name="precio_base" required><br>
                
                
                <button type="submit">Crear</button>
            </div>
        </form>
    `;
    
    document.getElementById('admin').innerHTML = html;
}

//KIT AERODINAMICO
function cargardatosKit() {
    fetch("http://localhost/retoBMW-main/Controlador/admin/kit/getkit.php") 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            kits = data; 
            mostrarDatoskits(kits);
           
        })
        .catch(error => {
            console.error("Error al obtener los Pedido:", error);
        });
}
//Mostrar kits
function mostrarDatoskits(kits) {
    let rows = '';

   
    for (let kit of kits) {
        rows += `
        <tr>
            <td>${kit.id_kit}</td>
            <td>${kit.nombre_kit}</td>
            <td>${kit.tipo}</td>
            <td>${kit.precio}</td>
            <td>${kit.oferta}</td>
         
            <td>
            <a href="#" onclick="eliminarkit(${kit.id_kit})">Eliminar</a> 
              <a href="#" onclick="modificarkit('${kit.id_kit}', '${kit.nombre_kit}', '${kit.tipo}', '${kit.precio}', '${kit.oferta}')">Modificar</a>
             </td>
        </tr>`;
    }
          
           
    let html  = `
              <a href="#" onclick="cargarbotones(botones)">Atras</a>
                <table class="table">
                <thead>
                <tr>
                <th>id_modelo</th>
                <th>nombre_modelo</th>
                <th>precio_base</th>
                </tr>
                </thead>
                <tbody>
              
                ${rows}
                </tbody>
                </table>
                <a href="#" onclick="formCrearkit()">Crear</a>
                `;
        
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
}
//Eliminar kits
function eliminarkit(id_kit) {
    if (confirm("¿Estás seguro de que deseas eliminar este kit?")) {
        fetch(`http://localhost/retoBMW-main/Controlador/admin/kit/eliminarKit.php?id_kit=${id_kit}`)
            .then(() => {
                alert("kit eliminado correctamente.");
                cargardatosKit(); // Recarga la lista de Kits
            })
            .catch(error => {
                console.error("Error al eliminar el kit:", error);
                alert("Hubo un error al intentar eliminar el kit.");
            });
    }
}
// Modificar kit
function modificarkit(id_kit, nombre_kit, tipo,precio,oferta) {
    let html = `
        <a href="#" onclick="cargardatosllanta()">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/kit/editKit.php" method="post">
            <div>
                <label for="id_kit"> id_kit</label>
                <input type="id_kit" id="id_kit" name="id_kit" value="${id_kit}" readonly>
            </div>
              <div>
                <label for="nombre_kit">nombre_kit</label>
                <input type="text" id="nombre_kit" name="nombre_kit" value="${nombre_kit}" required>
            </div>
            <div>
                <label for="tipo">tipo</label>
                <input type="text" id="tipo" name="tipo" value="${tipo}" required>
            </div>
             <div>
                <label for="precio">precio</label>
                <input type="number" id="precio" name="precio" value="${precio}" required>
            </div>
             <div>
                <label for="oferta">oferta</label>
                <input type="number" id="oferta" name="oferta" value="${oferta}" required>
            </div>
            <button type="submit">Modificar</button>
        </form>
    `;

    document.getElementById('admin').innerHTML = html;
}
//Crear kit
function formCrearkit() {
    let html = `
        <a href="#" onclick="cargarbotones(botones)">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/kit/crearKit.php" method="post">
            <div>
              
                <label for="nombre_kit">nombre_kit:</label>
                <input type="text" id="nombre_kit" name="nombre_kit" required><br>
                
                <label for="tipo">tipo:</label>
                <input type="text" id="tipo" name="tipo" required><br>

                 <label for="precio">precio:</label>
                <input type="number" id="precio" name="precio" required><br>

                 <label for="oferta">oferta:</label>
                <input type="number" id="oferta" name="oferta" required><br>
                
                
                <button type="submit">Crear</button>
            </div>
        </form>
    `;
    
    document.getElementById('admin').innerHTML = html;
}

//freno
function cargardatosFreno() {
    fetch("http://localhost/retoBMW-main/Controlador/admin/freno/getfreno.php") 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            frenos = data; 
            mostrarDatosfrenos(frenos);
           
        })
        .catch(error => {
            console.error("Error al obtener los Pedido:", error);
        });
}
//Mostrar frenos
function mostrarDatosfrenos(frenos) {
    let rows = '';

   
    for (let freno of frenos) {
        rows += `
        <tr>
            <td>${freno.id_freno}</td>
            <td>${freno.tipo}</td>
            <td>${freno.precio}</td>
            <td>${freno.oferta}</td>
         
            <td>
            <a href="#" onclick="eliminarfreno(${freno.id_freno})">Eliminar</a> 
              <a href="#" onclick="modificarfreno('${freno.id_freno}', '${freno.tipo}', '${freno.precio}', '${freno.oferta}')">Modificar</a>
             </td>
        </tr>`;
    }
          
           
    let html  = `
              <a href="#" onclick="cargarbotones(botones)">Atras</a>
                <table class="table">
                <thead>
                <tr>
                <th>id_freno</th>
                <th>tipo</th>
                <th>precio</th>
                <th>oferta</th>
                </tr>
                </thead>
                <tbody>
              
                ${rows}
                </tbody>
                </table>
                <a href="#" onclick="formCrearfreno()">Crear</a>
                `;
        
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
}
//Eliminar freno
function eliminarfreno(id_freno) {
    if (confirm("¿Estás seguro de que deseas eliminar este freno?")) {
        fetch(`http://localhost/retoBMW-main/Controlador/admin/freno/eliminarfreno.php?id_freno=${id_freno}`)
            .then(() => {
                alert("freno eliminado correctamente.");
                cargardatosFreno(); // Recarga la lista de freno
            })
            .catch(error => {
                console.error("Error al eliminar el freno:", error);
                alert("Hubo un error al intentar eliminar el freno.");
            });
    }
}
// Modificar freno
function modificarfreno(id_freno, tipo, precio,oferta) {
    let html = `
        <a href="#" onclick="cargardatosllanta()">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/freno/editFreno.php" method="post">
            <div>
                <label for="id_freno"> id_freno</label>
                <input type="id_freno" id="id_freno" name="id_freno" value="${id_freno}" readonly>
            </div>
            <div>
                <label for="tipo">tipo</label>
                <input type="text" id="tipo" name="tipo" value="${tipo}" required>
            </div>
             <div>
                <label for="precio">precio</label>
                <input type="number" id="precio" name="precio" value="${precio}" required>
            </div>
             <div>
                <label for="oferta">oferta</label>
                <input type="number" id="oferta" name="oferta" value="${oferta}" required>
            </div>
            <button type="submit">Modificar</button>
        </form>
    `;

    document.getElementById('admin').innerHTML = html;
}
//Crear freno
function formCrearfreno() {
    let html = `
        <a href="#" onclick="cargarbotones(botones)">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/freno/crearFreno.php" method="post">
            <div>
              
                <label for="tipo">tipo:</label>
                <input type="text" id="tipo" name="tipo" required><br>

                 <label for="precio">precio:</label>
                <input type="number" id="precio" name="precio" required><br>

                 <label for="oferta">oferta:</label>
                <input type="number" id="oferta" name="oferta" required><br>
                
                
                <button type="submit">Crear</button>
            </div>
        </form>
    `;
    
    document.getElementById('admin').innerHTML = html;
}
//Codigo descunto
function cargardatosDescuento() {
    fetch("http://localhost/retoBMW-main/Controlador/admin/codigo_descuento/getdescuento.php") 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            descuentos = data; 
            mostrarDatosdescuento(descuentos);
           
        })
        .catch(error => {
            console.error("Error al obtener los Pedido:", error);
        });
}
//Mostrar descuento
function mostrarDatosdescuento(descuentos) {
    let rows = '';

   
    for (let descuento of descuentos) {
        rows += `
        <tr>
            <td>${descuento.id_codigo}</td>
            <td>${descuento.descuento_porcentaje}</td>
 
         
            <td>
            <a href="#" onclick="eliminardescuento(${descuento.id_codigo})">Eliminar</a> 
              <a href="#" onclick="modificardescuento('${descuento.id_codigo}', '${descuento.descuento_porcentaje}')">Modificar</a>
             </td>
        </tr>`;
    }
          
           
    let html  = `
              <a href="#" onclick="cargarbotones(botones)">Atras</a>
                <table class="table">
                <thead>
                <tr>
                <th>id_codigo</th>
                <th>descuento_porcentaje</th>
                </tr>
                </thead>
                <tbody>
              
                ${rows}
                </tbody>
                </table>
                <a href="#" onclick="formCreardescuento()">Crear</a>
                `;
        
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
}
//Eliminar descuento
function eliminardescuento(id_codigo) {
    if (confirm("¿Estás seguro de que deseas eliminar este descuento?")) {
        fetch(`http://localhost/retoBMW-main/Controlador/admin/codigo_descuento/eliminardescuento.php?id_codigo=${id_codigo}`)
            .then(() => {
                alert("descuento eliminado correctamente.");
                cargardatosDescuento(); // Recarga la lista de Descuento
            })
            .catch(error => {
                console.error("Error al eliminar el descuento:", error);
                alert("Hubo un error al intentar eliminar el descuento.");
            });
    }
}
// Modificar descuento
function modificardescuento(id_codigo, descuento_porcentaje) {
    let html = `
        <a href="#" onclick="cargardatosllanta()">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/codigo_descuento/editDescuento.php" method="post">
            <div>
                <label for="id_codigo"> id_codigo</label>
                <input type="text" id="id_codigo" name="id_codigo" value="${id_codigo}" readonly>
            </div>
            <div>
                <label for="descuento_porcentaje">descuento_porcentaje</label>
                <input type="number" id="descuento_porcentaje" name="descuento_porcentaje" value="${descuento_porcentaje}" required>
            </div>
            <button type="submit">Modificar</button>
        </form>
    `;

    document.getElementById('admin').innerHTML = html;
}
//Crear descuento
function formCreardescuento() {
    let html = `
        <a href="#" onclick="cargarbotones(botones)">Atrás</a>
        <form action="http://localhost/retoBMW-main/Controlador/admin/codigo_descuento/creaDescuento.php" method="post">
            <div>
              
                <label for="id_codigo">id_codigo:</label>
                <input type="text" id="id_codigo" name="id_codigo" required
                minlength="6" maxlength="6" 
                pattern="[A-Z0-9]{6}" 
                 title="El código debe contener exactamente 6 caracteres, en mayúsculas y números">
                 <br>


                 <label for="descuento_porcentaje">descuento_porcentaje:</label>
                <input type="number" id="descuento_porcentaje" name="descuento_porcentaje" required><br>

        
                
                <button type="submit">Crear</button>
            </div>
        </form>
    `;
    
    document.getElementById('admin').innerHTML = html;
}
//Producto
function cargardatosProducto() {
    fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getproducto.php") 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            productos = data; 
            mostrarDatosproducto(productos);
           
        })
        .catch(error => {
            console.error("Error al obtener los Pedido:", error);
        });
}
//Mostrar producto
function mostrarDatosproducto(productos) {
    let rows = '';

   
    for (let producto of productos) {
        rows += `
        <tr>
            <td>${producto.id_producto_final}</td>
            <td>${producto.nombre_modelo}</td>
            <td>${producto.nombre_motor}</td>
            <td>${producto.nombre_suspension}</td>
            <td>${producto.nombre_llanta}</td>
            <td>${producto.nombre_freno}</td>
            <td>${producto.precio_total}</td>
            <td>${producto.nombre_producto}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.img}</td>
         
            <td>
            <a href="#" onclick="eliminarproducto(${producto.id_producto_final})">Eliminar</a> 
              <a href="#" onclick="modificarproducto('${producto.id_producto_final}', '${producto.nombre_modelo}', '${producto.nombre_motor}', '${producto.nombre_suspension}', '${producto.nombre_llanta}', '${producto.nombre_freno}', '${producto.precio_total}', '${producto.nombre_producto}', '${producto.cantidad}', '${producto.img}')">Modificar</a>
             </td>
        </tr>`;
    }
          
           
    let html  = `
              <a href="#" onclick="cargarbotones(botones)">Atras</a>
                <table class="table">
                <thead>
                <tr>
                <th>id_producto_final</th>
                <th>nombre_modelo</th>
                <th>nombre_motor</th>
                <th>nombre_suspension</th>
                <th>nombre_llanta</th>
                <th>nombre_freno</th>
                <th>precio_total</th>
                <th>nombre_producto</th>
                <th>cantidad</th>
                <th>img</th>
                </tr>
                </thead>
                <tbody>
              
                ${rows}
                </tbody>
                </table>
                <a href="#" onclick="formCrearproducto()">Crear</a>
                `;
        
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
}

//Eliminar producto
function eliminarproducto(id_producto_final) {
    if (confirm("¿Estás seguro de que deseas eliminar este Producto?")) {
        fetch(`http://localhost/retoBMW-main/Controlador/admin/producto_final/eliminarProducto.php?id_producto_final=${id_producto_final}`)
            .then(() => {
                alert("descuento eliminado correctamente.");
                cargardatosProducto(); // Recarga la lista de Producto
            })
            .catch(error => {
                console.error("Error al eliminar el Producto:", error);
                alert("Hubo un error al intentar eliminar el Producto.");
            });
    }
}
// Modificar producto
function modificarproducto(id_producto_final, nombre_modelo, nombre_motor, nombre_suspension, nombre_llanta, nombre_freno, precio_total, nombre_producto, cantidad, img) {
    // Cargar las opciones de los modelos, motores, suspensiones, llantas y frenos desde el servidor
    Promise.all([
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getModelos.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getMotores.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getSuspensiones.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getLlanta.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getFrenos.php")
    ])
    .then(([modelosResp, motoresResp, suspensionesResp, llantasResp, frenosResp]) => {
        return Promise.all([
            modelosResp.json(),
            motoresResp.json(),
            suspensionesResp.json(),
            llantasResp.json(),
            frenosResp.json()
        ]);
    })
    .then(([modelos, motores, suspensiones, llantas, frenos]) => {
      
        const generarOpciones = (items, selectedId) => {
            return items.map(item => 
                `<option value="${item.id}" ${item.id === selectedId ? 'selected' : ''}>${item.nombre}</option>`
            ).join('');
        };

        // Generar el HTML del formulario con los menús desplegables
        let html = `
            <a href="#" onclick="cargardatosProducto()">Atrás</a>
            <form action="http://localhost/retoBMW-main/Controlador/admin/producto_final/editProducto.php" method="post">
                <div>
                    <label for="id_producto_final">ID Producto Final</label>
                    <input type="text" id="id_producto_final" name="id_producto_final" value="${id_producto_final}" readonly>
                </div>
                <div>
                    <label for="id_modelo">Modelo</label>
                    <select id="id_modelo" name="id_modelo" required>
                        ${generarOpciones(modelos, id_modelo)}
                    </select>
                </div>
                <div>
                    <label for="id_motor">Motor</label>
                    <select id="id_motor" name="id_motor" required>
                        ${generarOpciones(motores, id_motor)}
                    </select>
                </div>
                <div>
                    <label for="id_suspension">Suspensión</label>
                    <select id="id_suspension" name="id_suspension" required>
                        ${generarOpciones(suspensiones, id_suspension)}
                    </select>
                </div>
                <div>
                    <label for="id_llanta">Llanta</label>
                    <select id="id_llanta" name="id_llanta" required>
                        ${generarOpciones(llantas, id_llanta)}
                    </select>
                </div>
                <div>
                    <label for="id_freno">Freno</label>
                    <select id="id_freno" name="id_freno" required>
                        ${generarOpciones(frenos, id_freno)}
                    </select>
                </div>
                <div>
                    <label for="precio_total">Precio Total</label>
                    <input type="number" id="precio_total" name="precio_total" value="${precio_total}" required>
                </div>
                <div>
                    <label for="nombre_producto">Nombre Producto</label>
                    <input type="text" id="nombre_producto" name="nombre_producto" value="${nombre_producto}" required>
                </div>
                <div>
                    <label for="cantidad">Cantidad</label>
                    <input type="number" id="cantidad" name="cantidad" value="${cantidad}" required>
                </div>
                <div>
                    <label for="img">Imagen</label>
                    <input type="text" id="img" name="img" value="${img}" required>
                </div>
                <button type="submit">Modificar</button>
            </form>
        `;

        // Inserta el formulario generado en el HTML
        document.getElementById('admin').innerHTML = html;
    })
    .catch(error => {
        console.error("Error al obtener las opciones para modificar el producto:", error);
    });
}

//Crear producto
function formCrearproducto() {
    Promise.all([
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getModelos.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getMotores.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getSuspensiones.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getLlanta.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getFrenos.php")
    ])
    .then(([modelosResp, motoresResp, suspensionesResp, llantasResp, frenosResp]) => {
        return Promise.all([
            modelosResp.json(),
            motoresResp.json(),
            suspensionesResp.json(),
            llantasResp.json(),
            frenosResp.json()
        ]);
    })
    .then(([modelos, motores, suspensiones, llantas, frenos]) => {
        const generarOpcionesModelos = (modelos) => {
            return modelos.map(modelo => 
                `<option value="${modelo.id_modelo}">${modelo.nombre_modelo}</option>`
            ).join('');
        };

        const generarOpcionesMotores = (motores) => {
            return motores.map(motor => 
                `<option value="${motor.id_motor}">${motor.nombre_motor}</option>`
            ).join('');
        };

        const generarOpcionesSuspensiones = (suspensiones) => {
            return suspensiones.map(suspension => 
                `<option value="${suspension.id_suspension}">${suspension.nombre_suspension}</option>`
            ).join('');
        };

        const generarOpcionesLlantas = (llantas) => {
            return llantas.map(llanta => 
                `<option value="${llanta.id_llanta}">${llanta.nombre_llanta}</option>`
            ).join('');
        };

        const generarOpcionesFrenos = (frenos) => {
            return frenos.map(freno => 
                `<option value="${freno.id_freno}">${freno.tipo}</option>`
            ).join('');
        };

        let html = `
            <a href="#" onclick="cargarbotones(botones)">Atrás</a>
            <form action="http://localhost/retoBMW-main/Controlador/admin/producto_final/crearProducto.php" method="GET">

                <div>
                    <label for="id_modelo">Modelo</label>
                    <select id="id_modelo" name="id_modelo" required>
                        ${generarOpcionesModelos(modelos)}
                    </select>
                </div>
                <div>
                    <label for="id_motor">Motor</label>
                    <select id="id_motor" name="id_motor" required>
                        ${generarOpcionesMotores(motores)}
                    </select>
                </div>
                <div>
                    <label for="id_suspension">Suspensión</label>
                    <select id="id_suspension" name="id_suspension" required>
                        ${generarOpcionesSuspensiones(suspensiones)}
                    </select>
                </div>
                <div>
                    <label for="id_llanta">Llanta</label>
                    <select id="id_llanta" name="id_llanta" required>
                        ${generarOpcionesLlantas(llantas)}
                    </select>
                </div>
                <div>
                    <label for="id_freno">Freno</label>
                    <select id="id_freno" name="id_freno" required>
                        ${generarOpcionesFrenos(frenos)}
                    </select>
                </div>
                <div>
                    <label for="precio_total">Precio Total</label>
                    <input type="number" id="precio_total" name="precio_total" required>
                </div>
                <div>
                    <label for="nombre_producto">Nombre Producto</label>
                    <input type="text" id="nombre_producto" name="nombre_producto" required>
                </div>
                <div>
                    <label for="cantidad">Cantidad</label>
                    <input type="number" id="cantidad" name="cantidad" required>
                </div>
                <div>
                    <label for="img">Imagen URL</label>
                    <input type="text" id="img" name="img" required>
                </div>
                <button type="submit">Crear Producto</button>
            </form>
        `;

        document.getElementById('admin').innerHTML = html;
    })
    .catch(error => {
        console.error("Error al obtener los datos para crear el producto:", error);
    });
}





document.addEventListener("DOMContentLoaded", function() {
    cargarbotones(botones);
});