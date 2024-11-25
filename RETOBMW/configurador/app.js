let precioTotal = 0; // Total acumulado
const preciosPorDefecto = {
  modelo: 0,
  frenos: 0,
  motores: 0,
  kits: 0,
  llantas: 0,
  suspensiones: 0,
};

window.onload = () => {
  obtenerModelos();
  imagenModelo();
  obtenerMotores();
  obtenerKitAerodinamicos();
  obtenerFrenos();
  obtenerSuspensiones();
  obtenerLlantas();
  cargarPreciosPorDefecto();
};

// Obtener y cargar modelos
async function obtenerModelos() {
  const response = await fetch('../../Controlador/obtenerModelosConfig.php');
  const modelos = await response.json();

  console.log(modelos);

  const listaModelos = document.querySelector("#cars");
  const imagen = document.querySelector("#img");

  modelos.forEach((modelo) => {
    listaModelos.innerHTML += 
      `<option value="${modelo.id_modelo}" data-precio="${modelo.precio_base}">${modelo.nombre_modelo}</option>`;
    if (modelo.id_modelo == 1) { // Establecer el modelo por defecto
      imagen.innerHTML = 
        `<img data-image="red" class="active" src="${modelo.img}" alt="${modelo.nombre_modelo}">`;
      // Establecer el precio base del modelo seleccionado inicialmente
      preciosPorDefecto.modelo = modelo.precio_base || 0;
    }
  });

  // Establecer el precio total inicial
  precioTotal = preciosPorDefecto.modelo;
  actualizarPrecioTotal();
}

// Cambiar imagen y actualizar precios al seleccionar un nuevo modelo
async function imagenModelo() {
  try {
    const response = await fetch('../../Controlador/obtenerModelosConfig.php');
    const modelos = await response.json();

    const select = document.querySelector("#cars").value;
    const imagen = document.querySelector("#img");

    modelos.forEach((modelo) => {
      if (modelo.id_modelo == select) {
        imagen.innerHTML = `<img data-image="red" class="active" src="${modelo.img}" alt="${modelo.nombre_modelo}">`;

        precioTotal = 0;

        precioTotal += parseFloat(modelo.precio_base) || 0;
        precioTotal += parseFloat(preciosPorDefecto.frenos) || 0;
        precioTotal += parseFloat(preciosPorDefecto.motores) || 0;
        precioTotal += parseFloat(preciosPorDefecto.kits) || 0;
        precioTotal += parseFloat(preciosPorDefecto.llantas) || 0;
        precioTotal += parseFloat(preciosPorDefecto.suspensiones) || 0;

        deselectAllButtons();
        seleccionarBotonPorDefecto();
        actualizarPrecioTotal();
      }
    });
  } catch (error) {
    console.error("Error al cargar la imagen del modelo:", error);
  }
}

async function obtenerFrenos() {
  const response = await fetch('../../Controlador/obtenerFrenosConfig.php');
  const frenos = await response.json();

  const botonesFrenos = document.querySelector("#frenos");

  frenos.forEach((freno) => {
    botonesFrenos.innerHTML += 
      `<button class="button" onclick="seleccionarBoton(this, 'frenos', ${freno.precio})" value="${freno.id_freno}">
        ${freno.tipo}
      </button>`;
  });
}

async function obtenerMotores() {
  const response = await fetch('../../Controlador/obtenerMotoresConfig.php');
  const motores = await response.json();

  const botonesMotores = document.querySelector("#motor");

  motores.forEach((motor) => {
    botonesMotores.innerHTML += 
      `<button class="button" onclick="seleccionarBoton(this, 'motores', ${motor.precio})" value="${motor.id_motor}">
        ${motor.cilindrada}cc ${motor.caballos}cv ${motor.combustion}
      </button>`;
  });
}

async function obtenerKitAerodinamicos() {
  const response = await fetch('../../Controlador/obtenerKitAerodinamicosConfig.php');
  const kits = await response.json();

  const botonesKits = document.querySelector("#kits");

  kits.forEach((kit) => {
    botonesKits.innerHTML += 
      `<button class="button" onclick="seleccionarBoton(this, 'kits', ${kit.precio})" value="${kit.id_kit}">
        ${kit.nombre_kit}
      </button>`;
  });
}

async function obtenerLlantas() {
  const response = await fetch('../../Controlador/obtenerLlantasConfig.php');
  const llantas = await response.json();

  const botonesLlantas = document.querySelector("#llantas");

  llantas.forEach((llanta) => {
    botonesLlantas.innerHTML += 
      `<button class="button" onclick="seleccionarBoton(this, 'llantas', ${llanta.precio})" value="${llanta.id_llanta}">
        ${llanta.nombre_llanta}
      </button>`;
  });
}

async function obtenerSuspensiones() {
  const response = await fetch('../../Controlador/obtenerSuspensionesConfig.php');
  const suspensiones = await response.json();

  const botonesSuspensiones = document.querySelector("#suspensiones");

  suspensiones.forEach((suspension) => {
    botonesSuspensiones.innerHTML += 
      `<button class="button" onclick="seleccionarBoton(this, 'suspensiones', ${suspension.precio})" value="${suspension.id_suspension}">
        ${suspension.nombre_suspension}
      </button>`;
  });
}

// Función para cargar los precios por defecto de los componentes
async function cargarPreciosPorDefecto() {
  try {
    const preciosDefecto = await Promise.all([
      fetch('../../Controlador/obtenerPrecioFreno.php?id=1').then((res) => res.json()),
      fetch('../../Controlador/obtenerPrecioMotor.php?id=1').then((res) => res.json()),
      fetch('../../Controlador/obtenerPrecioKit.php?id=1').then((res) => res.json()),
      fetch('../../Controlador/obtenerPrecioLlanta.php?id=1').then((res) => res.json()),
      fetch('../../Controlador/obtenerPrecioSuspension.php?id=1').then((res) => res.json()),
      fetch('../../Controlador/obtenerPrecioModelo.php?id=1').then((res) => res.json())
    ]);

    preciosPorDefecto.frenos = preciosDefecto[0] || 0;
    preciosPorDefecto.motores = preciosDefecto[1] || 0;
    preciosPorDefecto.kits = preciosDefecto[2] || 0;
    preciosPorDefecto.llantas = preciosDefecto[3] || 0;
    preciosPorDefecto.suspensiones = preciosDefecto[4] || 0;
    preciosPorDefecto.modelo = preciosDefecto[5] || 0;

    precioTotal = preciosPorDefecto.modelo + preciosPorDefecto.frenos + preciosPorDefecto.motores + preciosPorDefecto.kits + preciosPorDefecto.llantas + preciosPorDefecto.suspensiones;
    actualizarPrecioTotal();
    seleccionarBotonPorDefecto();
  } catch (error) {
    console.error("Error al cargar precios por defecto:", error);
  }
}

// Función para actualizar el precio total
function actualizarPrecioTotal() {
  const precioSpan = document.querySelector("#product-price span");
  if (precioSpan) {
    precioTotal = isNaN(precioTotal) ? 0 : precioTotal;
    precioSpan.textContent = `${precioTotal}$`;
  }
}

function seleccionarBoton(button, categoria, precio) {
  const row = button.parentNode;
  const botones = row.getElementsByClassName("button");

  for (let i = 0; i < botones.length; i++) {
    botones[i].classList.remove("selected");
  }

  button.classList.add("selected");

  precio = isNaN(precio) ? 0 : precio;

  precioTotal -= preciosPorDefecto[categoria];
  precioTotal += precio;

  preciosPorDefecto[categoria] = precio;
  actualizarPrecioTotal();
}

function seleccionarBotonPorDefecto() {
  const botones = [
    "#frenos .button",
    "#motor .button",
    "#kits .button",
    "#llantas .button",
    "#suspensiones .button"
  ];

  botones.forEach(selector => {
    const boton = document.querySelector(selector);
    if (boton) boton.classList.add("selected");
  });

  actualizarPrecioTotal();
}

function deselectAllButtons() {
  const categorias = ["frenos", "motor", "kits", "llantas", "suspensiones"];
  categorias.forEach(categoria => {
    const botones = document.querySelectorAll(`#${categoria} .button`);
    botones.forEach(button => {
      button.classList.remove("selected");
    });
  });
}

document.querySelector("#add-to-cart").addEventListener("click", async () => {
  // Recoger modelo seleccionado
  const modeloSeleccionado = document.querySelector("#cars").value;

  // Recoger configuraciones seleccionadas
  const configuraciones = {
    freno: document.querySelector("#frenos .selected")?.value || null,
    motor: document.querySelector("#motor .selected")?.value || null,
    kit: document.querySelector("#kits .selected")?.value || null,
    llanta: document.querySelector("#llantas .selected")?.value || null,
    suspension: document.querySelector("#suspensiones .selected")?.value || null,
  };

  // Recoger el precio total
  const precioFinal = precioTotal; // Variable previamente calculada

  // Crear objeto para enviar
  const datos = {
    modelo: modeloSeleccionado,
    configuraciones: configuraciones,
    precio: precioFinal,
  };

  console.log(datos);

  // Enviar datos al servidor
  
   fetch('../../Controlador/anadirCarrito.php', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

  });