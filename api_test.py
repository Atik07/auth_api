import requests as req

payload = {'name': 'user_name', 'email': 'user@email.com', 'password': '12345'}

r = req.post('http://localhost:3000/signup', data=payload)

print(r.json())