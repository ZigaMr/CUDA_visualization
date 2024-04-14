from g4f.client import Client
import sys
# sys.argv.append("write dijkstra algorithm function in python and add some test cases in same script")
client = Client()
# print(sys.argv)
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user",
                "content":
                  'I just need you to return the code and nothing else! ' + ' '.join(sys.argv[1:])}],
)
# print(response.choices[0].message.content)
result = response.choices[0].message.content.split("```")
sys.stdout.write(result[1])
# for ind, r in enumerate(result):
#   sys.stdout.write(str(ind))
#   sys.stdout.write(r)