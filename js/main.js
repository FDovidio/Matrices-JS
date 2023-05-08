class Item{
    constructor(id, nombre, precio, stock){
        this.id = id,
        this.nombre = nombre,
        this.precio = precio,
        this.stock = stock
    }
    restaStock(){;
        this.stock = this.stock - 1;
    }
}

const item1 = new Item(1, "Yerba", 1000, 100);
const item2 = new Item(2, "Termo", 1000, 50);
const item3 = new Item(3, "Mate", 500, 100);


let stockTienda = `Actualemte tenemos en stock \n
                    ${item1.id} - ${item1.nombre} por $${item1.precio}
                    ${item2.id} - ${item2.nombre} por $${item2.precio}
                    ${item3.id} - ${item3.nombre} por $${item3.precio}
                    0 - Finalizar la compra`




let itemUser = parseInt(prompt(`Indique el numero del articulo que desea comprar :\n ${stockTienda}`))



let listaFinal = ""
let sumaTotal = 0;

function stockValidado(cantidad){
    if ((itemUser== 1) && (cantidad <=100) ){
        return true;
    }else if ((itemUser==2)&& (cantidad<=50)) {
    return true;
   }else if ((itemUser==3)&& (cantidad<=100)) {
    return true;
   }else {
    return false
   }
}


const finaliza = () => {
    if (sumaTotal !== 0) {
        alert(`Usted llevara \n ${listaFinal}`)
        let factura = prompt("Necesita factura? Escriba SI o NO").toLowerCase()
        if ((factura == "si") || (factura == "sí")) {
            let totalIva = sumaTotal * 1.21;
            let nombreUser = prompt("Ingresa tu nombre")
            alert(`${nombreUser} levara \n ${listaFinal} \n Total final: $${totalIva} `)
        } else {
            alert(`${nombreUser} llevara \n ${listaFinal} \n Total final: $${sumaTotal} `)
        }
    } else {
        alert("No haz agregado nada a tu compra")
    }
}

function sumaCompra(producto, valor, cantidad) {
    stockValidado(cantidad)
    if(stockValidado){
        alert(`Sumamos ${producto} por la cantidad de ${cantidad} unidades`)
        sumaTotal += valor * cantidad;
        listaFinal += `${producto} \n`;
    }else{
        alert("NO")
    }

}




    while(itemUser != 0){
    let unidades = parseInt(prompt(`Caunatas unidades de desea?`))
    switch (itemUser) {
        case 1:
            sumaCompra(`${item1.nombre}`, `${item1.precio}`, unidades)
            break;
        case 2:
            sumaCompra(`${item2.nombre}` , `${item2.precio}`, unidades)
            break;
        case 3:
            sumaCompra(`${item3.nombre}`, `${item3.precio}`, unidades)
            break;
        default:
            alert("Elige una opcion de la lista")
    }
    itemUser = parseInt(prompt(`Indique el numero del articulo que desea comprar :\n ${stockTienda} `))
    }



finaliza()
