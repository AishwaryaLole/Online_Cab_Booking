import streamlit as st
import requests

FASTAPI_URL = "http://127.0.0.1:8000/chat/"

# ---------------- Page ----------------

st.set_page_config(
    page_title="CabBot AI",
    page_icon="🚖",
    layout="centered"
)

# ---------------- Config ----------------
# Replace with your actual JWT while testing

USER_ID = 1
ROLE = "PASSENGER"
TOKEN = "Bearer YOUR_JWT_TOKEN"

# ---------------- Session ----------------

if "messages" not in st.session_state:
    st.session_state.messages = []

# ---------------- Header ----------------

st.markdown(
    """
    <div style='text-align:center'>
        <h1>🚖 CabBot AI</h1>
        <h4 style='color:gray'>
            Your Smart Cab Booking Assistant
        </h4>
    </div>
    """,
    unsafe_allow_html=True
)

st.info("👋 Hi! How can I help you today?")

# ---------------- Quick Buttons ----------------

col1, col2, col3 = st.columns(3)

with col1:
    if st.button("🚖 Book Ride", use_container_width=True):
        st.session_state.quick = "How do I book a ride?"

with col2:
    if st.button("💳 Payments", use_container_width=True):
        st.session_state.quick = "Show my payment history"

with col3:
    if st.button("🌤 Weather", use_container_width=True):
        st.session_state.quick = "Weather in Pune"

col4, col5, col6 = st.columns(3)

with col4:
    if st.button("📜 Ride History", use_container_width=True):
        st.session_state.quick = "Show my ride history"

with col5:
    if st.button("🚘 Driver Details", use_container_width=True):
        st.session_state.quick = "Show my driver details"

with col6:
    if st.button("🗑 Clear Chat", use_container_width=True):
        st.session_state.messages = []
        st.rerun()

st.divider()

# ---------------- Display Chat ----------------

for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# ---------------- Chat Input ----------------

prompt = st.chat_input("Ask CabBot...")

# Handle quick button click
if "quick" in st.session_state:
    prompt = st.session_state.quick
    del st.session_state.quick

# ---------------- Send Message ----------------

if prompt:

    st.session_state.messages.append(
        {
            "role": "user",
            "content": prompt
        }
    )

    with st.chat_message("user"):
        st.markdown(prompt)

    payload = {
        "message": prompt,
        "userId": USER_ID,
        "role": ROLE,
        "token": TOKEN
    }

    try:

        with st.spinner("🤖 CabBot is thinking..."):

            response = requests.post(
                FASTAPI_URL,
                json=payload,
                timeout=30
            )

        if response.status_code == 200:

            data = response.json()

            reply = data.get("reply", "No response received.")

        else:

            reply = f"HTTP {response.status_code}\n\n{response.text}"

    except Exception as e:

        reply = f"Connection Error\n\n{e}"

    with st.chat_message("assistant"):
        st.markdown(reply)

    st.session_state.messages.append(
        {
            "role": "assistant",
            "content": reply
        }
    )