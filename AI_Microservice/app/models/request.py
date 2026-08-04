from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str
    userId: int
    role: str
    token: str