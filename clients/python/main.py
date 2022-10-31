import requests
import geocoder
import chaves
# link do open_weather: https://openweathermap.org/

API_KEY = chaves.API_KEY
print(API_KEY)
cidade = geocoder.ip("me")
link = f"https://api.openweathermap.org/data/2.5/weather?q={cidade}&appid={API_KEY}&lang=pt_br"

requisicao = requests.get(link)
requisicao_dic = requisicao.json()
print(requisicao_dic)
descricao = requisicao_dic['weather'][0]['description']
temperatura = requisicao_dic['main']['temp'] - 273.15
print(descricao, f"{temperatura}ºC")

cpu = CPUTemperature()
print(cpu.temperature)
