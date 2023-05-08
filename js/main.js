let itemUser = parseInt(prompt("Indique el numero del articulo que desea comprar :\n 1. Yerba \n 2. Termo \n 3. Mate \n"))



let listaFinal = ""
let sumaTotal = 0;




const finaliza = () => {
    if (sumaTotal !== 0) {
        alert(`Usted llevara \n ${listaFinal}`)
        let factura = prompt("Necesita factura? Escriba SI o NO").toLowerCase()
        if ((factura == "si") || (factura == "sí")) {
            let totalIva = sumaTotal * 1.21;
            alert(`LLevara \n ${listaFinal} \n Total final: $${totalIva} `)
        } else {
            alert(`Llevara \n ${listaFinal} \n Total final: $${sumaTotal} `)
        }
    } else {
        alert("No haz agregado nada a tu compra")
    }
}

function sumaCompra(producto, valor, cantidad) {
    alert(`Sumamos ${producto} por la cantidad de ${cantidad} unidades`)
    sumaTotal += valor * cantidad;
    listaFinal += `${producto} \n`;
}



while (itemUser != 0) {
    let unidades = parseInt(prompt(`Caunatas unidades de desea?`))
    switch (itemUser) {
        case 1:
            sumaCompra("Yerba ", 1000, unidades)
            break;
        case 2:
            sumaCompra("Termo ", 10000, unidades)
            break;
        case 3:
            sumaCompra("Mate ", 5000, unidades)
            break;
        default:
            alert("Elige una opcion de la lista")
    }

    itemUser = parseInt(prompt("Indique el numero del articulo que desea comprar :\n 1. Yerba \n 2. Termo \n 3. Mate \n"))
}

finaliza()
