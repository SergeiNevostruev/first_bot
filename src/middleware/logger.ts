import { Context, Middleware } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

export const logger: Middleware<Context<Update>> = async (ctx, next) => {
  ctx.state.isTrue = true;
  console.log(new Date());
  await next();
};
