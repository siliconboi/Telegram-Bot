const { Telegraf } = require("telegraf");
const TOKEN = "5613288658:AAHIUkWOjTzvvxQREDfjfqOuB7LnNCsnxa0";
const bot = new Telegraf(TOKEN);

const web_link = "https://6457d9f81929ef7e24e068da--unique-manatee-a88729.netlify.app/";

bot.start((ctx) =>
  ctx.reply("Welcome to Brother's Cafe", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
