let myModal = document.getElementById("myModal");
let myInput = document.getElementById("myInput");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let sumaTotal = 0;

function renderProductos(listaArticulos) {
  const listaProductos = document.getElementById("listaProductos");
  listaArticulos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "col-sm-4";
    content.setAttribute("id", "contentTarjetas");
    content.innerHTML = `
      <div class="card mb-3 text-center" id="cardProducto">
        <div class="card-body  " id="cardBody">
        <img src="${product.img}" class="card-img-top img-fluid" alt="..." id="cardImagen">
        <h3 class="card-title pt-2" id="textoTarjetaNombre">${product.nombre}</h3>
        <h4 class="card-title" id="textoTarjetaPrecio">$${product.precio}</h4>
        </div>
      </div>
    </div>
    `;

    listaProductos.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    comprar.className = "botonComprar btn btn-outline-dark mt-2 ";
    content.append(comprar);

    comprar.addEventListener("click", () => {
      agregarAlCarrito(product);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  });
}

function agregarAlCarrito(product) {
  Toastify({
    text: `Agregaste ${product.nombre} al carrito`,
    duration: 1000,
    style: {
      background: "linear-gradient(to right, #9fac82, #96c93d)",
    },
  }).showToast();
  const repetido = carrito.some(
    (productoRepetido) => productoRepetido.id == product.id
  );
  if (repetido) {
    carrito.map((prod) => {
      if (prod.id == product.id) {
        prod.cantidad++;
      }
    });
  } else {
    carrito.push({
      id: product.id,
      img: product.img,
      nombre: product.nombre,
      precio: product.precio,
      cantidad: product.cantidad,
    });
  }
}

function contadorCarrito() {
  const badgeCarrito = document.getElementById("badgeCarrito");
  badgeCarrito.innerText = carrito.length;
}
contadorCarrito();

function productosEnCarrito(carrito) {
  const verCarrito = document.getElementById("verCarrito");
  const carritoModal = document.getElementById("carritoModal");
  verCarrito.addEventListener("click", () => {
    const total = carrito.reduce(
      (total, prod) => total + prod.precio * prod.cantidad,
      0
    );
    carritoModal.innerHTML = "";
    let carritoHeader = document.createElement("div");
    carritoHeader.className = "modal-header bg-white m-2";
    carritoHeader.innerHTML = ` <h1 class="carritoHeaderTitulo"> Carrito de Compras</h1>
    `;
    carritoModal.append(carritoHeader);

    const modalButton = document.createElement("div");
    modalButton.className = "botonCerrar";
    modalButton.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        `;
    carritoHeader.append(modalButton);

    carrito.forEach((product) => {
      let carritoContent = document.createElement("div");
      carritoContent.innerHTML = ` 
    <div class="modal-body col-sm ">
    <div class="card text-center" id="cardProducto">
    <div class="card-body d-flex " id="cardBodyModal">
    <img src="${
      product.img
    }" class="card-img-top " alt="..." id="imagenProductoModal">
    <h3 class="card-title p-3 pt-5 ">${product.nombre} x ${
        product.cantidad
      } </h3>
    <h4 class="precioTarjetaModal card-title "  >$${
      product.precio * product.cantidad
    }</h4>
    </div>
  </div>
  </div>
</div>
    `;
      const botonEliminar = document.createElement("div");
      botonEliminar.className = "botonEliminar ";
      botonEliminar.innerHTML = `
    <button type="button" class="btn btn-secondary mt-0" data-bs-toggle="modal"
    data-bs-target="#ventanaModal">Eliminar</button>`;
      carritoContent.append(botonEliminar);
      botonEliminar.addEventListener("click", () => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Eliminaste ${product.nombre}`,
          showConfirmButton: false,
          timer: 1500,
          width: 230,
          height: 150,
        });
        eliminarDelCarrito(product);
        localStorage.setItem("carrito", JSON.stringify(carrito));
      });

      carritoModal.append(carritoContent);
    });
    const eliminarDelCarrito = (producto) => {
      if (producto.cantidad > 1) {
        producto.cantidad--;
      } else {
        const index = carrito.indexOf(producto);
        carrito.splice(index, 1);
      }

      productosEnCarrito(carrito);
    };

    const totalCompra = document.createElement("div");
    totalCompra.className = "modal-footer m-2 bg-white";
    totalCompra.innerHTML = `
    <h3>Total: $ ${total}</h3>
    `;

    let comprarFin = document.createElement("div");
    comprarFin.className = "botonComprarFinaliza ";
    comprarFin.innerHTML = `    
    <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal" id="botonComprarFinaliza" >Finalizar compra</button>
    `;
    totalCompra.append(comprarFin);

    carritoModal.append(totalCompra);

    pagoHTML(comprarFin, total);
  });
}

productosEnCarrito(carrito);

function pagoHTML(botonFinalizarCompra, total) {
  const containerProductos = document.querySelector("#containerProductos");
  botonFinalizarCompra.addEventListener("click", () => {
    let finalizarCompraContent = document.querySelector("#listaProductos");
    finalizarCompraContent.className = "finalizarContent";
    finalizarCompraContent.innerHTML = `
<h2 class= "text-center  " id="datosTarjetaHeader">Finaliza tu compra</h2>
<div class="formPagoContent p-3">
<h3 class="m-2">Datos de tarjeta </h3> 
<form class="row g-3 ps-1"  onsubmit="resumenDeCompra('${total}')">
<div class="col-md-8">
    <label for="validationDefault05" class="form-label">Numero de tarjeta</label>
    <input type="text" class="form-control" id="validationNumero" onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;" required>
  </div>
<div class="col-md-8" id="divFormTarjeta" >
  <label for="validationDefault01" class="form-label" id="nombreComprador">Nombre (Como figura en la tarjeta)</label>
  <input type="text" class="form-control" id="validationDefault05Nombre"  required>
</div>
<div class="col-md-5">
  <label for="validationDefault05" class="form-label">Fecha de expiracion</label>
  <input type="text" class="form-control" id="validationNumero" onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;" required>
</div>
<div class="col-md-5">
    <label for="validationDefault05" class="form-label">CVC</label>
    <input type="text" class="form-control" id="validationNumero" onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;" required>
  </div>
  <div class="col-md-8">
    <label for="validationDefaultUsername" class="form-label">E-mail</label>
    <div class="input-group">
      <span class="input-group-text" id="inputGroupPrepend2">@</span>
      <input type="text" class="form-control" id="validationMail"  aria-describedby="inputGroupPrepend2" required>
    </div>
  </div>
  <div class="col-md-8" od="form-check" >
  <input class="form-check-input" type="checkbox" value="" name="checkboxFactura"  id="checkboxFactura">
<label class="form-check-label" for="checkboxFactura" >
  Necesito Factura
</label>
  </div>
  <div class="col-12 d-flex justify-content-end"  >
  <p class="totalForm fs-2 mt-2">Total: $${total}</p>
</div>
  <div class="col-12"  >
  <button class="btn btn-outline-dark " id="botonFinalizarResumen" type="submit" >Comprar</button>
</div>
<div class="col-12"  >
<button type="button" class="btn btn-secondary pt-1 " onclick="location.reload()">Volver</button>
</div>
</form>
</div>
`;
  });
}

function resumenDeCompra(total) {
  localStorage.clear();
  const comprarAForm = document.querySelector("#botonFinalizarResumen");
  const containerProductos = document.querySelector("#containerProductos");
  const mailComprador = document.querySelector("#validationMail");

  Swal.fire({
    title: "Felicitaciones! Su compra se ha realizado con exito",
    text: `Enviaremos la factura via mail a ${mailComprador.value}`,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });

  const factura = document.getElementById("checkboxFactura");
  const nombreComprador = document.getElementById("validationDefault05Nombre");
  const compraExitosa = document.querySelector("#listaProductos");
  compraExitosa.className = "compraExitosa border border-2 rounded-1 m-2";
  compraExitosa.innerHTML = `
    <div class="px-4 py-5 my-5 text-center">
    <img src="./multimedia/5346913.png" class="imagenBannerFelicitaciones" alt="" width="65" height="57">
    <h1 class="display-5 fw-bold">Matrices</h1>
    </div>
    <div class="row" id="datosFactura">
    <h2 ps-2>Nombre: ${nombreComprador.value}</h2>
    </div>
    <div class="row ">
    <div class="col-sm">
    <h2>Articulo</h2>
    </div>
    <div class="col-sm ">
    <h2>Valor</h2>
    </div>
    </div>
    `;
  containerProductos.append(compraExitosa);

  carrito.forEach((product) => {
    const compraFinal = document.createElement("div");
    compraFinal.innerHTML = `
        <div class="row" id="resumenCompra">
        <div class="col-sm">
        <h3 class=" m-2">${product.nombre}</h3>
        </div>
        <div class="col-sm m-2">
        <h4>$${product.precio}</h4>
        </div>
        </div>
        `;
    compraExitosa.append(compraFinal);
  });

  const totalCompraSinF = document.createElement("div");
  totalCompraSinF.innerHTML = `
    <div class="row">
    <h3 class="d-flex justify-content-end ">Total: $${total}</h3>
    </div> `;

  const fecha = new Date();
  const totalCompraConF = document.createElement("div");
  totalCompraConF.innerHTML = `
    <div class="row">
    <h3 class="d-flex justify-content-end ">${fecha.toLocaleString()}</h3>
    <h3 class="d-flex justify-content-end ">Total(+IVA): $${total * 1.21}</h3>
    </div> `;

  factura.checked
    ? compraExitosa.append(totalCompraConF)
    : compraExitosa.append(totalCompraSinF);
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("../catalogo.json")
    .then((res) => res.json())
    .then((data) => {
      renderProductos(data);
    });
});
