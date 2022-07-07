require('module-alias/register');
const instance = require('@utils/utils');
const enviarProducto = require('./push');
const boton = require("./buttons");

async function pushProduct(msg,bot){
    let msgId=msg.from.id;
    let objeto={};
    let products=[];
    let replyMarkup = boton("/search",bot);
    const numero=Number(msg.text);
    if(!numero || numero<1 || numero>20){
        return bot.sendMessage(msgId,"Por favor introduzca un número entre 1 y 20",{replyMarkup});
    }else{
        try{
            let response=await instance.get(`get_products`);
            let product=response.data.products;
            const [producto] = product.filter(product=>numero==product.id);
            objeto.ID=`${producto.id}`;
            objeto.nombre=`${producto.title}`;
            objeto.precio=`$${producto.price}`;
            objeto.cantidad = 1;
            objeto.categoria =`${producto.category}`;
            products.push(JSON.stringify(objeto));
            enviarProducto(msgId,products);
            bot.sendMessage(msgId,"Producto añadido al carrito",{replyMarkup});
    }catch(error){
        console.log(error);
        }
    }
}

module.exports=pushProduct;