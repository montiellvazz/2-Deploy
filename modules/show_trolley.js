const instance = require("@utils/utils");
const boton = require("./buttons");
const showProductsMessage = require("@utils/productsMessage")
async function getTrolley(msg,bot){
    let id = msg.from.id;
    let name = msg.from.first_name || msg.from.username;
    let replyMarkup = boton(msg.data,bot);
    try{
        const res = await instance.get(`trolley?id=${id}`);
        let products = res.data!=false?res.data[0].data:undefined;
        if(products == undefined || products.length==0){
            replyMarkup = boton("/empty",bot);
            return bot.sendMessage(id,`${name}! El carrito todavía está vació por favor ingresa algún artículo para empezar a llenar tu carrito🔥`,{replyMarkup});
            }
        else{
            products = await showProductsMessage(products);
            bot.sendMessage(id,products,{replyMarkup});
        }
    }catch(err){
    console.log(err);
    }
}

module.exports = getTrolley;