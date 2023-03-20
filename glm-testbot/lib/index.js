"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.usage = exports.name = void 0;
const koishi_1 = require("koishi");
exports.name = "glm-testbot";
exports.usage = `

chatglm对话插件。需要有公网ip，需要对后端进行调整。

需要运行“fast_api.py”文件

url格式：http://公网ip：端口/chat


教程在[论坛](https://forum.koishi.xyz/t/topic/1075)有说`;
exports.Config = koishi_1.Schema.object({
    url: koishi_1.Schema.string().description("服务器的地址"),
});
async function apply(ctx) {
    ctx.command("ask").action(async ({ session }, ...args) => {
        return await ctx.http.get([
            "https://api.chat.t4wefan.pub/chatglm?",
            "msg=",
            args[0],
            "&usrid=",
            session.userId,
        ].join(""), { responseType: "text" });
    });
}
exports.apply = apply;
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
