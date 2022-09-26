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

@when('I fill the name box with "{name}"')
def fillName(context,name):
    context.driver.find_element(By.ID, 'nameInput').send_keys(name)

@when('I fill the CPF box with "{cpf}"')
def fillCPF(context,cpf):
    context.driver.find_element(By.ID, 'cpfInput').send_keys(cpf)


@when('I fill the password box with "{password}"')
def fillPassword(context,password):
    context.driver.find_element(By.ID, 'passwordInput').send_keys(password)


@when('I fill the email box with "{email}"')
def fillEmail(context,email):
    context.driver.find_element(By.ID, 'emailInput').send_keys(email)

@when('I submit my credentials')
def submitCredentials(context):
    context.driver.find_element(By.ID, 'btnSubmit').click()


@then('I don\'t see the item Usuários in the sidenav')
def checkUsuariosSidenav(context):
    users = context.driver.find_elements(By.ID, 'sideNavUsers')
    isEmployee = len(users) == 0
    assert isEmployee is True

@then('I am now at "{page}" page')
def checkPage(context,page):
    base = 'http://localhost:4200/'
    url = base + page
    status = context.driver.current_url == url
    assert status is True

@then('A message "{message}" comes to my screen')
def checkError(context, message):
    error = context.driver.find_element(By.ID, 'errorMsg')
    status = message == error.text
    assert status is True

# @then('I close my browser')
# def checkClienteHomePage(context):
#     context.driver.close()
