import { Schema } from "koishi";
export declare const name = "glm-testbot";
export declare const usage = "\n\nchatglm\u5BF9\u8BDD\u63D2\u4EF6\u3002\u9700\u8981\u6709\u516C\u7F51ip\uFF0C\u9700\u8981\u5BF9\u540E\u7AEF\u8FDB\u884C\u8C03\u6574\u3002\n\n\u9700\u8981\u8FD0\u884C\u201Cfast_api.py\u201D\u6587\u4EF6\n\nurl\u683C\u5F0F\uFF1Ahttp://\u516C\u7F51ip\uFF1A\u7AEF\u53E3/chat\n\n\n\u6559\u7A0B\u5728[\u8BBA\u575B](https://forum.koishi.xyz/t/topic/1075)\u6709\u8BF4";
export interface Config {
    url: string;
}
export declare const Config: Schema<Config>;
export declare function apply(ctx: any): Promise<void>;
