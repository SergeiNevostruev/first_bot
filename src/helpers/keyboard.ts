// import Markup from 'telegraf/markup.js'

import { Markup } from "telegraf";

export const getMainMenu = () => {
  return (
    Markup.keyboard([
      [
        // "Старт",
        "Хочу котейку",
        // "Стоп",
        "Вопрос",
      ],
    ])
      // .oneTime()
      .resize()
  );
};

export const yesNoKeyboard = () => {
  return Markup.inlineKeyboard(
    [Markup.button.callback("Да", "yes"), Markup.button.callback("Нет", "no")],
    { columns: 2 }
  );
};
