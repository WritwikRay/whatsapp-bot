const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const quotable = require('quotable');

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
  });

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
});
 
client.on('message', async (message) => {
    if (message.body === '!quote'){
    const aNewQuote = await quotable.getRandomQuote();
    //console.log(aNewQuote.content)};
    message.reply( aNewQuote.content + " " + "-" + " " + aNewQuote.author )}
});
