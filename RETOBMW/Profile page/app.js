
window.onload=getUsuario();

async function getUsuario() {
    const response = await fetch('../../Controlador/obtenerUsuarioPerfil.php');
    const usuario = await response.json();

    console.log(usuario);
    anadirDatos(usuario);
}

function anadirDatos(usuario){


    var info=document.querySelector("#card-body");

    usuario.forEach(usuario => {
        
        info.innerHTML=`<div class="e-profile">
              <div class="row">
                <div class="col-12 col-sm-auto mb-3">
                  <div class="mx-auto" style="width: 140px;">
                    <div class="d-flex justify-content-center align-items-center rounded" style="height: 140px; background-color: rgb(255, 255, 255);">
                      <span style="color: rgb(255, 255, 255); font: bold 8pt Arial;"><img src="img/usuario.png" alt=""></span>
                    </div>
                  </div>
                </div>
                <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                  <div class="text-center text-sm-left mb-2 mb-sm-0">
                    <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">${usuario.nombre} ${usuario.apellidos}</h4>
                    <p class="mb-0">@${usuario.usuario}</p>
                    
                    </div>
                  </div>
                  <div class="text-center text-sm-right">
                    </div>
                  </div>
                 
                  <div class="tab-content pt-3">
                    <div class="tab-pane active">
                      <form class="form" novalidate="">
                        <div class="row">
                          <div class="col">
                            <div class="row">
                              <div class="col">
                                <div class="form-group">
                                  <label>Nombre</label>
                                  <input class="form-control" type="text" name="name" placeholder="Nombre" id ="nombre" value="${usuario.nombre}">
                                </div>
                              </div>
                              <div class="col">
                                <div class="form-group">
                                  <label>Apellidos</label>
                                  <input class="form-control" type="text" name="username" placeholder="Apellidos" id="apellidos" value="${usuario.apellidos}">
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <div class="form-group">
                                  <label>Nombre de usuario</label>
                                  <input class="form-control" type="text" name="name" placeholder="usuario" id="usuario" value="${usuario.usuario}">
                                </div>
                              </div>
                              <div class="col">
                                <div class="form-group">
                                  <label>Email</label>
                                  <input class="form-control" type="text" name="username" placeholder="${usuario.email}" id="email" value="${usuario.email}">
                                </div>
                              </div>
                            </div>
                            
                            <div class="row">
                              <div class="col">
                                <div class="form-group">
                                  <label>Direccion</label>
                                  <input class="form-control" type="text" placeholder="${usuario.direccion}" id="direccion" value="${usuario.direccion}">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                          
                          <div class="mb-2"><b>Change Password</b></div>
                            <div class="row ">
                             <div class="row w-50 p-3">
                                <div class="col">
                                  <div class="form-group">
                                    <label>Current Password</label>
                                    <input class="form-control" type="password" name="Current Password" id="currentContra" placeholder="••••••" value="${usuario.email}">
                                  </div>
                               </div>
                              </div>
                            </div>
                            <div class="row ">
                              <div class="row w-50 p-3 ">
                                <div class="col">
                                  <div class="form-group">
                                    <label>New Password</label>
                                    <input class="form-control" type="password" name="New Password" placeholder="••••••" id="nuevaContra" value="" >
                                  </div>
                                </div>
                             </div>
                              <div class="col">
                                <div class="form-group">
                                  <img class="logo" src="img/bmwlogo.svg" alt="">
                                </div>
                              </div>
                            </div>
                            <div class="row ">
                              <div class="row w-50 p-3">
                                <div class="col">
                                  <div class="form-group">
                                    <label>Confirm <span class="d-none d-xl-inline">Password</span></label>
                                    <input class="form-control" type="password" name="Confirm Password" placeholder="••••••" id="nuevaContra2" value=" "> </div>
                                </div>
                             </div>
                          </div>
                       
                        
                        <div class="row">
                          <div class="col d-flex justify-content-end">
                            <button class="btn btn-primary" type="submit" onclick="guardarUsuario()">Guardar Cambios</button>
                          </div>
                        </div>
                      </form>
    
                    </div>
                  </div>
                </div>`;

    });
    
    function guardarUsuario(){
    console.log("llega");
    alert("Datos guardados correctamente");
    location.href("../marketplace/index.html");
    
    


    }

}
