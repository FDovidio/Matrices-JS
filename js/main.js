const listaArticulos = [
  { nombre: "Yerba", id: 1, precio: 1000, stock: 200 },
  { nombre: "Termo", id: 2, precio: 10000, stock: 70 },
  { nombre: "Mate", id: 3, precio: 5000, stock: 150 },
];

const listaTienda = `Actualemte tenemos en stock \n
                    ${listaArticulos[0].id} - ${listaArticulos[0].nombre} por $${listaArticulos[0].precio} 
                    ${listaArticulos[1].id} - ${listaArticulos[1].nombre} por $${listaArticulos[1].precio}
                    ${listaArticulos[2].id} - ${listaArticulos[2].nombre} por $${listaArticulos[2].precio}
                    0 - Finalizar la compra`;

let eleccionUser = parseInt(
  prompt(`Indique el numero del articulo que desea comprar :\n ${listaTienda}`)
);

const carrito = [];
const articulosElegidosStock = [];
let sumaTotal = 0;

function finaliza() {
  if (sumaTotal !== 0) {
    const carritoMostrado = carrito.map(function (articulo) {
      return articulo.nombre;
    });
    const carritoString = carritoMostrado.join(" - \n -  ");
    alert(`Usted llevara ${carritoMostrado}`);
    let factura = prompt("Necesita factura? Escriba SI o NO").toLowerCase();
    const fecha = new Date();
    if (factura == "si" || factura == "sí") {
      let nombreUser = prompt("Ingresa tu nombre");
      if (nombreUser !== "") {
        alert(
          `${fecha.toLocaleString()}  \n ${nombreUser}: \n ${carritoString} \n Total final: $ ${
            sumaTotal * 1.21
          }`
        );
      } else {
        alert("Escriba un nombre");
        nombreUser = prompt("Ingresa tu nombre");
      }
    } else {
      alert(
        `${fecha.toLocaleString()} \n ${nombreUser}: \n ${carritoString} \n Total final: $${sumaTotal} `
      );
    }
  } else {
    alert("No haz agregado nada a tu compra");
  }
};

while (isNaN(eleccionUser)) {
  alert("Ingresaste un valor no numerico, reintentalo");
  eleccionUser = parseInt(
    prompt(
      `Indique el numero del articulo que desea comprar :\n ${listaTienda}`
    )
  );
}
while (eleccionUser !== 0) {
  let unidades = parseInt(prompt(`Cuantas unidades desea?`));
  const articulosElegidos = listaArticulos.find((e) => e.id == eleccionUser);

  articulosElegidosStock.push(articulosElegidos);
  articulosElegidosStock.forEach((element) => {
    element.stock = element.stock - unidades;
  });

  const validador = articulosElegidosStock.some((e) => e.stock >= unidades);
  if (validador) {
    alert(
      `Sumamos ${articulosElegidos.nombre} por la cantidad de ${unidades} unidades`
    );
    carrito.push(articulosElegidos);
    sumaTotal += articulosElegidos.precio * unidades;
  } else {
    alert(`No tenemos suficiente stock para tu pedido`);
  }
  eleccionUser = parseInt(
    prompt(
      `Indique el numero del articulo que desea comprar :\n ${listaTienda}`
    )
  );
}
finaliza();
