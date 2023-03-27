import { Context, h, Schema } from "koishi";

export const name = "glm-testbot";

export const usage = `
### 用前需知

原来的功能已经全部迁移到glm-bot中，此版本用于测试，因此版本会比glm-bot快一些

注：此版本中服务器地址已经写死，api提供者为[t4wefan](https://forum.koishi.xyz/u/t4wefan)

因此地址栏中无需输入任何服务器地址

glm命令的别名是chat，二者等同

### 命令说明

使用“chat/glm+内容”来与ChatGLM对话

使用"chat id"来显示全局对话id

使用”chat 重置对话“来重置当前对话

使用“chat 加载猫猫/角色”来要求glm扮演某个角色，默认角色为猫娘，可以在本地化中修改

可在本地化文件commands.glmteach.role中修改你的“洗脑文字”

强调：请求达到上限机器人不回复，此时用”chat 重置对话“命令重置记忆即可




`;

export interface Config {
  myServerUrl: string;
  publicUrl: string;
}

export const Config: Schema<Config> = Schema.object({
  myServerUrl: Schema.string().description("服务器地址1").default("无需输入"),
  publicUrl: Schema.string().description("服务器地址2").default("无需输入"),
});

export async function apply(ctx, config: Config) {
  ctx.i18n.define("zh", require("./locales/zh"));
  const logger = ctx.logger("Chat_public");

  function mathRandomInt(a, b) {
    if (a > b) {
      // Swap a and b to ensure a is smaller.
      var c = a;
      a = b;
      b = c;
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
  }

  function subsequenceFromStartLast(sequence, at1) {
    var start = at1;
    var end = sequence.length - 1 + 1;
    return sequence.slice(start, end);
  }

  var memory_id = mathRandomInt(1, 1000000);

  "https://api.chat.t4wefan.pub/chatglm?msg=" +
    String(
      "" + String("&usrid=" + String("" + String("" + String(memory_id))))
    );

  ctx
    .command("glm", "与chatglm对话")
    .alias("chat")
    .action(async ({ session }, ...args) => {
      {
        let api_address = "https://api.chat.t4wefan.pub/" + "chatglm?msg=";
        {
          let ask_content = subsequenceFromStartLast(session.content, 5);
          {
            let user_id =
              "&usrid=|t4wefan's public" +
              String(
                "|channel_id=" +
                  String(
                    String(session.channelId) +
                      String(
                        "|usr_id=" +
                          String(
                            String(session.userId) +
                              String(
                                "|secret=" + String(String(memory_id) + "|")
                              )
                          )
                      )
                  )
              );
            {
              let response = "None";
              if (ask_content == "") {
                return await ctx.http.get(
                  String(api_address) + String("undefined" + String(user_id)),
                  { responseType: "" }
                );
              }
              if (args[0] == "加载角色" || args[0] == "加载猫猫") {
                await session.send(
                  "正在加载本地化文件当中的预设（默认为猫娘），" +
                    String(
                      "对话id即将重置...." +
                        String(
                          await ctx.http.get(
                            String(String(api_address) + "clear") +
                              String(user_id),
                            { responseType: "" }
                          )
                        )
                    )
                );
                const role = session.text("commands.glmteach.role");
                return await ctx.http.get(
                  String(api_address) + String(role + " ​" + String(user_id)),
                  { responseType: "text" }
                );
              }
              if (args[0] == "help") {
                return await ctx.http.get(
                  String(api_address) + String("undefined" + String(user_id)),
                  { responseType: "" }
                );
              }
              if (args[0] == "id") {
                return (
                  "现在的对话id是 " +
                  String(
                    String(memory_id) +
                      " 你可以通过“chat 重置对话”来重置当前对话，或者通过“chat 恢复对话+id”来恢复对话（已弃用）"
                  )
                );
              }
              if (args[0] == "重置对话") {
                return (
                  "正在重置当前对话......" +
                  String(
                    await ctx.http.get(
                      String(api_address) + String("clear" + String(user_id)),
                      { responseType: "text" }
                    )
                  )
                );
              }
              if (args[0] == "恢复对话") {
                memory_id = args[1];
                return "已恢复对话id " + String(memory_id);
              }
              if (args[0] == "重置id") {
                memory_id = Number(memory_id) + mathRandomInt(1, 9999999);
                return "已重置全局记忆,现在全局对话id为" + String(memory_id);
              } else {
                response = await ctx.http.get(
                  String(api_address) +
                    String(String(ask_content) + String(user_id)),
                  { responseType: "text" }
                );
                await session.send(
                  String(h("at", { id: session.userId })) + String(response)
                );
                logger.debug(
                  "ChatGLM" + String(String(user_id) + String(response))
                );
                return null;
              }
              return null;
            }
          }
        }
      }
    });
}
