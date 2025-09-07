import requests

API_URL = "http://127.0.0.1:8000/chat/"

def main():
    print("🤖 Chatbot (type 'quit' to exit)\n")

    while True:
        user_input = input("You: ")

        if user_input.strip().lower() in ["quit", "exit"]:
            print("Bot: Goodbye! 👋")
            break

        try:
            response = requests.post(API_URL, json={"message": user_input})

            if response.status_code == 200:
                data = response.json()
                print("Bot:", data.get("response", "⚠️ No response."))
            else:
                print(f"⚠️ Server error {response.status_code}: {response.text}")

        except requests.exceptions.ConnectionError:
            print("⚠️ Could not connect to chatbot server.")
            print("   Did you start FastAPI with: uvicorn app:app --reload --port 8000 ?")
            break
        except Exception as e:
            print("⚠️ Unexpected error:", e)


if __name__ == "__main__":
    main()
