import { Context, Schema } from "koishi";

export const name = "glm-testbot";

export const usage = `

chatglm对话插件，需要安装额外的文件。

文件在这里下载：[答疑](https://forum.koishi.xyz/t/topic/1089)

url格式：https://你的服务器地址/chatglm?



`;
export interface Config {
  myServerUrl: string;
}

export const Config: Schema<Config> = Schema.object({
  myServerUrl: Schema.string().description("服务器的地址"),
});

export async function apply(ctx: Context, config: Config) {
  ctx.command("glm", "向chatglm提问").action(async ({ session }, ...args) => {
    return await ctx.http.get(
      [config.myServerUrl, "msg=", args[0], "&usrid=", session.userId].join(""),
      { responseType: "text" }
    );
  });
}

/*
export function apply(ctx: Context, config: Config) {
  const { url } = config;
  ctx.command("glm <msg>", "向chatglm提问").action(async ({ session }, msg) => {
    const res = await ctx.http.post(url, {
      msg,
    });
    console.log(res);
    return res;
  });
}
*/
