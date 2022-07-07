const instance = require("@utils/utils");

async function enviarProducto(id,products){
    try{
        let URI = `post_products?id=${id}&data=${products}`;
        const res = await instance.post(URI);
    }catch(err){
        console.log(err);
    }
}

module.exports = enviarProducto;