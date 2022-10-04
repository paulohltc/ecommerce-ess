from math import prod
import time
import requests

base = 'http://localhost:8080'

prevStock = 0

@when('I insert a product with name "{name}", price "{price}", stock "{stock}", description "{description} to the server')
def insertProductServer(context,name,price,stock,description):
    body = {
        "name" : name,
        "stock": stock,
        "price": price,
        "description": description,
    }
    response = requests.post(base + '/products/', json=body)
    assert response.status_code == 200

@then('the system now has a product name "{name}", price "{price}", stock "{stock}", description "{description}')
def checkProductServer(context,name,price,stock,description):
    responseJson = requests.get(base + '/products/')
    responseList = list(dict(responseJson.json()).items())
    prod = responseList[-1][1]
    valid = prod['name'] == name and prod['price'] == price and prod['stock'] == stock and prod['description'] == description
    prodCode = str(prod['code'])
    requests.delete(base + '/products/code/' + prodCode)
    assert valid is True

@given('the system has a product with code "{code}"')
def checkCodeServer(context,code):
    global prevStock
    response = requests.get(base + '/products/code/' + code)
    prevStockJson = requests.get(base + '/products/code/' + code + '/stock')
    print(prevStockJson.json())
    prevStock = prevStockJson.json()['stock']
    assert response.status_code == 200

@when('I update the stock of the product "{code}" with "{stock}"')
def updateStock(context,code,stock):
    
    body = {
        "stock": int(stock),
    }
    response = requests.put(base + '/products/code/' + code + '/stock', json=body)
    assert response.status_code == 200

@then('the system stores "{stock}" as stock for product "{code}"')
def checkStock(context,stock,code):
    response = requests.get(base + '/products/code/' + code + '/stock')
    currStock = response.json()['stock']
    print(currStock)
    body = {
        "stock": prevStock
    }
    print(body)
    requests.put(base + '/products/code/' + code + '/stock', json=body)
    assert currStock == int(stock)