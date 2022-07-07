const instance = require("@utils/utils");


async function getProducts(bot,msg,replyMarkup){
    const res = await instance.get("get_products");
    const reply = processData(res.data.products);
    bot.sendMessage(msg.from.id,reply,{replyMarkup});
}

function processData(data){
    let newData = [...data
        .map(product=>`🆔 ${product.id} | ${product.title.length>20
            ?product.title.split(" ").slice(0,5).join(" ")
            :product.title} 🔹 $${product.price}\n\n`)
        ];
    newData = newData.join("");
    return newData;
}



module.exports = getProducts;