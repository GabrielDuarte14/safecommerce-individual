import requests
import geocoder
import chaves
import platform
import mysql.connector
from getpass import getpass
import bcrypt
import getmac 
# link do open_weather: https://openweathermap.org/

HOST = "localhost"
USER = "aluno"
PASS = "sptech"
DB = "safecommerce"

SLA_AVISO = 120
SLA_EMERGENCIA = 60

if platform.system() == 'Windows':
    limpar = "cls"
else:
    limpar = "clear"

def login():
    resultado = False
    deseja_continuar = True

    while deseja_continuar:
        print("Login - Informe email e senha vazios caso deseje cancelar o login.")
        print("Email:")
        email = input()
        print("Senha:")
        senha = getpass(prompt="")

        if email == "" and senha == "":
            print("Email e Senha vazios. Consideramos que você não deseja se logar.")
            deseja_continuar = False
        else:
            conexao = mysql.connector.connect(host=HOST, user=USER, password=PASS, database=DB)
            cursor = conexao.cursor()

            cursor.execute(f"select email, senha, fkEmpresa from Usuario where email = '{email}'")
            usuarios = cursor.fetchall()

            cursor.close()
            conexao.close()           

            if len(usuarios) > 0:
                is_senha_correta = bcrypt.checkpw(senha.encode('UTF-8'), usuarios[0][1].encode('UTF-8'))

                if is_senha_correta:
                    global fk_empresa                    
                    fk_empresa = usuarios[0][2]
                    print(usuarios)
                    print(usuarios[0])
                    print(usuarios[0][2])
                    print("Login realizado com sucesso.")
                    resultado = True
                    deseja_continuar = False

                    

                else:
                    print("Email e/ou Senha incorreto(s)!")
            else:
                print("Email e/ou Senha incorreto(s)!")
    
    return resultado

def pegarTemperaturaCidade():
    API_KEY = chaves.API_KEY
    cidade = geocoder.ip("me")
    cidadeMid = str(cidade[0]).split(',')
    cidade = cidadeMid[0].replace("[","")
    link = f"https://api.openweathermap.org/data/2.5/weather?q={cidade}&appid={API_KEY}&lang=pt_br"
    requisicao = requests.get(link)
    requisicao_dic = requisicao.json()
    temperaturaCidade = round(requisicao_dic['main']['temp'] - 273.15,2)
    print(temperaturaCidade)
    return temperaturaCidade

def pegarTemperaturaServidor():
    temperaturaCPU = 0
    if platform.system() == 'Windows':
        import wmi
        w = wmi.WMI(namespace="root\OpenHardwareMonitor")
        temperature_infos = w.Sensor()
        for sensor in temperature_infos:
            if sensor.SensorType==u'Temperature':
                print(sensor.Name)
                print(sensor.Value)
                temperaturaCPU = sensor.Value
    else:
        import psutil
        temperaturas = psutil.sensors_temperatures()
        temperaturaCPU = temperaturas['coretemp'][0][1]
       
    return temperaturaCPU

def obter_id_servidor():
    conexao = mysql.connector.connect(host=HOST, user=USER, password=PASS, database=DB)
    cursor = conexao.cursor()
    cursor.execute(f"SELECT idServidor FROM Servidor WHERE enderecoMac = '{mac_add}'")
    servidores = cursor.fetchall()
    cursor.close()
    conexao.close() 
    return servidores[0][0]

def monitoramento():
    while True:
        temperaturaCPU = pegarTemperaturaServidor()

        if(temperaturaCPU >= 65 and temperaturaCPU<75):
            flag = "a" #alerta
            temperatura = pegarTemperaturaCidade()
            if(temperatura > 35):
                print('pode ser que continue aumentando')
            else:
                print('ALERTA: Sua CPU está quente')
            
        elif(temperaturaCPU>75):
            flag = "e"    #emergencia
            temperatura = pegarTemperaturaCidade()
            
            if(temperatura > 35):
                print('sua cpu esta em temperatura de emergência e o clima está quente, talvez tenha relação')
            else:
                print('Emergência: Sua CPU está muito quente!')
        else:
            print("TA OK")
        
        


login()