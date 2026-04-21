
// 
// CARRITO (INICIALIZADO DESDE LOCALSTORAGE)
// 
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// 
// DOM
// 
const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("carrito");
const totalSpan = document.getElementById("total");


// 
// API - CARGA PRODUCTOS
// 
async function cargarProductos() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const productos = await response.json();

    renderizarProductos(productos);
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}


// 
// RENDER PRODUCTOS (FILTRADO ELECTRÓNICA)
// 
function renderizarProductos(productos) {
  contenedorProductos.innerHTML = "";

  const electronics = productos.filter(p =>
    p.category === "electronics"
  );

  electronics.forEach(producto => {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${producto.image}" width="120">
      <h3>${producto.title}</h3>
      <p>Precio: $${producto.price}</p>
      <button>Agregar al carrito</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      agregarAlCarrito(producto);
    });

    contenedorProductos.appendChild(div);
  });
}


// 
// AGREGAR AL CARRITO
// 
function agregarAlCarrito(producto) {
  carrito.push(producto);

  guardarCarrito();
  renderizarCarrito();
  mostrarMensaje("Producto agregado");
}


// 
// RENDER CARRITO
// 
function renderizarCarrito() {
  contenedorCarrito.innerHTML = "";

  carrito.forEach((producto, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p>${producto.title} - $${producto.price}</p>
      <button>Eliminar</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      eliminarDelCarrito(index);
    });

    contenedorCarrito.appendChild(div);
  });

  calcularTotal();
}


// 
// ELIMINAR DEL CARRITO
// 
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);

  guardarCarrito();
  renderizarCarrito();
}


// 
// TOTAL
// 
function calcularTotal() {
  let total = 0;

  carrito.forEach(p => {
    total += p.price;
  });

  totalSpan.textContent = total.toFixed(2);
}


// 
// LOCAL STORAGE
// 
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


// 
// MENSAJE
// 
function mostrarMensaje(texto) {
  const mensaje = document.getElementById("mensaje");

  mensaje.textContent = texto;

  setTimeout(() => {
    mensaje.textContent = "";
  }, 2000);
}


// 
// FINALIZAR COMPRA
// 
document.getElementById("finalizarCompra").addEventListener("click", () => {
  carrito = [];

  guardarCarrito();
  renderizarCarrito();

  mostrarMensaje("Compra realizada con éxito");
});


// 
// INICIO APP
//  
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  renderizarCarrito();
});