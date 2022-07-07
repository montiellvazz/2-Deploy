require('module-alias/register');
const TeleBot = require("telebot");
const getProducts = require("@mod/products");
const createTrolley = require("@mod/trolley");
const getTrolley = require("@mod/show_trolley");
const fetchProduct = require("@mod/ask_busqueda");
const pushProduct = require("@mod/ask_push");
const emptyTrolley = require("@mod/empty_trolley");
require('dotenv').config();
let boton=require('@mod/buttons');


const bot = new TeleBot({
    token:process.env.TOKEN,
    usePlugins: ['commandButton', 'askUser']
    });

    bot.on('/start',msg=>{
        let replyMarkup=boton(msg.text,bot);
        bot.sendMessage(msg.from.id, `¡Saludos ${msg.from.first_name}! Bienvenido a nuestra tienda`, {replyMarkup})
    }); 

    bot.on('/back',msg=>{
        let replyMarkup=boton(msg.data,bot);
        bot.sendMessage(msg.from.id, `¿Qué deseas hacer, ${msg.from.first_name}?`, {replyMarkup});
    }); 
    
    bot.on('/show',msg=>{
        let replyMarkup=boton(msg.data,bot);
        getProducts(bot,msg,replyMarkup);

    });

    bot.on('/pago',msg=>{
        let replyMarkup=boton(msg.data,bot);
        bot.sendMessage(msg.from.id,`${msg.from.first_name}, actualmente aceptamos`,{replyMarkup});
    });

    bot.on('/view',msg=>{
        getTrolley(msg,bot);
    });

    bot.on('/add',msg=>{
        createTrolley(msg.from.id);
        bot.sendMessage(msg.from.id,`${msg.from.first_name}, por favor indica el ID del objeto que desea agregar al carrito`, {ask: 'enviar'});
    });

    bot.on('ask.enviar', msg=>{
        pushProduct(msg,bot);
    })

    bot.on('/search',msg=>{
        const id=msg.from.id;
        bot.sendMessage(msg.from.id,"Debes escribir el 🆔 para mostrar un producto", {ask:'busqueda'});
    });

    bot.on('/empty',msg=>{
        let replyMarkup=boton(msg.data,bot);
        emptyTrolley(msg,bot,replyMarkup);
    })

    bot.on('ask.busqueda', msg=>{
        fetchProduct(msg,bot);
    });

    bot.on('/efectivo', msg=>{
        let replyMarkup = boton(msg.data, bot)
        const mensaje=`Para realizar pagos en efectivo puedes dirigirte a cualquiera de nuestras Sedes y gestionar tu pago directamente en nuestras oficinas.\nLe recomendamos que consulte nuestros Horarios de atencion al cliente y a su vez la ubicacion de nuestras sedes principales.`
        let id=msg.from.id;
        bot.sendMessage(id,mensaje,{replyMarkup});
    });

    bot.on('/criptos', msg=>{
        let id=msg.from.id;
        let replyMarkup = boton(msg.data,bot);
        const mensaje = `Para Realizar pagos con criptomonedas via Binance le facilitaremos una guia de pasos a seguir: 
        \n1.) Elige la red por la que vas a hacer el envío (si te lo piden). En este caso, solo tienes que asegurarte de qué la red de envío es la misma que la de depósito. 
        Si por ejemplo se tratase de la red de Ethereum, que se llama ERC20, a la hora del envío tienes que asegurarte que escoges esa red para la transferencia y que la dirección de depósito es la de ERC20 (Ethereum) y no otra.
        \n2.) Copia la dirección de depósito, así como cualquier otro dato que te pidan (MEMO, tag, etc.) del exchange/billetera al que quieres enviar la criptomoneda. 
        \n3.) Una vez claros los pasos 1 y 2, solo tienes que pegar esos datos en la plataformas desde que vas a hacer el retiro, escoger la cantidad a enviar y confirmar la transferencia.
        \nUna vez terminada la transaccion no olvide Enviar el comprobante de Transaccion a nuestro Correo (nodeapi.store@gmail.com) para que su pago sea verificado y aprobado`
        bot.sendMessage(id,mensaje,{replyMarkup});
    })

    bot.on('/transfe', msg=>{
        let id=msg.from.id;
        let replyMarkup = boton(msg.data,bot);
        const mensaje=`Para Realizar pagos en Bolivares via transferencia bancaria debe:
        \n1.) Realizar la Tranferencia y generar un Capture de Pago
        \n2.) Enviar el Comprobante de Pago a nuestro correo (nodeapi.store@gmail.com)
        \n\nDatos cuenta Bancaria: \nBanesco\nJ-10293821-3\n0134-1099-21-0001001610\n\nAVISO: Los precios en bolivares se ven sujetos a la tasa del dia en (@monitordolarof) puede consultar la tasa del dia mediante (https://t.me/monitordolarof)`
        
        bot.sendMessage(id,mensaje,{replyMarkup});
    })

    //-------------------------------------- Enviar mapas

    bot.on('/zona',msg=>{
        let replyMarkup=boton(msg.data,bot);
        bot.sendMessage(msg.from.id, '¡Trabajamos de 9:00 A.M a 6:00 P.M de lunes a viernes! 😎\n\nTambién tenemos delivery gratis en estas ubicaciones 🔥, selecciona una para saber como llegar', {replyMarkup})
    });


    bot.on('/otrasZona',msg=>{
        let replyMarkup=boton(msg.data,bot);
        bot.sendMessage(msg.from.id, 'Aprende a llegar nuestros puntos de entrega', {replyMarkup});
    });

    bot.on('/map1', msg => {
        let replyMarkup =boton(msg.data, bot);
        bot.sendLocation(msg.from.id, [10.644715920875937, -71.61821645983906], {replyMarkup});
    });

    bot.on('/map2', msg => {
        let replyMarkup = boton(msg.data, bot);
        bot.sendLocation(msg.from.id, [10.671812671276458, -71.65369837326266], {replyMarkup});
    });
    bot.on('/map3', msg => {
        let replyMarkup = boton(msg.data, bot);
        bot.sendLocation(msg.from.id, [10.59882925256173, -71.65087523348457], {replyMarkup});
    });

bot.start();