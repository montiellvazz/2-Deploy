const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user:"nodeapi.store@gmail.com",
        pass:"nnpsipqyvntnusaw"
    },
  });
async function sendInvoice(msg,to,) {
  let subject = ``;
  let text = ``;
  let html = ``;
  let info = await transporter.sendMail({
    from:'"Node API Store"<nodeapi.store@gmail.com>', 
    to, 
    subject, 
    text, 
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
