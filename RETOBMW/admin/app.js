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
        cargardatosproducto_final()
       
    }else if (boton === "pedido") {
        cargardatospedido()
       
    }else if (boton === "motor") {
        cargardatosmotor()
       
    }else if (boton === "llanta") {
        cargardatosllanta()
       
    }else if (boton === "freno") {
        cargardatosfreno()
       
    }else if (boton === "codigo_descuento") {
        cargardatoscodigo_descuento()
       
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

document.addEventListener("DOMContentLoaded", function() {
    cargarbotones(botones);
});