import axios from "axios";

const AI_BASE_URL = "https://cab-booking-ai.onrender.com";

export const sendChatMessage = async (message, userId, role, token) => {
  try {
    const res = await axios.post(`${AI_BASE_URL}/chat/`, {
      message,
      userId,
      role,
      token: `Bearer ${token}`,
    });
    return { success: true, reply: res.data.reply || "Sorry, I didn't understand that." };
  } catch (error) {
    return { success: false, reply: "Chatbot is currently unavailable. Please try again later." };
  }
};