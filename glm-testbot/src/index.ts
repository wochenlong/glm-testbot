import { Context, Schema } from "koishi";

export const name = "glm-testbot";

export const usage = `

chatglm对话插件，需要安装额外的文件。

文件在这里下载：[论坛](https://forum.koishi.xyz/t/topic/1089)

服务器地址1格式：'https://你的服务器地址/chatglm?',提问词“glm”

服务器地址1格式：'http://你的公网ip/chat',提问词“glms”



公益api（由t4wefan提供，填到服务器地址1）：https://api.chat.t4wefan.pub/chatglm?

`;
export interface Config {
  myServerUrl: string;
  publicUrl: string;
}

export const Config: Schema<Config> = Schema.object({
  myServerUrl: Schema.string().description("服务器地址1").default(""),
  publicUrl: Schema.string().description("服务器地址2：有公网ip的填这个"),
});

export async function apply(ctx: Context, config: Config) {
  function mathRandomInt(a, b) {
    if (a > b) {
      // Swap a and b to ensure a is smaller.
      var c = a;
      a = b;
      b = c;
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
  }
  var memory_id = mathRandomInt(1, 1000000);

  ctx
    .command("glm", "向chatglm提问")
    .usage("进阶：输入'glm 重置记忆 '即可将记忆清零")
    .action(async ({ session }, ...args) => {
      if (args[0] == "重置记忆" || args[0] == "重置对话") {
        await session.send("已重置全局记忆");
        memory_id = Number(memory_id) + 2;
      } else {
        return await ctx.http.get(
          [
            config.myServerUrl,
            ["msg=", String(args[0]) + "", "&usrid=|public"].join(""),
            "|channel_id=" + String(session.channelId),
            [
              "|usr_id=" + String(session.userId),
              "|secret=",
              memory_id,
              "|",
            ].join(""),
            "",
          ].join(""),
          { responseType: "text" }
        );
      }
      return null;
    });

  config.myServerUrl + "msg=";
  String("" + String("&usrid=" + String("" + String("" + String(memory_id)))));

  const cmd1 = ctx
    .command("glms <msg>", "也是向chatglm提问")
    .action(async ({ session }, msg) => {
      const res = await ctx.http.post(config.publicUrl, {
        msg,
      });
      console.log(res);
      return res;
    });
}
/*

*/
