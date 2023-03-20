from transformers import AutoModel, AutoTokenizer
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

tokenizer = AutoTokenizer.from_pretrained("THUDM/chatglm-6b", trust_remote_code=True)
model = AutoModel.from_pretrained("THUDM/chatglm-6b", trust_remote_code=True).half().cuda()
model = model.eval()

MAX_TURNS = 20
MAX_BOXES = MAX_TURNS * 2


def predict(input, max_length=256, top_p=0, temperature=0, history=None):
    if history is None:
        history = []
    response, history = model.chat(tokenizer, input, history, max_length=max_length, top_p=top_p,
                                   temperature=temperature)
    return response

app = FastAPI()




class Item(BaseModel):
    msg: str

@app.post("/chat")
def create_item(item:Item):
    msg = predict(input=item.msg)
    print(msg)
    return msg

uvicorn.run(app, host="0.0.0.0", port=32337)


# koishi请求格式
# await ctx.http.post('http://公网ip:32337/chat',{msg:'你好'})