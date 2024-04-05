from g4f.client import Client
import sys

client = Client()
# print(sys.argv)
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user",
                "content":
                  ' '.join(sys.argv[1:])}],
)
sys.stdout.write(response.choices[0].message.content)