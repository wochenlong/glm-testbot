# GLM Testbot

[![npm](https://img.shields.io/npm/v/koishi-plugin-glm-testbot?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-glm-testbot)

GLM Testbot 是一个基于 [Koishi](https://koishi.js.org/) 和 [ChatGLM](https://github.com/HLTCHKUST/Chat-Generating-Language-Model) 的对话机器人插件，可以让你与一个基于语言模型的聊天机器人对话。通过使用该插件，你可以快速测试 ChatGLM 的对话效果。

## 安装

在使用 GLM Testbot 之前，你需要确保已经安装了 Koishi 应用。在 Koishi 应用中，你可以通过插件市场来安装 GLM Testbot。

1. 打开 Koishi 应用，进入「插件市场」页面。

2. 在「插件市场」页面中搜索「glm-testbot」。

3. 点击「安装」按钮进行安装。

4. 安装完成后，按提示启动该插件

## 使用

在 Koishi 中，你可以通过 `glm` 或 `chat` 命令来与 ChatGLM 对话。

使用 `glm` 或`chat`命令来与 ChatGLM 对话。

示例：

glm 你好

或者

chat 我想知道如何做一个机器人


如果 ChatGLM 没有开启，插件会提示你开启 ChatGLM。

插件还提供了以下命令：

- `chat 重置对话` - 重置当前对话。
- `chat 加载` - 要求 ChatGLM 扮演猫娘。
- `glmmtg+内容` - 要求 ChatGLM 帮你生成绘画 tag。

## 许可证

MIT. 详见 [LICENSE](LICENSE) 文件。

## 贡献

如果你发现了 bug 或有任何建议，请通过 GitHub issues 或 Pull requests 提出。


