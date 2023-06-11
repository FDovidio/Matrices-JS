let myModal = document.getElementById("myModal");
let myInput = document.getElementById("myInput");

const listaArticulos = [
  {
    nombre: "Yerba",
    id: 1,
    precio: 1000,
    stock: 200,
    img: "https://ipparaguay.com.py/wp-content/uploads/2020/11/Yerba-Mate-Beneficios-Historia-y-Recomendaciones.jpg",
    cantidad: 1,
  },
  {
    nombre: "Termo",
    id: 2,
    precio: 10000,
    stock: 70,
    img: "https://m.media-amazon.com/images/I/31pf253c7VL._AC_.jpg",
    cantidad: 1,
  },
  {
    nombre: "Mate",
    id: 3,
    precio: 5000,
    stock: 150,
    img: "https://d22fxaf9t8d39k.cloudfront.net/ba1e77d8d438601b898ab1f8395f70d19a15ddbe5b9c202d0eaa4e1b893dd4f619762.jpeg",
    cantidad: 1,
  },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let sumaTotal = 0;

function renderProductos(listaArticulos) {
  const listaProductos = document.getElementById("listaProductos");
  listaArticulos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "col-sm-4 ";
    content.setAttribute("id", "contentTarjetas");
    content.innerHTML = `
      <div class="card text-center border border-2" id="cardProducto">
        <div class="card-body " id="cardBody">
        <img src="${product.img}" class="card-img-top " alt="..." id="cardImagen">
        <h3 class="card-title pt-2">${product.nombre}</h3>
        <h4 class="card-title">$${product.precio}</h4>
        </div>
      </div>
    </div>
    `;

    listaProductos.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    comprar.className = "botonComprar btn text-white";
    content.append(comprar);

    comprar.addEventListener("click", () => {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
      });
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  });
}
renderProductos(listaArticulos);

function productosEnCarrito(destino) {
  const verCarrito = document.getElementById("verCarrito");
  const carritoModal = document.getElementById("carritoModal");
  verCarrito.addEventListener("click", () => {
    carritoModal.innerHTML = "";
    let carritoHeader = document.createElement("div");
    carritoHeader.className = "modal-header";
    carritoHeader.innerHTML = ` <h1 class="carritoHeaderTitulo"> Carrito de Compras</h1>
    `;
    carritoModal.append(carritoHeader);

    const modalButton = document.createElement("div");
    modalButton.className = "botonCerrar";
    modalButton.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        `;
    carritoHeader.append(modalButton);

    destino.forEach((product) => {
      let carritoContent = document.createElement("div");
      carritoContent.innerHTML = ` 
    <div class="modal-body col-sm">
    <div class="card text-center border border-2 " id="cardProducto">
    <div class="card-body d-flex" id="cardBodyModal">
    <img src="${product.img}" class="card-img-top " alt="..." id="imagenProductoModal">
    <h3 class="card-title p-3 pt-5">${product.nombre}</h3>
    <h4 class="precioTarjetaModal card-title"  >$${product.precio}</h4>
    </div>
  </div>
  </div>
</div>
    `;
      const botonEliminar = document.createElement("div");
      botonEliminar.className = "botonEliminar ";
      botonEliminar.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Eliminar</button>`;
      carritoContent.append(botonEliminar);
      botonEliminar.addEventListener("click", () => {
        eliminarDelCarrito(product);
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
    const total = carrito.reduce((total, prod) => total + prod.precio, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "modal-footer";
    totalCompra.innerHTML = `
    <h3>Total: $ ${total}</h3>
    `;
    let comprarFin = document.createElement("div");
    comprarFin.className = "botonComprarFinaliza ";
    comprarFin.innerHTML = `    
    <button type="button" class="btn btn-success" data-bs-dismiss="modal"  >Finalizar compra</button>
    `;
    totalCompra.append(comprarFin);

    carritoModal.append(totalCompra);

    pagoHTML(comprarFin, total);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  productosEnCarrito(carrito);
});


function pagoHTML(botonFinalizarCompra, total) {
  const containerProductos = document.querySelector("#containerProductos");
  botonFinalizarCompra.addEventListener("click", () => {
    let finalizarCompraContent = document.querySelector("#listaProductos");
    finalizarCompraContent.className = "finalizarContent";
    finalizarCompraContent.innerHTML = `
<h2 class= "text-center" id="datosTarjetaHeader">Finaliza tu compra</h2>
<h3>Datos de tarjeta de credito</h3> 
<form class="row g-3 ps-1">
<div class="col-md-8">
    <label for="validationDefault05" class="form-label">Numero de tarjeta</label>
    <input type="text" class="form-control" id="validationDefault05" required>
  </div>
<div class="col-md-8" id="divFormTarjeta" >
  <label for="validationDefault01" class="form-label" id="nombreComprador">Nombre (Como figura en la tarjeta)</label>
  <input type="text" class="form-control" id="validationDefault01"  required>
</div>
<div class="col-md-5">
  <label for="validationDefault05" class="form-label">Fecha de expiracion</label>
  <input type="text" class="form-control" id="validationDefault05" required>
</div>
<div class="col-md-5">
    <label for="validationDefault05" class="form-label">CVC</label>
    <input type="text" class="form-control" id="validationDefault05" required>
  </div>
  <div class="col-md-8">
    <label for="validationDefaultUsername" class="form-label">E-mail</label>
    <div class="input-group">
      <span class="input-group-text" id="inputGroupPrepend2">@</span>
      <input type="text" class="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" required>
    </div>
  </div>
</form>

`;
    const checkFactura = document.createElement("div");
    checkFactura.className = "form-check";
    checkFactura.innerHTML = `

<input class="form-check-input" type="checkbox" value="" name="checkboxFactura" id="checkboxFactura" >
<label class="form-check-label" for="checkboxFactura">
  Necesito Factura
</label>

`;
    finalizarCompraContent.append(checkFactura);

    const comprarAForm = document.createElement("div");
    comprarAForm.className = "comprarAForm";
    comprarAForm.innerHTML = `
    <button type="button" class="btn btn-success pt-2" type="submit">Comprar</button>`;
    finalizarCompraContent.append(comprarAForm);

    const volverAGondola = document.createElement("div");
    volverAGondola.className = "volverAGondola pt-2";
    volverAGondola.innerHTML = `
        <button type="button" class="btn btn-secondary pt-2 " onclick="location.reload()">Volver</button>`;
    finalizarCompraContent.append(volverAGondola);

    containerProductos.append(finalizarCompraContent);

    resumenDeCompra(comprarAForm, containerProductos, total);
  });
}

function resumenDeCompra(comprarAForm, containerProductos, total) {
  comprarAForm.addEventListener("click", () => {
    const factura = document.getElementById("checkboxFactura");
    localStorage.clear();
    const compraExitosa = document.querySelector("#listaProductos");
    compraExitosa.className = "compraExitosa border border-2 rounded-1 m-2";
    compraExitosa.innerHTML = `
    <div class="px-4 py-5 my-5 text-center">
    <img src="./multimedia/5346913.png" class="imagenBannerFelicitaciones" alt="" width="65" height="57">
    <h1 class="display-5 fw-bold">Felicitaciones</h1>
    <div class="col-lg-6 mx-auto">
    <p class="lead mb-4">
    Tu compra ha sido procesada copn exito. Gracias por confiar en nosotros.
    </p>
    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
    <button type="button" class="btn btn-success btn-lg px-4 gap-3" onclick="location.reload()">Volver al inicio</button>
    </div>
    </div>
    </div>
    <div class="row" id="datosFactura">
    </div>
    <div class="row">
    <div class="col-sm">
    <h2>Articulo</h2>
    </div>
    <div class="col-sm">
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
        <h3>${product.nombre}</h3>
        </div>
        <div class="col-sm">
        <h4>$${product.precio}</h4>
        </div>
        </div>
        `;
      compraExitosa.append(compraFinal);
    });

    const totalCompraSinF = document.createElement("div");
    totalCompraSinF.innerHTML = `
    <div class="row">
    <h3 class="d-flex justify-content-end">Total: $${total}</h3>
    </div> `;

    const fecha = new Date();
    const totalCompraConF = document.createElement("div");
    totalCompraConF.innerHTML = `
    <div class="row">
    <h3 class="d-flex justify-content-end">${fecha.toLocaleString()}</h3>
    <h3 class="d-flex justify-content-end">Total(+IVA): $${total * 1.21}</h3>
    </div> `;

    factura.checked? compraExitosa.append(totalCompraConF): compraExitosa.append(totalCompraSinF);
  });
}
