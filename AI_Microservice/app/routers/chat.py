from fastapi import APIRouter
from app.models.request import ChatRequest
from app.services.chatbot_service import get_chatbot_response

router = APIRouter(
    prefix="/chat",
    tags=["Chatbot"]
)

@router.post("/")
def chat(request: ChatRequest):

    return get_chatbot_response(request)