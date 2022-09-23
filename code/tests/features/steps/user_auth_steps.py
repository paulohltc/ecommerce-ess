from behave import *
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By



@given('I am using the Chrome browser')
def launchBrowser(context):
    context.driver = webdriver.Chrome(ChromeDriverManager().install())


@given('I am at "{page}" page')
def loadPage(context,page):
    base = 'http://localhost:4200/'
    url = base + page
    context.driver.get(url)
image.png
@when('I fill the CPF box with "{cpf}"')
def fillCPF(context,cpf):
    context.driver.find_element(By.ID, 'cpfInput').send_keys(cpf)


@when('I fill the password box with "{password}"')
def fillPassword(context,password):
    context.driver.find_element(By.ID, 'passwordInput').send_keys(password)


@when('I submit my credentials')
def submitCredentials(context):
    context.driver.find_element(By.ID, 'loginBtn').click()



@then('I am now at "{page}" page')
def checkPage(context,page):
    status = context.driver.current_url == 'http://localhost:4200/cliente-home'
    assert status is True

@then('I close my browser')
def checkClienteHomePage(context):
    context.driver.close()
