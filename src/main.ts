import axios from "axios";
import { createSecretKey } from "crypto";
import dotenv from "dotenv";
import { Markup, Telegraf } from "telegraf";
import { InputFile } from "telegraf/typings/core/types/typegram";
import { helpText } from "./actions/help";
import { cat, randomIntFromInterval } from "./helpers/helpFunc";
import { getMainMenu, yesNoKeyboard } from "./helpers/keyboard";
import { logger } from "./middleware/logger";
dotenv.config();

if (!process.env.BOT_TOKEN) process.exit(1);
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(logger);

bot.start((ctx) => {
  const { state } = ctx;
  console.log(state.isTrue);

  return ctx.reply(
    ctx.update.message.from.first_name +
      ", привет. Эхо-Котейко-Бот активирован!",
    getMainMenu().oneTime()
  );
});

bot.help((ctx) => ctx.reply(helpText));
bot.settings((ctx) => ctx.reply("Settings"));
bot.command("stop", (ctx) => {
  return ctx.reply("Stop");
});

bot.hears("Хочу котейку", (ctx) => {
  return ctx.replyWithPhoto(cat());
});
bot.hears("Вопрос", async (ctx) => {
  return ctx.replyWithHTML("Привет, хочешь еще котика?", yesNoKeyboard());
});

bot.on("message", (ctx) => {
  ctx.telegram.copyMessage(ctx.chat.id, ctx.chat.id, ctx.message.message_id);
});

bot.action("yes", (ctx) => {
  ctx.reply("Принято");
  return ctx.replyWithPhoto(cat());
});
bot.action("no", (ctx) => ctx.reply("Ладно, пока..."));

// bot.command("ctx", (ctx) => {
//   console.log(ctx.update.message.from.first_name, ", привет!");
//   return ctx.reply("Ok");
// });
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
