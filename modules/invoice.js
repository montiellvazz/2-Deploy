let boton = require('@mod/buttons');

    bot.on('/fact', (msg) => {
        const inlineKeyboard = boton(msg.data,bot);
        return bot.sendInvoice(msg.from.id, {
            title: 'Factura de compra',
            description: 'Node API Store',
            payload: 'telebot-test-invoice',
            providerToken: '284685063:TEST:MGZlNzhkZjkwOGZm',
            startParameter: 'pay',
            currency: 'USD',
            prices: [
                {label: 'Tea', amount: 125},
                {label: 'For testing!', amount: 1250},
            ],
            need: {email: true, phoneNumbe: false},
            // needShippingAdress: true,
            // isFlexible: false,
            // sendEmailToProvider: true,
            replyMarkup: inlineKeyboard
        }).then(data => {
            console.log('OK', data);
        }).catch(error => {
            console.log('ERROR', error);
        });
    
    });
    
    // bot.on('shippingQuery', (msg) => {
    //     console.log('shippingQuery', msg);
    // });
    
    // bot.on('preShippingQuery', (msg) => {
    //     console.log('preShippingQuery', msg);
    
    //     const id = msg.id;
    //     const isOk = true;
    
    //     return bot.answerPreCheckoutQuery(id, isOk);
    
    // });
    
    bot.on('successfulPayment', (msg) => {
        console.log('successfulPayment', msg);
    
        return bot.sendMessage(msg.from.id, `Gracias por tu compra, ${msg.from.first_name}!`);
    
    });
    