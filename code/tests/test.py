import requests
import json
base = 'http://localhost:8080'
responseStock = requests.get(base + '/products/code/' + '0' + '/stock')
print(type(responseStock.json()))
newStock = responseStock.json()['stock'] + 1  

requests.get(base + '/products/code/' + '0' + '/stock/' + str(newStock))