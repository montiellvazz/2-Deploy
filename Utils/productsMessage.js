
async function showProductsMessage(products){
    let precioFinal = 0;
    products = await products;
products = products.map(items=>{precioFinal+=Number(items.precio.replace("$"," "));
return `➖➖➖\nID: ${items.ID}\n nombre: ${items.nombre}\n precio: ${items.precio}\n cantidad: ${items.cantidad}\n`});
    products = `Items en el carrito:\n${products.join(" ")}➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n Precio Final: $${precioFinal}`;

    return products;
}
module.exports = showProductsMessage;