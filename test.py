import google.generativeai as genai

genai.configure(api_key='AIzaSyBiGVQ_5b4WtzZFG6FE8hXH2cOq2GDJTLw')

model = genai.GenerativeModel('gemini-pro')
response = model.generate_content("What is the capital of France?")
print(response.text)