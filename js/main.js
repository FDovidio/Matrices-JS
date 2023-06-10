const listaProductos = document.getElementById("listaProductos")
const verCarrito = document.getElementById("verCarrito")
const carritoModal = document.getElementById("carritoModal")
const containerProductos = document.getElementById("containerProductos")

var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')


const listaArticulos = [
    { nombre: "Yerba", id: 1, precio: 1000, stock: 200, img:"https://ipparaguay.com.py/wp-content/uploads/2020/11/Yerba-Mate-Beneficios-Historia-y-Recomendaciones.jpg"},
    { nombre: "Termo", id: 2, precio: 10000, stock: 70, img: "https://m.media-amazon.com/images/I/31pf253c7VL._AC_.jpg" },
    { nombre: "Mate", id: 3, precio: 5000, stock: 150, img:"https://d22fxaf9t8d39k.cloudfront.net/ba1e77d8d438601b898ab1f8395f70d19a15ddbe5b9c202d0eaa4e1b893dd4f619762.jpeg" },
];


let carrito = [];

let sumaTotal = 0;



function renderProductos(listaArticulos){
listaArticulos.forEach((product) =>{
    let content = document.createElement("div")
    content.className = "col-sm-4 "
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
    
    listaProductos.append(content)

    let comprar = document.createElement("button");
    comprar.innerText = "Comprar"
    comprar.className = "botonComprar btn text-white"
    content.append(comprar)
    
    comprar.addEventListener("click", () =>{
    carrito.push({
        id : product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    });
    
});
};
renderProductos(listaArticulos);

verCarrito.addEventListener("click",() => {
    
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoModal.innerHTML = "";
    let carritoHeader = document.createElement("div")
    carritoHeader.className = "modal-header"
    carritoHeader.innerHTML = ` <h1 class="carritoHeaderTitulo"> Carrito de Compras</h1>
    `;
    carritoModal.append(carritoHeader);

    const modalButton = document.createElement("div")
    modalButton.className = "botonCerrar"
    modalButton.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        `
    carritoHeader.append(modalButton);
    
    function productosEnCarrito (destino){
        destino.forEach((product) => {
    let carritoContent = document.createElement("div")
    carritoContent.innerHTML = ` 
    <div class="modal-body col-sm">
    <div class="card text-center border border-2 " id="cardProducto">
    <div class="card-body d-flex" id="cardBodyModal">
    <img src="${product.img}" class="card-img-top " alt="..." id="imagenProductoModal">
    <h3 class="card-title p-3 pt-5">${product.nombre}</h3>
    <h4 class="precioTarjetaModal card-title" >$${product.precio}</h4>
    </div>
  </div>
  </div>
</div>
    `
    carritoModal.append(carritoContent);
    
});
}     

productosEnCarrito (carrito)

    const total = carrito.reduce((total, prod) => total + prod.precio, 0);

    const totalCompra = document.createElement("div")
    totalCompra.className = "modal-footer"
    totalCompra.innerHTML = `
    <h3>Total: $ ${total}</h3>
    `
    let comprarFin = document.createElement("div");
    comprarFin.className = "botonComprarFinaliza " 
    comprarFin.innerHTML = `
    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Finalizar compra</button>
    `
    totalCompra.append(comprarFin)

    const modalButtonLimpiarCarrito = document.createElement("div")
    modalButtonLimpiarCarrito.className = "botonLimpiarCarrito"
    modalButtonLimpiarCarrito.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-toggle = "modal" >Limpiar Carrito</button>
        `
    totalCompra.append(modalButtonLimpiarCarrito);
    carritoModal.append(totalCompra)

    modalButtonLimpiarCarrito.addEventListener("click", () =>{
    carrito = [];
    localStorage.clear();
    });
    ;
// 
    comprarFin.addEventListener("click",() =>{
        function pagoHTML() {
    let finalizarCompraContent = document.querySelector("#listaProductos")
    finalizarCompraContent.className = "finalizarContent"
    finalizarCompraContent.innerHTML = `
    <h2 class= "text-center" id="datosTarjetaHeader">Finaliza tu compra</h2>
    <h3>Datos de tarjeta de credito</h3>
    <form class="formPago">
    <label for="input" class="form-label">Numero de tarjeta</label>
    <input type="text" id="inputTextFinalizar" class="form-control" >
    <label for="input" class="form-label">Nombre</label>
    <input type="text" id="inputTextFinalizar" class="form-control" >
    <label for="input" class="form-label">Fecha de expiracion</label>
    <input type="date" id="inputTextFinalizar" class="form-control" >
    <label for="input" class="form-label">CVC</label>
    <input type="text" id="inputTextFinalizar" class="form-control" >

    </form>
  <h2 class="pt-2>Total: ${total}</h2>
</div>
    `
    const checkFactura = document.createElement("div")
    checkFactura.className = "form-check"
    checkFactura.innerHTML = `

    <input class="form-check-input" type="checkbox" value="" name="checkboxFactura" id="checkboxFactura">
    <label class="form-check-label" for="checkboxFactura">
      Casilla de verificación por defecto
    </label>

    `
        finalizarCompraContent.append(checkFactura)
const factura = document.getElementById("checkboxFactura")

    const comprarAForm = document.createElement("div")
    comprarAForm.className = "comprarAForm"
    comprarAForm.innerHTML = `
        <button type="button" class="btn btn-success pt-2" ">Comprar</button>`
        finalizarCompraContent.append(comprarAForm)

    containerProductos.append(finalizarCompraContent)

    comprarAForm.addEventListener("click", () => {
        localStorage.clear();
        const compraExitosa = document.querySelector("#listaProductos")
        compraExitosa.className = "compraExitosa"
        compraExitosa.innerHTML = `
        <div class="px-4 py-5 my-5 text-center">
        <img src="./multimedia/5346913.png" class="imagenBannerFelicitaciones" alt="" width="65" height="57">
        <h1 class="display-5 fw-bold">Felicitaciones</h1>
        <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
        Tu compra ha sido procesada copn exito. Gracias por confiar en nosotros.
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" class="btn btn-success btn-lg px-4 gap-3">Volver al inicio</button>
        </div>
        </div>
        </div>
        <div class="row">
        <div class="col-sm">
        <h2>Articulo</h2>
        </div>
        <div class="col-sm">
        <h2>Valor</h2>
        </div>
        </div>
        `
        containerProductos.append(compraExitosa)
        
        carrito.forEach((product) => {
            const compraFinal = document.createElement("div")
            compraFinal.innerHTML = `
            <div class="row">
            <div class="col-sm">
            <h3>${product.nombre}</h3>
            </div>
            <div class="col-sm">
            <h4>$${product.precio}</h4>
            </div>
            </div>
            `
            compraExitosa.append(compraFinal)
        });
        
        function totalCompraSinFactura () {
        const totalCompraSinF = document.createElement("div")
        totalCompraSinF.innerHTML = `
        <div class="row">
        <h3 class="d-flex justify-content-end">Total: $${total}</h3>
        </div> `
        compraExitosa.append(totalCompraSinF)
        }
        
        
        function totalCompraConFactura (){
            const fecha = new Date();
        const totalCompraConF = document.createElement("div")
        totalCompraConF.innerHTML = `
        <div class="row">
        <h3 class="d-flex justify-content-end">${fecha.toLocaleString()}</h3>
        <h3 class="d-flex justify-content-end">Total(+IVA): $${total * 1.21}</h3>
        </div> `
        compraExitosa.append(totalCompraConF)
        }
        
    
    function resumeFinal(factura){
    if (factura.checked) {
        totalCompraConFactura()
    }else{
        totalCompraSinFactura()
    }
    } 
    resumeFinal(factura);
    })
    
    }
pagoHTML();
    
});

});

