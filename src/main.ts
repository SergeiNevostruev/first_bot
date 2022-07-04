import { createSecretKey } from "crypto";
import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { helpText } from "./actions/help";
import { logger } from "./middleware/logger";
dotenv.config();

if (!process.env.BOT_TOKEN) process.exit(1);
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(logger);

bot.start((ctx) => {
  const { state } = ctx;
  console.log(state.isTrue);
  return ctx.reply(
    ctx.update.message.from.first_name + ", привет. Эхо-Бот активирован!"
  );
});
bot.help((ctx) => ctx.reply(helpText));
bot.settings((ctx) => ctx.reply("Settings"));
bot.command("stop", (ctx) => {
  return ctx.reply("Stop");
});
// bot.command("ctx", (ctx) => {
//   console.log(ctx.update.message.from.first_name, ", привет!");
//   return ctx.reply("Ok");
// });
bot.on("message", (ctx) => {
  ctx.telegram.copyMessage(ctx.chat.id, ctx.chat.id, ctx.message.message_id);
});

// bot.mention("botfather", (ctx) => {
//   ctx.reply("botfather mention");
// });
// bot.phone("+987987987", (ctx) => {
//   ctx.reply("phone number");
// });
// bot.hashtag("bot", (ctx) => {
//   ctx.reply("bot hashing");
// });

bot
  .launch()
  .then((res) => {
    console.log("Started");
  })
  .catch((err) => console.log(err));
