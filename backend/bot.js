const { Telegraf } = require("telegraf");
const TOKEN = "5613288658:AAHIUkWOjTzvvxQREDfjfqOuB7LnNCsnxa0";
const bot = new Telegraf(TOKEN);

const web_link = "........";

bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
