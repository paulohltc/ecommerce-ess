from behave import *
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time

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

@given('I have logged in as a client')
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

@given('I added the first product of the products list to the cart')
def addFirstProduct(context):
    btns = context.driver.find_elements(By.ID, 'addToCart')
    btns[0].click()
    time.sleep(1)
    context.driver.switch_to.alert.accept()

@given('I click the shopping cart button')
def clickShoppingCart(context):
    context.driver.find_element(By.XPATH, '/html/body/app-root/app-home/html/app-navbar/header/div/div/div/div[2]/mat-toolbar/a[3]').click()