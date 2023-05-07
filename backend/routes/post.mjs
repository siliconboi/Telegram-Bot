import cors from cors;
import express from express;
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const webAppUrl = 'https://heroic-empanada-97d0d5.netlify.app'
const bot = new TelegramBot(token, {polling: true});
const app = express.Router();

app.use(cors());

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if(text === '/start'){
    await bot.sendMessage(chatId, 'A button will appear below, fill out the form', {
        reply_markup: {
            keyboard:[
                [{text: 'Fill out the form ', web_app: {url: webAppUrl + '/form'}}]
            ]
        }
    })
    await bot.sendMessage(chatId, 'Here are all the products without sorting', {
        reply_markup: {
            inline_keyboard:[
                [{text: 'Make an order ', web_app:{url: webAppUrl}}]
            ]
        }
    })
    await bot.sendMessage(chatId, 'write the command /products -> you will be presented with the entire assortment, but already sorted  ', {
    })
  }

  if(text === '/info'){
    await bot.sendMessage(chatId, 'If you still have questions, then you are here -> @BrothersCafeBot', {
    })
  }

  
  if(msg?.web_app_data?.data) {
    try {
        const data = JSON.parse(msg?.web_app_data?.data)

        await bot.sendMessage(chatId,'Thanks for the feedback! ')
        await bot.sendMessage(chatId,'Your full name: ' + data?.fio);
        await bot.sendMessage(chatId,'Your location: ' + data?.street);

        setTimeout(async () => {
            await bot.sendMessage(chatId, 'You will receive all the information in this chat ');

        }, 3000)
        
    } catch(e){
        conlose.log(e);
    }
    
  }

});



app.post('/web-data', async (req, res) => {
    const {queryId, products = [], totalPrice} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Successful purchase',
            input_message_content: {
                message_text: ` Congratulations on your purchase, you have purchased an item worth of ${totalPrice}, ${products.map(item => item.title).join(', ')}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

export default app;