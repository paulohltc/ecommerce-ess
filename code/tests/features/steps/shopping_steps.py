from hashlib import new
from operator import truediv
from behave import *
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from user_auth_steps import fillBox,submitCredentials
import time
import requests

login = {
    'admin' : {
        'email': 'admin@admin.com',
        'password': '123456'
    },
    'client' : {
        'email': 'client@client.com',
        'password': '123456'
    },
}
def removeSaleAndRestockProducts(saleId):
    base = 'http://localhost:8085'
    responseShop = requests.get(base + '/shops/client@client.com')
    prodCode = responseShop.json()[saleId]['items'][0]['product']['code']
    requests.delete(base + '/shops/code/'+saleId)
    responseStock = requests.get(base + '/products/code/' + prodCode + '/stock')
    newStock = responseStock.json()['stock'] + 1
    body = {
        "stock": newStock,
    }    
    requests.put(base + '/products/code/' + prodCode + '/stock', json=body)


def getText(element):
    return element.text

@given('I am logged in as a client')
def launchBrowser(context):
    context.driver = webdriver.Chrome(ChromeDriverManager().install())
    context.driver.maximize_window()
    context.driver.get('http://localhost:4200/login')
    context.driver.find_element(By.ID, 'emailInput').send_keys(login['client']['email'])
    context.driver.find_element(By.ID, 'passwordInput').send_keys(login['client']['password'])
    context.driver.find_element(By.ID, 'btnSubmit').click()
    time.sleep(2)

@given('I am at the "{page}" page')
def givenCheckPage(context,page):
    base = 'http://localhost:4200/'
    url = base + page
    status = context.driver.current_url == url
    assert status is True

@when('I added the first product of the products list to the cart')
def addFirstProduct(context):
    btns = context.driver.find_elements(By.ID, 'addToCart')
    btns[0].click()
    time.sleep(1)
    context.driver.switch_to.alert.accept()

@when('I click the shopping cart button')
def clickShoppingCart(context):
    context.driver.find_element(By.XPATH, '/html/body/app-root/app-home/html/app-navbar/header/div/div/div/div[2]/mat-toolbar/a[3]').click()
    time.sleep(0.25)


@when('I click the purchase button')
def clickPurchaseCart(context):
    context.driver.find_element(By.ID, 'purchaseBtn').click()
    time.sleep(0.25)

@when('I logout')
def logout(context):
    context.driver.find_element(By.XPATH, '/html/body/app-root/app-home/html/app-navbar/header/div/div/div/div[2]/mat-toolbar/a[4]').click()
    time.sleep(2)

@when('I login as an admin')
def loginAdmin(context):
    fillBox(context,'email','admin@admin.com')
    fillBox(context,'password','123456')
    submitCredentials(context)

@when('I click the sales button')
def clickSales(context):
    context.driver.find_element(By.ID, 'salesLink').click()
    time.sleep(0.25)


@then('I see my email in Sales table')
def seeEmail(context):
    emailsElements = context.driver.find_elements(By.ID, 'emailInfo')
    codesElements = context.driver.find_elements(By.ID, 'codeInfo')
    emails = list(map(getText,emailsElements))
    codes = list(map(getText,codesElements))
    clientEmail = 'client@client.com'
    findClientEmail = False
    saleId = '0'
    for i in range(len(emails)):
        if emails[i] == clientEmail:
            findClientEmail = True
            saleId = codes[i]
            break
            
    removeSaleAndRestockProducts(saleId)
    assert findClientEmail is True
    

    