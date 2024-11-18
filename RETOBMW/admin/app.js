
var botones = [
    "Descuento",
    "Freno",
    "Kit aerodinamico",
    "Llanta",
    "Modelo",
    "Motor",
    "Pedido",
    "Producto",
    "Suspension",
    "Usuario",
    "Carrito"
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

// Bootstrap

// Cargar botones
function cargarbotones(botones) {
    let tabs = '';
    for (let boton of botones) {
        tabs += `
            <li class="nav-item" role="presentation">
                <button 
                    class="nav-link" 
                    id="${boton}-tab" 
                    data-bs-toggle="tab" 
                    data-bs-target="#${boton}" 
                    type="button" 
                    role="tab" 
                    aria-controls="${boton}" 
                    aria-selected="false"
                    onclick="verificar('${boton}')">
                    ${boton}
                </button>
            </li>
        `;
    }

    let html = `
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            ${tabs}
        </ul>
        <div class="tab-content" id="myTabContent">
        </div>
    `;

    document.getElementById('botones').innerHTML = html;

    const firstTab = document.querySelector('.nav-link');
    if (firstTab) {
        firstTab.classList.add('active');
    }
}




//verificar botones
function verificar(boton) {
    console.log("Button clicked: " + boton);

    if (boton === "Usuario") {
        // Si el botón es "usuario", cargamos los datos de los usuarios
        cargardatosusuarios();
    } else if (boton === "Suspension") {
        cargardatosuspension()
       
    } else if (boton === "Producto") {
        cargardatosProducto()
       
    }else if (boton === "Pedido") {
        cargardatosPedido()
       
    }else if (boton === "Motor") {
        cargardatosmotor()
       
    }else if (boton === "Llanta") {
        cargardatosllanta()
       
    }else if (boton === "Freno") {
        cargardatosFreno()
       
    }else if (boton === "Kit aerodinamico") {
        cargardatosKit()
       
    }else if (boton === "Descuento") {
        cargardatosDescuento()
       
    }else if (boton === "Modelo") {
        cargardatosModelos()
       
    }else if (boton === "Carrito") {
        cargardatosCarritos()
       
    }else{
    // Si es otro botón, puedes hacer lo que necesites cargardatosCarritos
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
            <th scope="row">${usuario.id_usuario}</th>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.usuario}</td>
            <td>${usuario.contrasena}</td>
            <td>${usuario.email}</td>
            <td>${usuario.direccion}</td>
            <td>${usuario.rol}</td>
            <td>
              <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter" onclick="eliminarUsuario('${usuario.id_usuario}','${usuario.usuario}')">Eliminar</button> 
                <button type="button" class="btn btn-primary data-toggle="modal" data-target="#exampleModalCenter" onclick="modificarUsuario('${usuario.id_usuario}', '${usuario.nombre}', '${usuario.apellidos}', '${usuario.usuario}', '${usuario.contrasena}', '${usuario.email}', '${usuario.direccion}', '${usuario.rol}')">Modificar</button>
            </td>
        </tr>`;
    }

    let html = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">id_usuario</th>
                    <th scope="col">nombre</th>
                    <th scope="col">apellidos</th>
                    <th scope="col">usuario</th>
                    <th scope="col">contraseña</th>
                    <th scope="col">email</th>
                    <th scope="col">direccion</th>
                    <th scope="col">rol</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
        
        <button type="button" class="btn btn-secondary" data-toggle="modal"  data-bs-target="#exampleModalCenter"onclick="formCrearUsuario()">
Crear
</button>
    `;

    document.getElementById('admin').innerHTML = html; 
}

//Eliminar Usuarios
function eliminarUsuario(id_usuario, usuario) {
    let html = `
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Eliminar cliente usuario: '${usuario}'</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="Elimina" onclick="confirmarEliminarUsuario(${id_usuario})">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('modal').innerHTML = html;
    let modal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
    modal.show();
}


function confirmarEliminarUsuario(id_usuario) {
    // Verificar que el id_usuario esté presente
    if (!id_usuario) {
        AlertaError();
        return;
    }

    // Enviar el id_usuario para verificar si existe en la tabla correspondiente
    fetch(`http://localhost/retoBMW-main/Controlador/admin/usuario/ErrorUsuaurio/ErrorPedido.php?id_usuario=${id_usuario}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        // Si el usuario tiene pedidos asociados (data.existe es true)
        if (data.existe) {
            AlertaErrorFatal(data.mensaje); // Muestra mensaje si el usuario no se puede eliminar
        } else {
            // Eliminar el usuario si no tiene pedidos asociados
            fetch(`http://localhost/retoBMW-main/Controlador/admin/usuario/eliminarusuario.php?id_usuario=${id_usuario}`)
                .then(response => {
                    if (response.ok) {
                        AlertacorrectamenteElimina(); // Muestra mensaje de éxito
                        cargardatosusuarios(); // Recarga los datos de los usuarios
                    } else {
                        AlertaError("No se pudo eliminar el usuario."); // Si hay error al eliminar
                    }
                })
                .catch(err => {
                    AlertaErrorFatal(err); // Manejo de errores en la solicitud de eliminación
                });
        }
    })
    .catch(err => {
        AlertaErrorFatal(err); // Manejo de errores en la verificación de existencia
    });
}







//Modificar Usuarios
function modificarUsuario(id_usuario, nombre, apellidos, usuario, contrasena, email, direccion, rol) {
    let html = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modificar Usuario</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formModificarUsuario">
                            <div class="form-group">
                                <input type="hidden" name="id_usuario" value="${id_usuario}">
                                <label for="nombre" class="form-label">Nombre:</label>
                                <input type="text" class="form-control" id="nombre" name="nombre" value="${nombre}" required><br>
                                <label for="apellidos" class="form-label">Apellidos:</label>
                                <input type="text" class="form-control" id="apellidos" name="apellidos" value="${apellidos}" required><br>
                                <label for="usuario" class="form-label">Usuario:</label>
                                <input type="text" class="form-control" id="usuario" name="usuario" value="${usuario}" required><br>
                                <label for="contrasena" class="form-label">Contraseña:</label>
                                <input type="password" class="form-control" id="contrasena" name="contrasena" value="${contrasena}" required><br>
                                <label for="email" class="form-label">Email:</label>
                                <input type="email" class="form-control" id="email" name="email" value="${email}" required><br>
                                <label for="direccion" class="form-label">Dirección:</label>
                                <input type="text" class="form-control" id="direccion" name="direccion" value="${direccion}" required><br>
                                <label for="rol" class="form-label">Rol:</label>
                                <input type="text" class="form-control" id="rol" name="rol" value="${rol}" required><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Modificar Usuario</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('modal').innerHTML = html;

    let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();

    document.getElementById('formModificarUsuario').addEventListener('submit', function (event) {
        event.preventDefault();
        
        const formData = new FormData(this);
        fetch('http://localhost/retoBMW-main/Controlador/admin/usuario/editUsuario.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                console.log("div")
                AlertacorrectamenteModificado();
                cargardatosusuarios();
            } else {
                AlertaError();
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    });
}




//Crear Usuarios
function formCrearUsuario() {
    let html = `
       <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Crear Usuario</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formCrearUsuario" method="post">
                            <div class="form-group">
                                <input type="hidden" name="id_usuario">
                                <label for="nombre" class="form-label">Nombre:</label>
                                <input type="text" class="form-control" id="nombre" name="nombre" required><br>
                                <label for="apellidos" class="form-label">Apellidos:</label>
                                <input type="text" class="form-control" id="apellidos" name="apellidos" required><br>
                                <label for="usuario" class="form-label">Usuario:</label>
                                <input type="text" class="form-control" id="usuario" name="usuario" required><br>
                                <label for="contrasena" class="form-label">Contraseña:</label>
                                <input type="password" class="form-control" id="contrasena" name="contrasena" required><br>
                                <label for="email" class="form-label">Email:</label>
                                <input type="email" class="form-control" id="email" name="email" required><br>
                                <label for="direccion" class="form-label">Dirección:</label>
                                <input type="text" class="form-control" id="direccion" name="direccion" required><br>
                                <label for="rol" class="form-label">Rol:</label>
                                <input type="text" class="form-control" id="rol" name="rol" required><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Crear Usuario</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal').innerHTML = html;

    // Inicializamos el modal
    let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
    
    document.getElementById('formCrearUsuario').addEventListener('submit', function (event) {
        event.preventDefault();  // Evita que se envíe el formulario de forma predeterminada
    
        // Creamos FormData a partir del formulario
        const formData = new FormData(document.getElementById('formCrearUsuario'));
    
        const usuario = formData.get('usuario');
        const email = formData.get('email');
    
        // Validamos si el usuario existe
        fetch(`http://localhost/retoBMW-main/Controlador/admin/usuario/ErrorUsuaurio/ErrorUsuario.php?usuario=${usuario}`, {
            method: 'GET' // Cambié el método a 'GET' si estás pasando parámetros por URL, o mantenlo 'POST' si lo prefieres con body
        })
        .then(response => response.json())
        .then(data => {
            if (data.existe) {
                AlertaError_usuario_existe(); // Si el usuario existe, muestra un error
            } else {
                // Si el usuario no existe, verifica el email
                fetch(`http://localhost/retoBMW-main/Controlador/admin/usuario/ErrorUsuaurio/ErrorEmail.php?email=${email}`, {
                    method: 'GET' 
                })
                .then(response => response.json())
                .then(data => {
                    if (data.existe) {
                        AlertaError_email_existe(); // Si el email ya existe
                    } else {
                        // Si todo es válido, creamos el usuario
                        fetch('http://localhost/retoBMW-main/Controlador/admin/usuario/crearUsuario.php', {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => {
                            if (response.ok) {
                                modal.hide();
                                AlertacorrectamenteCreado();
                                cargardatosusuarios();
                            } else {
                                AlertaError();
                            }
                        })
                        .catch(error => {
                            AlertaErrorFatal(error);
                        });
                    }
                })
                .catch(error => {
                    AlertaErrorFatal(error);
                });
            }
        })
        .catch(error => {
            AlertaErrorFatal(error); // Si hay un error con la solicitud
        });
        
    });
    
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
        if (suspension.precio === null) {
            suspension.precio = 0;
        }
        if (suspension.oferta === null) {
            suspension.oferta = 0;
        }
        rows += `
        <tr>
            <td scope="row">${suspension.id_suspension}</td>
            <td>${suspension.nombre_suspension}</td>
            <td>${suspension.tipo}</td>
            <td>${suspension.precio}€</td>
            <td>${suspension.oferta}%</td>
            <td>
             <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter" onclick="eliminarSuspension('${suspension.id_suspension}','${suspension.nombre_suspension}')">Eliminar</button> 
              <button type="button" class="btn btn-primary data-toggle="modal" data-target="#exampleModalCenter" onclick="modificarSuspension('${suspension.id_suspension}', '${suspension.nombre_suspension}', '${suspension.tipo}', '${suspension.precio}', '${suspension.oferta}')">Modificar</button>
             
            </td>
        </tr>`;
    }

    //  estructura HTML completa
    let html = `
       
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
          <button type="button" class="btn btn-secondary" data-toggle="modal"  data-bs-target="#exampleModalCenter"onclick="formCrearSuspension()">
         Crear
         </button>
        
    `;

    // Insertar en el elemento con ID 'admin'
    document.getElementById('admin').innerHTML = html;
}
function eliminarSuspension(id_suspension, nombre_suspension) {
    let html = `
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Eliminar Suspension: '${nombre_suspension}'</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ¿Estás seguro de que deseas eliminar esta Suspension? Esta acción no se puede deshacer.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="Elimina" onclick="confirmarEliminarSuspension(${id_suspension})">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('modal').innerHTML = html;
    let modal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
    modal.show();
}
function confirmarEliminarSuspension(id_suspension) {
    // Verificar que el id_suspension esté presente
    if (!id_suspension) {
        AlertaError(); // Si no se pasa el id_suspension, muestra un error
        return;
    }

    // Enviar el id_suspension para verificar si existe en la tabla correspondiente
    fetch(`http://localhost/retoBMW-main/Controlador/admin/suspension/ErrorSuspension/Errorsuspension.php?id_suspension=${id_suspension}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        // Si la suspensión está asociada a algún dato (data.existe es true)
        if (data.existe) {
            AlertaErrorFatal(data.mensaje); // Muestra el mensaje de error si la suspensión no puede eliminarse
        } else {
            // Eliminar la suspensión si no está asociada a ningún dato
            fetch(`http://localhost/retoBMW-main/Controlador/admin/suspension/eliminarSuspension.php?id_suspension=${id_suspension}`)
                .then(response => {
                    if (response.ok) {
                        AlertacorrectamenteElimina(); // Muestra mensaje de éxito si se eliminó correctamente
                        cargardatosuspension(); // Recarga los datos de suspensiones
                    } else {
                        AlertaError("No se pudo eliminar la suspensión."); // Si hay error al eliminar
                    }
                })
                .catch(err => {
                    AlertaErrorFatal(err); // Manejo de errores en la solicitud de eliminación
                });
        }
    })
    .catch(err => {
        AlertaErrorFatal(err); // Manejo de errores en la verificación de existencia
    });
}






// Modificar suspension
function modificarSuspension(id_suspension, nombre_suspension, tipo, precio, oferta) {
    let html = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modificar Suspensión</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formModificarSuspension">
                            <div class="form-group">
                                <input type="hidden" name="id_suspension" value="${id_suspension}">
                                <label for="nombre_suspension" class="form-label">Nombre Suspensión:</label>
                                <input type="text" class="form-control" id="nombre_suspension" name="nombre_suspension" value="${nombre_suspension}" required><br>
                                <label for="tipo" class="form-label">Tipo:</label>
                                <input type="text" class="form-control" id="tipo" name="tipo" value="${tipo}" required><br>
                                <label for="precio" class="form-label">Precio:</label>
                                <input type="number" class="form-control" id="precio" name="precio" value="${precio}" required><br>
                                <label for="oferta" class="form-label">Oferta:</label>
                                <input type="number" class="form-control" id="oferta" name="oferta" value="${oferta}" required><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Modificar Suspensión</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('modal').innerHTML = html;
    let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();

    document.getElementById('formModificarSuspension').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch('http://localhost/retoBMW-main/Controlador/admin/suspension/editSuspension.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                AlertacorrectamenteModificado();
                cargardatosuspension();
            } else {
                AlertaError();
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    });
}


//Crear suspension
function formCrearSuspension() {
    let html = `
        <div class="modal fade" id="exampleModalSuspension" tabindex="-1" aria-labelledby="exampleModalLabelSuspension" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabelSuspension">Crear Suspensión</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formCrearSuspension" method="post">
                            <div class="form-group">
                                <label for="nombre_suspension" class="form-label">Nombre Suspensión:</label>
                                <input type="text" class="form-control" id="nombre_suspension" name="nombre_suspension" required><br>
                                
                                <label for="tipo" class="form-label">Tipo:</label>
                                <input type="text" class="form-control" id="tipo" name="tipo" required><br>
                                
                                <label for="precio" class="form-label">Precio:</label>
                                <input type="text" class="form-control" id="precio" name="precio" required><br>
                                
                                <label for="oferta" class="form-label">Oferta:</label>
                                <input type="text" class="form-control" id="oferta" name="oferta" required><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Crear Suspensión</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal').innerHTML = html;

    let modal = new bootstrap.Modal(document.getElementById('exampleModalSuspension'));
    modal.show();

    document.getElementById('formCrearSuspension').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('http://localhost/retoBMW-main/Controlador/admin/suspension/crearSuspension.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                AlertacorrectamenteCreado();
                cargardatosuspension();
            } else {
                AlertaError();
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    });
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
        if (motor.precio === null) {
            motor.precio = 0;
        }
        rows += `
        <tr>
            <td scope="row"> ${motor.id_motor}</td>
            <td>${motor.nombre_motor}</td>
            <td>${motor.caballos} CV</td>
            <td>${motor.cilindrada} CC</td>
            <td>${motor.precio} €</td>
            <td>${motor.combustion}</td>
            <td>
                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter" onclick="eliminarMotor('${motor.id_motor}','${motor.nombre_motor}')">Eliminar</button> 

                 <button type="button" class="btn btn-primary data-toggle="modal" data-target="#exampleModalCenter" onclick="modificarmotor('${motor.id_motor}', '${motor.nombre_motor}', '${motor.caballos}', '${motor.cilindrada}', '${motor.precio}', '${motor.combustion}')">Modificar</button>
            </td>
        </tr>`;
    }

    let html = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID Motor</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Caballos</th>
                    <th scope="col">Cilindrada</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Combustión</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
           <button type="button" class="btn btn-secondary" data-toggle="modal"  data-bs-target="#exampleModalCenter"onclick="formCrearMotor()"> Crear</button>
    `;

    document.getElementById('admin').innerHTML = html;
}

//Eliminar motor   
function eliminarMotor(id_motor, nombre_motor) {
    let html = `
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Eliminar Motor: ${nombre_motor}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ¿Estás seguro de que deseas eliminar este motor? Esta acción no se puede deshacer.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="confirmarEliminarMotor(${id_motor})">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById('modal').innerHTML = html;

    let modal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
    modal.show();
}


function confirmarEliminarMotor(id_motor) {
    if (!id_motor) {
        AlertaError();
        return;
    }

    fetch(`http://localhost/retoBMW-main/Controlador/admin/motor/Errormotor/Errormotor.php?id_motor=${id_motor}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.existe) {
            AlertaErrorFatal(data.mensaje);
        } else {
            fetch(`http://localhost/retoBMW-main/Controlador/admin/motor/eliminarmotor.php?id_motor=${id_motor}`, {
                method: 'GET'
            })
            .then(response => {
                if (response.ok) {
                    AlertacorrectamenteElimina();
                    cargardatosmotor();
                } else {
                    AlertaError("No se pudo eliminar el motor.");
                }
            })
            .catch(err => {
                AlertaErrorFatal(err);
            });
        }
    })
    .catch(err => {
        AlertaErrorFatal(err);
    });
}


// Modificar motor
function modificarmotor(id_motor, nombre_motor, caballos, cilindrada, precio, combustion) {
    let html = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modificar Motor</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formModificarMotor">
                            <div class="form-group">
                                <input type="hidden" name="id_motor" value="${id_motor}">
                                <label for="nombre_motor" class="form-label">Nombre Motor:</label>
                                <input type="text" class="form-control" id="nombre_motor" name="nombre_motor" value="${nombre_motor}" required><br>
                                <label for="caballos" class="form-label">Caballos:</label>
                                <input type="number" class="form-control" id="caballos" name="caballos" value="${caballos}" required><br>
                                <label for="cilindrada" class="form-label">Cilindrada:</label>
                                <input type="number" class="form-control" id="cilindrada" name="cilindrada" value="${cilindrada}" required><br>
                                <label for="precio" class="form-label">Precio:</label>
                                <input type="number" class="form-control" id="precio" name="precio" value="${precio}" required><br>
                                <label for="combustion" class="form-label">Combustión:</label>
                                <input type="text" class="form-control" id="combustion" name="combustion" value="${combustion}" required><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Modificar Motor</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('modal').innerHTML = html;
    let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();

    document.getElementById('formModificarMotor').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch('http://localhost/retoBMW-main/Controlador/admin/motor/editMotor.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                AlertacorrectamenteModificado();
                cargardatosmotor();
            } else {
                AlertaError();
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    });
}

//Crear motor
function formCrearMotor() {
    let html = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Crear Motor</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formCrearMotor">
                            <div class="form-group">
                                <label for="nombre_motor" class="form-label">Nombre Motor:</label>
                                <input type="text" class="form-control" id="nombre_motor" name="nombre_motor" required><br>

                                <label for="caballos" class="form-label">Caballos:</label>
                                <input type="number" class="form-control" id="caballos" name="caballos" required><br>

                                <label for="cilindrada" class="form-label">Cilindrada:</label>
                                <input type="number" class="form-control" id="cilindrada" name="cilindrada" required><br>

                                <label for="precio" class="form-label">Precio:</label>
                                <input type="number" class="form-control" id="precio" name="precio" required><br>

                                <label for="combustion" class="form-label">Combustión:</label>
                                <input type="text" class="form-control" id="combustion" name="combustion" required><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Crear Motor</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal').innerHTML = html;
    let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();

    document.getElementById('formCrearMotor').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        fetch('http://localhost/retoBMW-main/Controlador/admin/motor/crearMotor.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                AlertacorrectamenteCreado();
                cargardatosmotor();
            } else {
                AlertaError();
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    });
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
        if (llanta.precio === null) {
            llanta.precio = 0;
        }
        if (llanta.oferta === null) {
            llanta.oferta = 0;
        }
        rows += `
        <tr>
            <td scope="row">${llanta.id_llanta}</td>
            <td>${llanta.nombre_llanta}</td>
            <td>${llanta.tipo}</td>
            <td>${llanta.precio}€</td>
            <td>${llanta.oferta}%</td>
            <td>
                  <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter" onclick="eliminarLlanta('${llanta.id_llanta}','${llanta.nombre_llanta}')">Eliminar</button> 
                 <button type="button" class="btn btn-primary data-toggle="modal" data-target="#exampleModalCenter" onclick="modificar_llanta('${llanta.id_llanta}', '${llanta.nombre_llanta}', '${llanta.tipo}', '${llanta.precio}', '${llanta.oferta}')">Modificar</button>
            </td>
        </tr>`;
    }

    let html = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID Llanta</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Oferta</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
         <button type="button" class="btn btn-secondary" data-toggle="modal"  data-bs-target="#exampleModalCenter"onclick="formCrearllanta()"> Crear</button>
    `;

    document.getElementById('admin').innerHTML = html;
}

//Eliminar llanta
function eliminarLlanta(id_llanta, nombre_llanta) {
    let html = `
    <div class="modal fade" id="exampleModalLlanta" tabindex="-1" role="dialog" aria-labelledby="exampleModalLlantaTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLlantaTitle">Eliminar Llanta: ${nombre_llanta}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ¿Estás seguro de que deseas eliminar esta llanta? Esta acción no se puede deshacer.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="confirmarEliminarLlanta(${id_llanta})">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById('modal').innerHTML = html;

    let modal = new bootstrap.Modal(document.getElementById('exampleModalLlanta'));
    modal.show();
}

function confirmarEliminarLlanta(id_llanta) {
    if (id_llanta) {
        // Verificar si la llanta está asociada a un producto o a otro recurso
        fetch(`http://localhost/retoBMW-main/Controlador/admin/llanta/Errorllanta/Errorllanta.php?id_llanta=${id_llanta}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.existe) {
                AlertaErrorFatal(data.mensaje); // Muestra el mensaje si la llanta no se puede eliminar
            } else {
                // Proceder a eliminar la llanta si no está asociada a un producto
                fetch(`http://localhost/retoBMW-main/Controlador/admin/llanta/eliminarllanta.php?id_llanta=${id_llanta}`, {
                    method: 'GET'
                })
                .then(response => {
                    if (response.ok) {
                        AlertacorrectamenteElimina(); // Muestra alerta de éxito
                        cargardatosllanta(); // Recarga la lista de llantas
                    } else {
                        AlertaError(); // Muestra alerta de error si la respuesta no es exitosa
                    }
                })
                .catch(error => {
                    AlertaErrorFatal(error); // Muestra alerta de error fatal si hay un problema en la petición
                });
            }
        })
        .catch(error => {
            AlertaErrorFatal(error); // Muestra alerta de error fatal si hay un problema con la verificación
        });
    } else {
        AlertaError(); // Muestra alerta si no se proporciona un id_llanta válido
    }
}


// Modificar llanta
function modificar_llanta(id_llanta, nombre_llanta, tipo, precio, oferta) {
    let html = `
        <div class="modal fade" id="exampleModalLlanta" tabindex="-1" aria-labelledby="exampleModalLlantaLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLlantaLabel">Modificar Llanta</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formModificarLlanta" method="post">
                            <div class="mb-3">
                                <input type="hidden" name="id_llanta" value="${id_llanta}">
                                <label for="nombre_llanta" class="form-label">Nombre Llanta:</label>
                                <input type="text" class="form-control" id="nombre_llanta" name="nombre_llanta" value="${nombre_llanta}" required><br>
                            </div>
                            <div class="mb-3">
                                <label for="tipo" class="form-label">Tipo:</label>
                                <input type="text" class="form-control" id="tipo" name="tipo" value="${tipo}" required><br>
                            </div>
                            <div class="mb-3">
                                <label for="precio" class="form-label">Precio:</label>
                                <input type="number" class="form-control" id="precio" name="precio" value="${precio}" required><br>
                            </div>
                            <div class="mb-3">
                                <label for="oferta" class="form-label">Oferta:</label>
                                <input type="number" class="form-control" id="oferta" name="oferta" value="${oferta}" required><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Modificar Llanta</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal').innerHTML = html;
    let modal = new bootstrap.Modal(document.getElementById('exampleModalLlanta'));
    modal.show();

    document.getElementById('formModificarLlanta').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch('http://localhost/retoBMW-main/Controlador/admin/llanta/editllanta.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                AlertacorrectamenteModificado();
                cargardatosllanta();
            } else {
                AlertaError();
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    });
}


//Crear llanta
function formCrearllanta() {
    let html = `
        <div class="modal fade" id="exampleModallanta" tabindex="-1" aria-labelledby="exampleModallantaLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModallantaLabel">Crear Llanta</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formCrearllanta" method="post">
                            <div class="form-group">
                                <label for="nombre_llanta" class="form-label">Nombre Llanta:</label>
                                <input type="text" class="form-control" id="nombre_llanta" name="nombre_llanta" required><br>
                                
                                <label for="tipo" class="form-label">Tipo:</label>
                                <input type="text" class="form-control" id="tipo" name="tipo" required><br>
                                
                                <label for="precio" class="form-label">Precio:</label>
                                <input type="number" class="form-control" id="precio" name="precio" required><br>
                                
                                <label for="oferta" class="form-label">Oferta:</label>
                                <input type="number" class="form-control" id="oferta" name="oferta" required><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Crear Llanta</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal').innerHTML = html;

    let modal = new bootstrap.Modal(document.getElementById('exampleModallanta'));
    modal.show();

    document.getElementById('formCrearllanta').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('http://localhost/retoBMW-main/Controlador/admin/llanta/crearllanta.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                AlertacorrectamenteCreado();
                cargardatosllanta();
            } else {
                AlertaError();
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    });
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
            <td scope="row">${pedido.id_pedido}</td>
            <td>${pedido.usuario}</td>
            <td>${pedido.nombre_producto}</td>
            <td>${pedido.fecha_pedido}</td>
            <td>${pedido.direccion_entrega}</td>
            <td>${pedido.descuento_porcentaje}%</td>
            <td>


                 <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter" onclick="eliminarPedido('${pedido.id_pedido}','${pedido.usuario}','${pedido.nombre_producto}')">Eliminar</button> 
                  <button type="button" class="btn btn-primary data-toggle="modal" data-target="#exampleModalCenter" onclick="modificarpedido('${pedido.id_pedido}', '${pedido.usuario}', '${pedido.nombre_producto}', '${pedido.fecha_pedido}', '${pedido.direccion_entrega}', '${pedido.descuento_porcentaje}')">Modificar</button>
            </td>
        </tr>`;
    }
    
    let html = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID Pedido</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Fecha Pedido</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Descuento (%)</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
  
       
           <button type="button" class="btn btn-secondary" data-toggle="modal"  data-bs-target="#exampleModalCenter"onclick="formCrearpedido()"> Crear</button>
    `;
    
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
}
//Eliminar pedido
function eliminarPedido(id_pedido, usuario,nombre_producto) {
    let html = `
    <div class="modal fade" id="exampleModalPedido" tabindex="-1" role="dialog" aria-labelledby="exampleModalPedidoTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalPedidoTitle">Eliminar Pedido Del Usuario : ${usuario} <br>
                    Producto : ${nombre_producto}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ¿Estás seguro de que deseas eliminar este pedido? Esta acción no se puede deshacer.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="confirmarEliminarPedido(${id_pedido})">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    `;
    document.getElementById('modal').innerHTML = html;
    let modal = new bootstrap.Modal(document.getElementById('exampleModalPedido'));
    modal.show();
}

function confirmarEliminarPedido(id_pedido) {
    if (id_pedido) {
        fetch(`http://localhost/retoBMW-main/Controlador/admin/pedido/eliminarpedido.php?id_pedido=${id_pedido}`)
            .then(response => {
                if (response.ok) {
                    AlertacorrectamenteElimina();
                    cargardatosPedido();
                } else {
                    AlertaError();
                }
            })
            .catch(error => {
                AlertaErrorFatal(error);
            });
    } else {
        AlertaError();
    }
}

// Modificar pedido
function modificarpedido(id_pedido, usuario, id_producto_final, fecha_pedido, direccion_entrega, id_codigo) {
    Promise.all([
        fetch("http://localhost/retoBMW-main/Controlador/admin/pedido/getDescuento.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/pedido/getProducto.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/pedido/getUsuario.php")
    ])
    .then(([DescuentoResp, ProductoResp, UsuarioResp]) => {
        return Promise.all([
            DescuentoResp.json(),
            ProductoResp.json(),
            UsuarioResp.json()
        ]);
    })
    .then(([Descuentos, Productos, Usuarios]) => {
        const generarOpcionesDescuentos = (Descuentos) => {
            return Descuentos.map(descuento => 
                `<option value="${descuento.id_codigo}" ${descuento.id_codigo == id_codigo ? 'selected' : ''}>${descuento.descuento_porcentaje}</option>`
            ).join('');
        };

        const generarOpcionesProductos = (Productos) => {
            return Productos.map(producto => 
                `<option value="${producto.id_producto_final}" ${producto.id_producto_final == id_producto_final ? 'selected' : ''}>${producto.nombre_producto}</option>`
            ).join('');
        };

        const generarOpcionesUsuarios = (Usuarios) => {
            return Usuarios.map(usuarioObj => 
                `<option value="${usuarioObj.id_usuario}" ${usuarioObj.id_usuario == usuario ? 'selected' : ''}>${usuarioObj.usuario}</option>`
            ).join('');
        };

        let html = `
            <div class="modal fade" id="exampleModalModificarPedido" tabindex="-1" aria-labelledby="exampleModalModificarPedidoLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalModificarPedidoLabel">Modificar Pedido</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="formModificarPedido">
                                <div class="mb-3">
                                    <label for="id_pedido" class="form-label">ID Pedido</label>
                                    <input type="number" class="form-control" id="id_pedido" name="id_pedido" value="${id_pedido}" readonly>
                                </div>
                                <div class="mb-3">
                                    <label for="id_usuario" class="form-label">Usuario</label>
                                    <select class="form-select" id="id_usuario" name="id_usuario" required>
                                        ${generarOpcionesUsuarios(Usuarios)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="id_producto_final" class="form-label">Producto</label>
                                    <select class="form-select" id="id_producto_final" name="id_producto_final" required>
                                        ${generarOpcionesProductos(Productos)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="id_codigo" class="form-label">Descuento</label>
                                    <select class="form-select" id="id_codigo" name="id_codigo" required>
                                        ${generarOpcionesDescuentos(Descuentos)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="fecha_pedido" class="form-label">Fecha del Pedido</label>
                                    <input type="date" class="form-control" id="fecha_pedido" name="fecha_pedido" value="${fecha_pedido}" required>
                                </div>
                                <div class="mb-3">
                                    <label for="direccion_entrega" class="form-label">Dirección de Entrega</label>
                                    <input type="text" class="form-control" id="direccion_entrega" name="direccion_entrega" value="${direccion_entrega}" required>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Inserta el modal en el contenedor del DOM
        document.getElementById('modal').innerHTML = html;

        // Inicializa y muestra el modal
        let modal = new bootstrap.Modal(document.getElementById('exampleModalModificarPedido'));
        modal.show();

        // Manejo del evento de envío del formulario
        document.getElementById('formModificarPedido').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);

            fetch('http://localhost/retoBMW-main/Controlador/admin/pedido/editPedido.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    modal.hide();
                    AlertacorrectamenteModificado();
                    cargardatosPedido();
                } else {
                    AlertaError();
                }
            })
            .catch(error => {
                AlertaErrorFatal(error);
            });
        });
    })
    .catch(error => {
        console.error("Error al cargar los datos:", error);
        AlertaErrorFatal(error);
    });
}

//Crear pedido
function formCrearpedido() {
    Promise.all([
        fetch("http://localhost/retoBMW-main/Controlador/admin/pedido/getDescuento.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/pedido/getProducto.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/pedido/getUsuario.php")
    ])
    .then(([DescuentoResp, ProductoResp, UsuarioResp]) => {
        return Promise.all([
            DescuentoResp.json(),
            ProductoResp.json(),
            UsuarioResp.json()
        ]);
    })
    .then(([Descuentos, Productos, Usuarios]) => {
        const generarOpcionesDescuentos = (Descuentos) => {
            return Descuentos.map(descuento => 
                `<option value="${descuento.id_codigo}">${descuento.descuento_porcentaje}</option>`
            ).join('');
        };

        const generarOpcionesProductos = (Productos) => {
            return Productos.map(producto => 
                `<option value="${producto.id_producto_final}">${producto.nombre_producto}</option>`
            ).join('');
        };

        const generarOpcionesUsuarios = (Usuarios) => {
            return Usuarios.map(usuario => 
                `<option value="${usuario.id_usuario}">${usuario.usuario}</option>`
            ).join('');
        };

        let html = `
            <div class="modal fade" id="exampleModalPedido" tabindex="-1" aria-labelledby="exampleModalPedidoLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalPedidoLabel">Crear Pedido</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="formCrearPedido">
                                <div class="mb-3">
                                    <label for="id_usuario" class="form-label">Usuario</label>
                                    <select class="form-select" id="id_usuario" name="id_usuario" required>
                                        ${generarOpcionesUsuarios(Usuarios)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="id_producto_final" class="form-label">Producto</label>
                                    <select class="form-select" id="id_producto_final" name="id_producto_final" required>
                                        ${generarOpcionesProductos(Productos)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="id_codigo" class="form-label">Descuento</label>
                                    <select class="form-select" id="id_codigo" name="id_codigo" required>
                                        ${generarOpcionesDescuentos(Descuentos)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="fecha_pedido" class="form-label">Fecha de Pedido</label>
                                    <input type="date" class="form-control" id="fecha_pedido" name="fecha_pedido" required>
                                </div>
                                <div class="mb-3">
                                    <label for="direccion_entrega" class="form-label">Dirección de Entrega</label>
                                    <input type="text" class="form-control" id="direccion_entrega" name="direccion_entrega" required>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" class="btn btn-primary">Crear Pedido</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Inserta el modal en el contenedor del DOM
        document.getElementById('modal').innerHTML = html;

        // Inicializa y muestra el modal
        let modal = new bootstrap.Modal(document.getElementById('exampleModalPedido'));
        modal.show();

        // Manejo del evento de envío del formulario
        document.getElementById('formCrearPedido').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);

            fetch('http://localhost/retoBMW-main/Controlador/admin/pedido/crearpedido.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    modal.hide();
                    AlertacorrectamenteCreado();
                    cargardatosPedido();
                } else {
                    AlertaError();
                }
            })
            .catch(error => {
                AlertaErrorFatal(error);
            });
        });
    })
    .catch(error => {
        console.error("Error al cargar los datos:", error);
        AlertaErrorFatal(error);
    });
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
        if (modelo.precio_base === null) {
            modelo.precio_base = 0;
        }
        rows += `
        <tr>
            <td>${modelo.id_modelo}</td>
            <td>${modelo.nombre_modelo}</td>
            <td>${modelo.precio_base}€</td>
            <td>


                 <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter"  onclick="eliminarModelo('${modelo.id_modelo}', '${modelo.nombre_modelo}')">Eliminar</button> 
                  <button type="button" class="btn btn-primary data-toggle="modal" data-target="#exampleModalCenter" onclick="modificarmodelo('${modelo.id_modelo}', '${modelo.nombre_modelo}', '${modelo.precio_base}')">Modificar</button>

            </td>
        </tr>`;
    }

    let html = `
         
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
           
             
               <button type="button" class="btn btn-secondary" data-toggle="modal"  data-bs-target="#exampleModalCenter"onclick="formCrearmodelo()"> Crear</button>
              `;

    document.getElementById('admin').innerHTML = html;
}

//Eliminar modelo
function eliminarModelo(id_modelo, nombre_modelo) {
    let html = `
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Eliminar Modelo: ${nombre_modelo}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ¿Estás seguro de que deseas eliminar este modelo? Esta acción no se puede deshacer.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="confirmarEliminarModelo(${id_modelo})">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById('modal').innerHTML = html;

    let modal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
    modal.show();
}


function confirmarEliminarModelo(id_modelo) {
    if (id_modelo) {
        fetch(`http://localhost/retoBMW-main/Controlador/admin/modelo/Errormodelo/Errormodelo.php?id_modelo=${id_modelo}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.existe) {
                AlertaErrorFatal(data.mensaje);
            } else {
                fetch(`http://localhost/retoBMW-main/Controlador/admin/modelo/eliminarmodelo.php?id_modelo=${id_modelo}`, {
                    method: 'GET'
                })
                .then(response => {
                    if (response.ok) {
                        AlertacorrectamenteElimina();
                        cargardatosModelos();
                    } else {
                        AlertaError();
                    }
                })
                .catch(error => {
                    AlertaErrorFatal(error);
                });
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    } else {
        AlertaError();
    }
}



// Modificar modelo
function modificarmodelo(id_modelo, nombre_modelo, precio_base) {
    let html = `
        <div class="modal fade" id="exampleModalModeloModificar" tabindex="-1" aria-labelledby="exampleModalModeloModificarLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalModeloModificarLabel">Modificar Modelo</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formModificarModelo" method="post">
                            <div class="form-group mb-3">
                                <label for="id_modelo" class="form-label">ID del Modelo:</label>
                                <input type="number" class="form-control" id="id_modelo" name="id_modelo" value="${id_modelo}" readonly>
                            </div>
                            <div class="form-group mb-3">
                                <label for="nombre_modelo" class="form-label">Nombre del Modelo:</label>
                                <input type="text" class="form-control" id="nombre_modelo" name="nombre_modelo" value="${nombre_modelo}" required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="precio_base" class="form-label">Precio Base:</label>
                                <input type="number" class="form-control" id="precio_base" name="precio_base" value="${precio_base}" required>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal').innerHTML = html;

    let modal = new bootstrap.Modal(document.getElementById('exampleModalModeloModificar'));
    modal.show();

    document.getElementById('formModificarModelo').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('http://localhost/retoBMW-main/Controlador/admin/modelo/editModelo.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                AlertacorrectamenteModificado();
                cargardatosModelos();
            } else {
                AlertaError();
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    });
}

//Crear modelo
function formCrearmodelo() {
    let html = `
       <div class="modal fade" id="exampleModalModelo" tabindex="-1" aria-labelledby="exampleModalLabelModelo" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalModeloLabel">Crear Modelo</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formCrearModelo" method="post">
                            <div class="form-group">
                                <label for="nombre_modelo" class="form-label">Nombre del Modelo:</label>
                                <input type="text" class="form-control" id="nombre_modelo" name="nombre_modelo" required><br>
                                
                                <label for="precio_base" class="form-label">Precio Base:</label>
                                <input type="number" class="form-control" id="precio_base" name="precio_base" required><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Crear Modelo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal').innerHTML = html;

    let modal = new bootstrap.Modal(document.getElementById('exampleModalModelo'));
    modal.show();

    document.getElementById('formCrearModelo').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('http://localhost/retoBMW-main/Controlador/admin/modelo/crearModelo.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                AlertacorrectamenteCreado();
                cargardatosModelos(); 
            } else {
                AlertaError();
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    });
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
        // para quitar los nulls
        if(kit.oferta === null ){
            kit.oferta = 0
        }
        if(kit.precio === null ){
            kit.precio = 0
        }

        rows += `
        <tr>
            <td scope="row">${kit.id_kit}</td>
            <td>${kit.nombre_kit}</td>
            <td>${kit.tipo}</td>
            <td>${kit.precio}€</td>
            <td>${kit.oferta}%</td>
            <td>
              <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter"   onclick="eliminarkit('${kit.id_kit}','${kit.nombre_kit}')">Eliminar</button> 
              <button type="button" class="btn btn-primary data-toggle="modal" data-target="#exampleModalCenter"  onclick="modificarKit('${kit.id_kit}', '${kit.nombre_kit}', '${kit.tipo}', '${kit.precio}', '${kit.oferta}')">Modificar</button>
            </td>
        </tr>`;
    }
    
    let html = `
      
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID Kit</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Oferta</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
   
        <button type="button" class="btn btn-secondary" data-toggle="modal"  data-bs-target="#exampleModalCenter"onclick="formCrearkit()"> Crear</button>
    `;
    
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
}
//Eliminar kits
function eliminarkit(id_kit, nombre_kit) {
    let html = `
        <div class="modal fade" id="exampleModalKitEliminar" tabindex="-1" aria-labelledby="exampleModalKitEliminarLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalKitEliminarLabel">Eliminar Kit: ${nombre_kit}</h5>   
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ¿Estás seguro de que deseas eliminar este kit? Esta acción no se puede deshacer.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="confirmarEliminarKit(${id_kit})">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inyecta el HTML del modal en el contenedor correspondiente
    document.getElementById('modal').innerHTML = html;

    // Inicializa y muestra el modal usando Bootstrap
    let modal = new bootstrap.Modal(document.getElementById('exampleModalKitEliminar'));
    modal.show();
}


function confirmarEliminarKit(id_kit) {
    if (id_kit) {
        fetch(`http://localhost/retoBMW-main/Controlador/admin/kit/Errorkit/Errorkit.php?id_kit=${id_kit}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.existe) {
                AlertaErrorFatal(data.mensaje);
            } else {
                fetch(`http://localhost/retoBMW-main/Controlador/admin/kit/eliminarKit.php?id_kit=${id_kit}`, {
                    method: 'GET'
                })
                .then(response => {
                    if (response.ok) {
                        AlertacorrectamenteElimina();
                        cargardatosKit();
                    } else {
                        AlertaError();
                    }
                })
                .catch(error => {
                    AlertaErrorFatal(error);
                });
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    } else {
        AlertaError();
    }
}


// Modificar kit
function modificarKit(id_kit, nombre_kit, tipo, precio, oferta) {
    let html = `
        <div class="modal fade" id="exampleModalKit" tabindex="-1" aria-labelledby="exampleModalLabelKit" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabelKit">Modificar Kit</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formModificarKit">
                            <div class="form-group">
                             
                                 <label for="id_kit" class="form-label">ID del Kit:</label>
                                <input type="number" class="form-control" id="id_kit" name="id_kit" value="${id_kit}" readonly>

                                <label for="nombre_kit" class="form-label">Nombre del Kit:</label>
                                <input type="text" class="form-control" id="nombre_kit" name="nombre_kit" value="${nombre_kit}" required><br>
                                <label for="tipo" class="form-label">Tipo:</label>
                                <input type="text" class="form-control" id="tipo" name="tipo" value="${tipo}" required><br>
                                <label for="precio" class="form-label">Precio:</label>
                                <input type="number" class="form-control" id="precio" name="precio" value="${precio}" required><br>
                                <label for="oferta" class="form-label">Oferta:</label>
                                <input type="number" class="form-control" id="oferta" name="oferta" value="${oferta}" required><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Modificar Kit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('modal').innerHTML = html;

    let modal = new bootstrap.Modal(document.getElementById('exampleModalKit'));
    modal.show();

    document.getElementById('formModificarKit').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('http://localhost/retoBMW-main/Controlador/admin/kit/editKit.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                AlertacorrectamenteModificado();
                cargardatosKit();
            } else {
                AlertaError();
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    });
}


//Crear kit
function formCrearkit() {
    let html = `
       <div class="modal fade" id="exampleModalKit" tabindex="-1" aria-labelledby="exampleModalLabelKit" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabelKit">Crear Kit</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formCrearKit" method="post">
                            <div class="form-group">
                                <label for="nombre_kit" class="form-label">Nombre del Kit:</label>
                                <input type="text" class="form-control" id="nombre_kit" name="nombre_kit" required><br>
                                
                                <label for="tipo" class="form-label">Tipo:</label>
                                <input type="text" class="form-control" id="tipo" name="tipo" required><br>
                                
                                <label for="precio" class="form-label">Precio:</label>
                                <input type="number" class="form-control" id="precio" name="precio" required><br>
                                
                                <label for="oferta" class="form-label">Oferta:</label>
                                <input type="number" class="form-control" id="oferta" name="oferta" required><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Crear Kit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal').innerHTML = html;

    let modal = new bootstrap.Modal(document.getElementById('exampleModalKit'));
    modal.show();

    document.getElementById('formCrearKit').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('http://localhost/retoBMW-main/Controlador/admin/kit/crearKit.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                AlertacorrectamenteCreado(); // Muestra un mensaje de éxito
                cargardatosKit(); // Recarga la lista de kits
            } else {
                AlertaError(); // Muestra un mensaje de error
            }
        })
        .catch(error => {
            AlertaErrorFatal(error); // Muestra un mensaje en caso de error fatal
        });
    });
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
        if(freno.precio === null){
            freno.precio = 0
        }
        if(freno.oferta === null){
            freno.oferta = 0
        }
        rows += `
        <tr>
            <td scope="row">${freno.id_freno}</td>
            <td>${freno.tipo}</td>
            <td>${freno.precio}€</td>
            <td>${freno.oferta}%</td>
            <td>
                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter"   onclick="eliminarfreno('${freno.id_freno}','${freno.tipo}')">Eliminar</button> 
                <button type="button" class="btn btn-primary data-toggle="modal" data-target="#exampleModalCenter" onclick="modificarfreno('${freno.id_freno}', '${freno.tipo}', '${freno.precio}', '${freno.oferta}')">Modificar</button>
            </td>
        </tr>`;
    }
    
    let html = `
      
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID Freno</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Oferta</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
       
       
        <button type="button" class="btn btn-secondary" data-toggle="modal"  data-bs-target="#exampleModalCenter"onclick="formCrearfreno()"> Crear</button>
    `;
    
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
}
//Eliminar freno
function eliminarfreno(id_freno, tipo) {
    let html = `
        <div class="modal fade" id="exampleModalFrenoEliminar" tabindex="-1" aria-labelledby="exampleModalFrenoEliminarLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalFrenoEliminarLabel">Eliminar Freno: ${tipo}</h5>   
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ¿Estás seguro de que deseas eliminar este freno? Esta acción no se puede deshacer.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="confirmarEliminarFreno(${id_freno})">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inyecta el HTML del modal en el contenedor correspondiente
    document.getElementById('modal').innerHTML = html;

    // Inicializa y muestra el modal usando Bootstrap
    let modal = new bootstrap.Modal(document.getElementById('exampleModalFrenoEliminar'));
    modal.show();
}

function confirmarEliminarFreno(id_freno) {
    if (!id_freno) {
        AlertaError("ID de freno no proporcionado.");
        return;
    }

    fetch(`http://localhost/retoBMW-main/Controlador/admin/freno/Errorfreno/Errorfreno.php?id_freno=${id_freno}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.existe) {
            AlertaErrorFatal(data.mensaje);
        } else {
            fetch(`http://localhost/retoBMW-main/Controlador/admin/freno/eliminarfreno.php?id_freno=${id_freno}`)
                .then(response => {
                    if (response.ok) {
                        AlertacorrectamenteElimina();
                        cargardatosFreno();
                    } else {
                        AlertaError("No se pudo eliminar el freno.");
                    }
                })
                .catch(error => {
                    AlertaErrorFatal(error);
                });
        }
    })
    .catch(error => {
        AlertaErrorFatal(error);
    });
}


// Modificar freno
function modificarfreno(id_freno, tipo, precio, oferta) {
    let html = `
        <div class="modal fade" id="exampleModalFreno" tabindex="-1" aria-labelledby="exampleModalFrenoLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalFrenoLabel">Modificar Freno</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formModificarFreno" method="post">
                            <div class="form-group mb-3">
                                <label for="id_freno" class="form-label">ID del Freno:</label>
                                <input type="number" class="form-control" id="id_freno" name="id_freno" value="${id_freno}" readonly>
                            </div>
                            <div class="form-group">
                                <label for="tipo" class="form-label">Tipo:</label>
                                <input type="text" class="form-control" id="tipo" name="tipo" value="${tipo}" required><br>
                                
                                <label for="precio" class="form-label">Precio:</label>
                                <input type="number" class="form-control" id="precio" name="precio" value="${precio}" required><br>

                                <label for="oferta" class="form-label">Oferta:</label>
                                <input type="number" class="form-control" id="oferta" name="oferta" value="${oferta}" required><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Modificar Freno</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal').innerHTML = html;

    let modal = new bootstrap.Modal(document.getElementById('exampleModalFreno'));
    modal.show();

    document.getElementById('formModificarFreno').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('http://localhost/retoBMW-main/Controlador/admin/freno/editFreno.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                AlertacorrectamenteModificado();
                cargardatosFreno();
            } else {
                AlertaError();
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    });
}



//Crear freno
function formCrearfreno() {
    let html = `
        <div class="modal fade" id="exampleModalFreno" tabindex="-1" aria-labelledby="exampleModalLabelFreno" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalFrenoLabel">Crear Freno</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formCrearFreno" method="post">
                            <div class="form-group">
                                <label for="tipo" class="form-label">Tipo:</label>
                                <input type="text" class="form-control" id="tipo" name="tipo" required><br>

                                <label for="precio" class="form-label">Precio:</label>
                                <input type="number" class="form-control" id="precio" name="precio" required><br>

                                <label for="oferta" class="form-label">Oferta:</label>
                                <input type="number" class="form-control" id="oferta" name="oferta" required><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Crear Freno</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal').innerHTML = html;

    let modal = new bootstrap.Modal(document.getElementById('exampleModalFreno'));
    modal.show();

    document.getElementById('formCrearFreno').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('http://localhost/retoBMW-main/Controlador/admin/freno/crearFreno.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                AlertacorrectamenteCreado();
                cargardatosFreno();
            } else {
                AlertaError();
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    });
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
        if(descuento.descuento_porcentaje === null){
            descuento.descuento_porcentaje = 0
        }
        rows += `
        <tr>
            <td scope="row">${descuento.id_codigo}</td>
            <td>${descuento.descuento_porcentaje}%</td>
            <td>
          <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter"   onclick="eliminardescuento('${descuento.id_codigo}','${descuento.descuento_porcentaje}')">Eliminar</button> 

         <button type="button" class="btn btn-primary data-toggle="modal" data-target="#exampleModalCenter"onclick="modificardescuento('${descuento.id_codigo}', '${descuento.descuento_porcentaje}')">Modificar</button>

            </td>
        </tr>`;
    }
    
    let html = `
       
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID Código</th>
                    <th scope="col">Descuento (%)</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
      
        <button type="button" class="btn btn-secondary" data-toggle="modal"  data-bs-target="#exampleModalCenter"onclick="formCreardescuento()"> Crear</button>
    `;
    
        
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
}
//Eliminar descuento
function eliminardescuento(id_codigo, descuento_porcentaje) {
    let html = `
        <div class="modal fade" id="exampleModalDescuentoEliminar" tabindex="-1" aria-labelledby="exampleModalDescuentoEliminarLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalDescuentoEliminarLabel">Eliminar Descuento: ${descuento_porcentaje}%</h5>   
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ¿Estás seguro de que deseas eliminar este descuento? Esta acción no se puede deshacer.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="confirmarEliminarDescuento('${id_codigo}')">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inyecta el HTML del modal en el contenedor correspondiente
    document.getElementById('modal').innerHTML = html;

    // Inicializa y muestra el modal usando Bootstrap
    let modal = new bootstrap.Modal(document.getElementById('exampleModalDescuentoEliminar'));
    modal.show();
}

function confirmarEliminarDescuento(id_codigo) {
    if (!id_codigo) {
        AlertaError();
        return;
    }

    fetch(`http://localhost/retoBMW-main/Controlador/admin/codigo_descuento/Errorcodigo/Errorcodigo.php?id_codigo=${id_codigo}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.existe) {
            AlertaErrorFatal(data.mensaje);
        } else {
            fetch(`http://localhost/retoBMW-main/Controlador/admin/codigo_descuento/eliminardescuento.php?id_codigo=${id_codigo}`, {
                method: 'GET'
            })
            .then(response => {
                if (response.ok) {
                    AlertacorrectamenteElimina();
                    cargardatosDescuento();
                } else {
                    AlertaError();
                }
            })
            .catch(error => {
                AlertaErrorFatal(error);
            });
        }
    })
    .catch(error => {
        AlertaErrorFatal(error);
    });
}


// Modificar descuento

function modificardescuento(id_codigo, descuento_porcentaje) {
    let html = `
        <div class="modal fade" id="exampleModalDescuento" tabindex="-1" aria-labelledby="exampleModalDescuentoLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalDescuentoLabel">Modificar Descuento</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formModificarDescuento" method="post">
                            <div class="form-group mb-3">
                                <label for="id_codigo" class="form-label">ID del Descuento:</label>
                                <input type="text" class="form-control" id="id_codigo" name="id_codigo" value="${id_codigo}" readonly minlength="6" maxlength="6" pattern="[A-Z0-9]{6}" title="El código debe contener exactamente 6 caracteres en mayúsculas y números">
                            </div>
                            <div class="form-group">
                                <label for="id_nuevo_codigo" class="form-label">Nuevo Código:</label>
                                <input type="text" class="form-control" id="id_nuevo_codigo" name="id_nuevo_codigo" value="" required minlength="6" maxlength="6" pattern="[A-Z0-9]{6}" title="El código debe contener exactamente 6 caracteres en mayúsculas y números"><br>
                                <label for="descuento_porcentaje" class="form-label">Descuento en Porcentaje:</label>
                                <input type="number" class="form-control" id="descuento_porcentaje" name="descuento_porcentaje" value="${descuento_porcentaje}" required min="0" max="100" step="0.01"><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Modificar Descuento</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('modal').innerHTML = html;
    let modal = new bootstrap.Modal(document.getElementById('exampleModalDescuento'));
    modal.show();
    document.getElementById('formModificarDescuento').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch('http://localhost/retoBMW-main/Controlador/admin/codigo_descuento/editDescuento.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                AlertacorrectamenteModificado();
                cargardatosDescuento();
            } else {
                AlertaError();
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    });
}

//Crear descuento
function formCreardescuento() {
    let html = `
        <div class="modal fade" id="exampleModalDescuento" tabindex="-1" aria-labelledby="exampleModalDescuentoLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalDescuentoLabel">Crear Descuento</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formCrearDescuento" method="post">
                            <div class="form-group mb-3">
                                <label for="id_codigo" class="form-label">Código del Descuento:</label>
                                <input type="text" class="form-control" id="id_codigo" name="id_codigo" required
                                    minlength="6" maxlength="6" pattern="[A-Z0-9]{6}" 
                                    title="El código debe contener exactamente 6 caracteres, en mayúsculas y números">
                            </div>

                            <div class="form-group mb-3">
                                <label for="descuento_porcentaje" class="form-label">Porcentaje de Descuento:</label>
                                <input type="number" class="form-control" id="descuento_porcentaje" name="descuento_porcentaje" required>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Crear Descuento</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal').innerHTML = html;

    let modal = new bootstrap.Modal(document.getElementById('exampleModalDescuento'));
    modal.show();

    document.getElementById('formCrearDescuento').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('http://localhost/retoBMW-main/Controlador/admin/codigo_descuento/creaDescuento.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                modal.hide();
                AlertacorrectamenteCreado(); 
                cargardatosDescuento(); 
            } else {
                AlertaError();
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    });
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
        if(producto.precio_total === null){
            producto.precio_total = 0
        }
        if(producto.cantidad === null){
            producto.cantidad = 0
        }

        rows += `
    <tr>
        <td scope="row">${producto.id_producto_final}</td>
        <td>${producto.nombre_modelo}</td>
        <td>${producto.nombre_motor}</td>
        <td>${producto.nombre_suspension}</td>
        <td>${producto.nombre_kit}</td>
        <td>${producto.nombre_llanta}</td>
        <td>${producto.nombre_freno}</td>
        <td>${producto.precio_total}€</td>
        <td>${producto.nombre_producto}</td>
        <td>${producto.cantidad}</td>
        
        <td>
            <img src="${producto.img}" alt="Imagen Producto" style="max-width: 100px; height: auto;">
        </td>
        <td>
        
         <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter" onclick="eliminarProducto('${producto.id_producto_final}','${producto.nombre_producto}')">Eliminar</button> 
         <button type="button" class="btn btn-primary data-toggle="modal" data-target="#exampleModalCenter" onclick="modificarproducto('${producto.id_producto_final}', '${producto.nombre_modelo}', '${producto.nombre_motor}', '${producto.nombre_suspension}', '${producto.nombre_kit}', '${producto.nombre_llanta}', '${producto.nombre_freno}', '${producto.precio_total}', '${producto.nombre_producto}', '${producto.cantidad}', '${producto.img}')">Modificar</button>

        </td>
    </tr>`;
}

let html = `
   
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">ID Producto Final</th>
                <th scope="col">Modelo</th>
                <th scope="col">Motor</th>
                <th scope="col">Suspensión</th>
                <th scope="col">Kit</th>
                <th scope="col">Llanta</th>
                <th scope="col">Freno</th>
                <th scope="col">Precio Total</th>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Imagen</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
    </table>

    
     <button type="button" class="btn btn-secondary" data-toggle="modal"  data-bs-target="#exampleModalCenter"onclick="formCrearProducto()"> Crear</button>
`;

        
    
    

    
        document.getElementById('admin').innerHTML = html; 
     
}
//Eliminar producto
function eliminarProducto(id_producto_final, nombre_producto) {
    let html = `
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Eliminar Producto: ${nombre_producto}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ¿Estás seguro de que deseas eliminar este Producto? Esta acción no se puede deshacer.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="confirmarEliminarProducto(${id_producto_final})">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById('modal').innerHTML = html;

    let modal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
    modal.show();
}
function confirmarEliminarProducto(id_producto_final) {

    // Verificar si el producto está asociado a un carrito
    fetch(`http://localhost/retoBMW-main/Controlador/admin/producto_final/ErrorProducto/Errorproductocarrito.php?id_producto_final=${id_producto_final}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.existe) {
            // Si el producto está asociado a un carrito
            AlertaErrorFatal(data.mensaje);
        } else {
            // Si el producto no está asociado a un carrito
            // Se comprobara si esta asociada a un pedido
            comprobrar_Producto_pedido(id_producto_final)
            
        }
    })
    .catch(error => {
        AlertaErrorFatal(error);
    });
}
function comprobrar_Producto_pedido(id_producto_final) {
// Verificar si el producto está asociado a un pedido
fetch(`http://localhost/retoBMW-main/Controlador/admin/producto_final/ErrorProducto/Errorproductopedido.php?id_producto_final=${id_producto_final}`, {
    method: 'GET'
})
.then(response => response.json())
.then(data => {
    if (data.existe) {
        // Si el producto está asociado a un pedido
        AlertaErrorFatal(data.mensaje);
    } else {
        // Si no está asociado, proceder con la eliminación
        fetch(`http://localhost/retoBMW-main/Controlador/admin/producto_final/eliminarProducto.php?id_producto_final=${id_producto_final}`, {
            method: 'POST'
        })
        .then(response => {
            if (response.ok) {
                AlertacorrectamenteElimina();
                cargardatosProducto();
            } else {
                AlertaError("No se pudo eliminar el producto.");
            }
        })
        .catch(error => {
            AlertaErrorFatal(error);
        });
    }
})
.catch(error => {
    AlertaErrorFatal(error);
});
}




// Modificar producto
function modificarproducto(id_producto_final, nombre_modelo, nombre_motor, nombre_suspension, nombre_llanta, nombre_freno, nombre_kit,precio_total, nombre_producto, cantidad, img) {
    
  

    Promise.all([
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getModelos.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getMotores.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getSuspensiones.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getLlanta.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getFrenos.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getKits.php")
    ])
    .then(([modelosResp, motoresResp, suspensionesResp, llantasResp, frenosResp, kitsResp]) => {
        return Promise.all([
            modelosResp.json(),
            motoresResp.json(),
            suspensionesResp.json(),
            llantasResp.json(),
            frenosResp.json(),
            kitsResp.json()
        ]);
    })
    .then(([modelos, motores, suspensiones, llantas, frenos, kits]) => {
        const generarOpcionesModelos = (modelos) => {
            return modelos.map(modelo => 
                `<option value="${modelo.id_modelo}" ${modelo.nombre_modelo === nombre_modelo ? 'selected' : ''}>${modelo.nombre_modelo}</option>`
            ).join('');
        };

        const generarOpcionesMotores = (motores) => {
            return motores.map(motor => 
                `<option value="${motor.id_motor}" ${motor.nombre_motor === nombre_motor ? 'selected' : ''}>${motor.nombre_motor}</option>`
            ).join('');
        };

        const generarOpcionesSuspensiones = (suspensiones) => {
            return suspensiones.map(suspension => 
                `<option value="${suspension.id_suspension}" ${suspension.nombre_suspension === nombre_suspension ? 'selected' : ''}>${suspension.nombre_suspension}</option>`
            ).join('');
        };

        const generarOpcionesLlantas = (llantas) => {
            return llantas.map(llanta => 
                `<option value="${llanta.id_llanta}" ${llanta.nombre_llanta === nombre_llanta ? 'selected' : ''}>${llanta.nombre_llanta}</option>`
            ).join('');
        };

        const generarOpcionesFrenos = (frenos) => {
            return frenos.map(freno => 
                `<option value="${freno.id_freno}" ${freno.tipo === nombre_freno ? 'selected' : ''}>${freno.tipo}</option>`
            ).join('');
        };

        const generarOpcionesKits = (kits) => {
            return kits.map(kit => 
                `<option value="${kit.id_kit}" ${kit.nombre_kit === nombre_kit ? 'selected' : ''}>${kit.nombre_kit}</option>`
            ).join('');
        };

        let html = `
            <div class="modal fade" id="exampleModalModificarProducto" tabindex="-1" aria-labelledby="exampleModalModificarProductoLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalModificarProductoLabel">Modificar Producto</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="formModificarProducto">
                                <div class="mb-3">
                                    <label for="id_producto_final" class="form-label">ID Producto Final</label>
                                    <input type="text" class="form-control" id="id_producto_final" name="id_producto_final" value="${id_producto_final}" readonly>
                                </div>
                                <div class="mb-3">
                                    <label for="id_modelo" class="form-label">Modelo</label>
                                    <select class="form-select" id="id_modelo" name="id_modelo" required>
                                        ${generarOpcionesModelos(modelos)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="id_motor" class="form-label">Motor</label>
                                    <select class="form-select" id="id_motor" name="id_motor" required>
                                        ${generarOpcionesMotores(motores)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="id_suspension" class="form-label">Suspensión</label>
                                    <select class="form-select" id="id_suspension" name="id_suspension" required>
                                        ${generarOpcionesSuspensiones(suspensiones)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="id_llanta" class="form-label">Llanta</label>
                                    <select class="form-select" id="id_llanta" name="id_llanta" required>
                                        ${generarOpcionesLlantas(llantas)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="id_freno" class="form-label">Freno</label>
                                    <select class="form-select" id="id_freno" name="id_freno" required>
                                        ${generarOpcionesFrenos(frenos)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="id_kit" class="form-label">Kit Aerodinámico</label>
                                    <select class="form-select" id="id_kit" name="id_kit" required>
                                        ${generarOpcionesKits(kits)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="precio_total" class="form-label">Precio Total</label>
                                    <input type="number" class="form-control" id="precio_total" name="precio_total" value="${precio_total}" required>
                                </div>
                                <div class="mb-3">
                                    <label for="nombre_producto" class="form-label">Nombre Producto</label>
                                    <input type="text" class="form-control" id="nombre_producto" name="nombre_producto" value="${nombre_producto}" required>
                                </div>
                                <div class="mb-3">
                                    <label for="cantidad" class="form-label">Cantidad</label>
                                    <input type="number" class="form-control" id="cantidad" name="cantidad" value="${cantidad}" required>
                                </div>
                                <div class="mb-3">
                                    <label for="img" class="form-label">Imagen URL</label>
                                    <input type="text" class="form-control" id="img" name="img" value="${img}" required>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
       


        document.getElementById('modal').innerHTML = html;

        let modal = new bootstrap.Modal(document.getElementById('exampleModalModificarProducto'));
        modal.show();

        document.getElementById('formModificarProducto').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);

            fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/editProducto.php", {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    modal.hide();
                    AlertacorrectamenteModificado();
                    cargardatosProducto();
                } else {
                    AlertaError();
                }
            })
            .catch(error => {
                AlertaErrorFatal(error);
            });
        });
    })
    .catch(error => {
        console.error("Error al cargar los datos:", error);
        AlertaErrorFatal(error);
    });
}


//Crear producto
function formCrearProducto() {
    Promise.all([
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getModelos.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getMotores.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getSuspensiones.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getLlanta.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getKits.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/getFrenos.php")
    ])
    .then(([modelosResp, motoresResp, suspensionesResp, llantasResp, kitsResp, frenosResp]) => {
        return Promise.all([
            modelosResp.json(),
            motoresResp.json(),
            suspensionesResp.json(),
            llantasResp.json(),
            kitsResp.json(),
            frenosResp.json()
        ]);
    })
    .then(([modelos, motores, suspensiones, llantas, kits, frenos]) => {
            const generarOpcionesmodelos = (modelos) => {
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
            const generarOpcionesKit = (kits) => {
                return kits.map(kit => 
                    `<option value="${kit.id_kit}">${kit.nombre_kit}</option>`
                ).join('');
            };
            const generarOpcionesFrenos = (frenos) => {
                return frenos.map(freno => 
                    `<option value="${freno.id_freno}">${freno.tipo}</option>`
                ).join('');
            };
           
      

        let html = `
            <div class="modal fade" id="modalCrearProducto" tabindex="-1" aria-labelledby="modalCrearProductoLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalCrearProductoLabel">Crear Producto</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="formCrearProducto">
                                <div class="mb-3">
                                     <label for="id_modelo" class="form-label">Modelos</label>
                                  <select class="form-select" id="id_modelo" name="id_modelo" required>
                                      ${generarOpcionesmodelos(modelos)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                       <label for="id_motor" class="form-label">Motores</label>
                                  <select class="form-select" id="id_motor" name="id_motor" required>
                                      ${generarOpcionesMotores(motores)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                      <label for="id_suspension" class="form-label">Suspensiones</label>
                                  <select class="form-select" id="id_suspension" name="id_suspension" required>
                                      ${generarOpcionesSuspensiones(suspensiones)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                       <label for="id_llanta" class="form-label">Llantas</label>
                                  <select class="form-select" id="id_llanta" name="id_llanta" required>
                                      ${generarOpcionesLlantas(llantas)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                      <label for="id_kit" class="form-label">Kits</label>
                                  <select class="form-select" id="id_kit" name="id_kit" required>
                                      ${generarOpcionesKit(kits)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                       <label for="id_freno" class="form-label">frenos</label>
                                  <select class="form-select" id="id_freno" name="id_freno" required>
                                      ${generarOpcionesFrenos(frenos)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="precio_total" class="form-label">Precio Total</label>
                                    <input type="number" id="precio_total" name="precio_total" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label for="nombre_producto" class="form-label">Nombre Producto</label>
                                    <input type="text" id="nombre_producto" name="nombre_producto" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label for="cantidad" class="form-label">Cantidad</label>
                                    <input type="number" id="cantidad" name="cantidad" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label for="img" class="form-label">Imagen URL</label>
                                    <input type="text" id="img" name="img" class="form-control" required>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" class="btn btn-primary">Crear Producto</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modal').innerHTML = html;

        let modal = new bootstrap.Modal(document.getElementById('modalCrearProducto'));
        modal.show();

        document.getElementById('formCrearProducto').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);

            fetch("http://localhost/retoBMW-main/Controlador/admin/producto_final/crearProducto.php", {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    modal.hide();
                    AlertacorrectamenteCreado();
                    cargardatosProducto();
                } else {
                    AlertaError();
                }
            })
            .catch(error => {
                AlertaErrorFatal(error);
            });
        });
    })
    .catch(error => {
        console.error("Error al cargar los datos:", error);
        AlertaErrorFatal(error);
    });
}
//Carrito
function cargardatosCarritos() {
    fetch("http://localhost/retoBMW-main/Controlador/admin/carrito/getcarrito.php") 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            carritos = data; 
            mostrarDatosCarritos(carritos);
           
        })
        .catch(error => {
            console.error("Error al obtener los Pedido:", error);
        });
  }
  //Mostrar descuento
  function mostrarDatosCarritos(carritos) {
    let rows = '';
  
   
    for (let carrito of carritos) {
        
        rows += `
        <tr>
            <td scope="row">${carrito.id_carrito}</td>
            <td>${carrito.usuario}</td>
            <td>${carrito.nombre_producto}</td>
            
  
        
  
            <td>
            
             <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter"   onclick="eliminarCarrito('${carrito.id_carrito}','${carrito.usuario}','${carrito.nombre_producto}')">Eliminar</button> 
              <button type="button" class="btn btn-primary data-toggle="modal" data-target="#exampleModalCenter"onclick="modificarcarrito('${carrito.id_carrito}','${carrito.usuario}','${carrito.nombre_producto}')">Modificar</button>
            </td>
        </tr>`;
    }
    
    let html = `
       
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID carrito</th>
                    <th scope="col">Usuario </th>
                    <th scope="col">nombre_producto</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
      
        <button type="button" class="btn btn-secondary" data-toggle="modal"  data-bs-target="#exampleModalCenter"onclick="crearCarrito()"> Crear</button>
    `;
    
        
    
    
      
    
        document.getElementById('admin').innerHTML = html; 
  }
  function eliminarCarrito(id_carrito, usuario,nombre_producto) {
    let html = `
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Eliminar Carrito del usaurio: ${usuario} <br>
                    Con el ${nombre_producto}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ¿Estás seguro de que deseas eliminar este Carrito? Esta acción no se puede deshacer.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="confirmarEliminarCarrito(${id_carrito})">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    `;
  
    document.getElementById('modal').innerHTML = html;
  
    let modal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
    modal.show();
  }
  
  function confirmarEliminarCarrito(id_carrito) {
    if (id_carrito) {
     

        fetch(`http://localhost/retoBMW-main/Controlador/admin/carrito/eliminarcarrito.php?id_carrito=${id_carrito}`)
            .then(response => {
                if (response.ok) {
                    AlertacorrectamenteElimina();
                    cargardatosCarritos();
                } else {
                    AlertaError();
                }
            })
            .catch(error => {
                AlertaErrorFatal(error);
            });
    } else {
        AlertaError();
    }
  }
  function modificarcarrito(id_carrito, usuarioSeleccionado, nombre_producto) {
    Promise.all([
        fetch("http://localhost/retoBMW-main/Controlador/admin/carrito/getproducto_carrito.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/carrito/getusuario_carrito.php")
    ])
    .then(([ProductoResp, usuariosResp]) => {
        return Promise.all([
            ProductoResp.json(),
            usuariosResp.json()
        ]);
    })
    .then(([Productos, usuarios]) => {
        if (!Productos || !Array.isArray(Productos) || Productos.length === 0) {
            throw new Error("No se encontraron productos");
        }
        if (!usuarios || !Array.isArray(usuarios) || usuarios.length === 0) {
            throw new Error("No se encontraron usuarios");
        }

        const generarOpcionesProducto = (Productos) => {
            return Productos.map(Producto => 
                `<option value="${Producto.id_producto_final}" ${Producto.id_producto_final === nombre_producto ? 'selected' : ''}>${Producto.nombre_producto}</option>`
            ).join('');
        };

        const generarOpcionesUsuarios = (usuarios) => {
            return usuarios.map(usuario => 
                `<option value="${usuario.id_usuario}" ${usuario.id_usuario === usuarioSeleccionado ? 'selected' : ''}>${usuario.usuario}</option>`
            ).join('');
        };

        let html = `
            <div class="modal fade" id="exampleModalModificarCarrito" tabindex="-1" aria-labelledby="exampleModalModificarCarritoLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalModificarCarritoLabel">Modificar Producto</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="formModificarCarrito">
                                <div class="mb-3">
                                    <label for="id_carrito" class="form-label">ID Carrito</label>
                                    <input type="text" class="form-control" id="id_carrito" name="id_carrito" value="${id_carrito}" readonly>
                                </div>
                                <div class="mb-3">
                                    <label for="id_producto_final" class="form-label">Producto</label>
                                    <select class="form-select" id="id_producto_final" name="id_producto_final" required>
                                        ${generarOpcionesProducto(Productos)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="id_usuario" class="form-label">Usuario</label>
                                    <select class="form-select" id="id_usuario" name="id_usuario" required>
                                        ${generarOpcionesUsuarios(usuarios)}
                                    </select>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modal').innerHTML = html;

        let modal = new bootstrap.Modal(document.getElementById('exampleModalModificarCarrito'));
        modal.show();

        document.getElementById('formModificarCarrito').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);

            fetch("http://localhost/retoBMW-main/Controlador/admin/carrito/editcarrito.php", {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    modal.hide();
                    AlertacorrectamenteModificado();
                    cargardatosCarritos();
                } else {
                    AlertaError();
                }
            })
            .catch(error => {
                AlertaErrorFatal(error);
            });
        });
    })
    .catch(error => {
        console.error("Error al cargar los datos:", error);
        AlertaErrorFatal(error);
    });
}

function crearCarrito() {
    Promise.all([
        fetch("http://localhost/retoBMW-main/Controlador/admin/carrito/getproducto_carrito.php"),
        fetch("http://localhost/retoBMW-main/Controlador/admin/carrito/getusuario_carrito.php")
    ])
    .then(([ProductoResp, usuariosResp]) => {
        return Promise.all([ 
            ProductoResp.json(),
            usuariosResp.json()
        ]);
    })
    .then(([Productos, usuarios]) => {
        if (!Productos || !Array.isArray(Productos) || Productos.length === 0) {
            throw new Error("No se encontraron productos");
        }
        if (!usuarios || !Array.isArray(usuarios) || usuarios.length === 0) {
            throw new Error("No se encontraron usuarios");
        }

        const generarOpcionesProducto = (Productos) => {
            return Productos.map(Producto => 
                `<option value="${Producto.id_producto_final}">${Producto.nombre_producto}</option>`
            ).join('');
        };

        const generarOpcionesUsuarios = (usuarios) => {
            return usuarios.map(usuario => 
                `<option value="${usuario.id_usuario}">${usuario.usuario}</option>`
            ).join('');
        };

        let html = `
            <div class="modal fade" id="exampleModalCrearCarrito" tabindex="-1" aria-labelledby="exampleModalCrearCarritoLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalCrearCarritoLabel">Crear Carrito</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="formCrearCarrito">
                                <div class="mb-3">
                                    <label for="id_producto_final" class="form-label">Producto</label>
                                    <select class="form-select" id="id_producto_final" name="id_producto_final" required>
                                        ${generarOpcionesProducto(Productos)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="id_usuario" class="form-label">Usuario</label>
                                    <select class="form-select" id="id_usuario" name="id_usuario" required>
                                        ${generarOpcionesUsuarios(usuarios)}
                                    </select>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" class="btn btn-primary">Crear Carrito</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modal').innerHTML = html;

        let modal = new bootstrap.Modal(document.getElementById('exampleModalCrearCarrito'));
        modal.show();

        document.getElementById('formCrearCarrito').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);

            fetch("http://localhost/retoBMW-main/Controlador/admin/carrito/crearcarrito.php", {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    modal.hide();
                    AlertacorrectamenteCreado();
                    cargardatosCarritos();
                } else {
                    AlertaError();
                }
            })
            .catch(error => {
                AlertaErrorFatal(error);
            });
        });
    })
    .catch(error => {
        console.error("Error al cargar los datos:", error);
        AlertaErrorFatal(error);
    });
}

  

async function AlertaError_email_existe(){
    let alertaHtml = `
      <div class="alert alert-danger" role="alert" id="alerta-${Date.now()}">
            Error Existe el email existe
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertaHtml);
    let id = `alerta-${Date.now()}`;
    await mostrarAlerta(id);
}

async function AlertaError_usuario_existe() {
    let alertaHtml = `
      <div class="alert alert-danger" role="alert" id="alerta-${Date.now()}">
            Error  Este nombre de  usuario Existe
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertaHtml);
    let id = `alerta-${Date.now()}`;
    await mostrarAlerta(id);
}
async function AlertacorrectamenteModificado() {
    let alertaHtml = `
        <div class="alert alert-success" role="alert" id="alerta-${Date.now()}">
            Se ha modificado correctamente.
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertaHtml);
    let id = `alerta-${Date.now()}`;
    await mostrarAlerta(id);
}
async function AlertacorrectamenteElimina(){
    let alertaHtml = `
    <div class="alert alert-success" role="alert" id="alerta-${Date.now()}">
        Se ha eliminado correctamente.
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertaHtml);
            let id = `alerta-${Date.now()}`;
        await mostrarAlerta(id);
    }

async function AlertacorrectamenteCreado() {
    let alertaHtml = `
        <div class="alert alert-success" role="alert" id="alerta-${Date.now()}">
            Se ha Creado Correctamente.
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertaHtml);
    let id = `alerta-${Date.now()}`;
    await mostrarAlerta(id);
}

async function AlertaErrorFatal(error) {
    let alertaHtml = `
        <div class="alert alert-danger" role="alert" id="alerta-${Date.now()}">
            Error : ${error}
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertaHtml);
    let id = `alerta-${Date.now()}`;
    await mostrarAlerta(id);
}

async function AlertaError() {
    let alertaHtml = `
        <div class="alert alert-danger" role="alert" id="alerta-${Date.now()}">
            Error.
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertaHtml);
    let id = `alerta-${Date.now()}`;
    await mostrarAlerta(id);
}

async function mostrarAlerta(id) {
    let alerta = document.getElementById(id);

    // Iniciar la animación de subida
    alerta.classList.remove('BajandoAlerta');
    alerta.classList.add('SubiendoAlerta');

    // Esperar 10ms para iniciar la animación de bajada
    setTimeout(() => {
        alerta.classList.remove('SubiendoAlerta');
        alerta.classList.add('BajandoAlerta');
    }, 10);

    // Esperar 2 segundos antes de ocultar la alerta
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Ocultar la alerta después de la animación
    ocultarAlerta(id);
}

function ocultarAlerta(id) {
    let alerta = document.getElementById(id);
    if (alerta) {
        alerta.classList.remove('BajandoAlerta');
        alerta.classList.add('SubiendoAlerta');
        setTimeout(() => alerta.remove(), 500); // Eliminar la alerta después de la animación
    }
}


 

document.addEventListener("DOMContentLoaded", function() {
    
    cargarbotones(botones);
});