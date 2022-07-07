require('module-alias/register');
const instance = require("@utils/utils");

async function emptyTrolley(msg,bot,replyMarkup){
    let id = msg.from.id;
    await instance.delete(`trolley?id=${id}`);
    bot.sendMessage(id,`${msg.from.first_name}! Lamentamos informarte que tu carrito ha sido eliminado`,{replyMarkup});
}

module.exports = emptyTrolley;