from behave import *
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time


@given('I am using the Chrome browser')
def launchBrowser(context):
    context.driver = webdriver.Chrome(ChromeDriverManager().install())
    context.driver.maximize_window()


@given('I go to "{page}" page')
def loadPage(context,page):
    base = 'http://localhost:4200/'
    url = base + page
    context.driver.get(url)

@when('I fill the name box with "{name}"')
def fillName(context,name):
    context.driver.find_element(By.ID, 'nameInput').send_keys(name)

@when('I fill the email box with "{email}"')
def fillEmail(context,email):
    context.driver.find_element(By.ID, 'emailInput').send_keys(email)


@when('I fill the password box with "{password}"')
def fillPassword(context,password):
    context.driver.find_element(By.ID, 'passwordInput').send_keys(password)


@when('I submit my credentials')
def submitCredentials(context):
    context.driver.find_element(By.ID, 'btnSubmit').click()
    time.sleep(2)



@then('I am now at "{page}" page')
def checkPage(context,page):
    base = 'http://localhost:4200/'
    url = base + page
    status = context.driver.current_url == url
    assert status is True


@then('I see the "{alert}" alert')
def checkAlert(context, alert):
    alertText = context.driver.switch_to.alert.text
    assert alertText == alert
    

@then('I accept the alert')
def acceptAlert(context):
    context.driver.switch_to.alert.accept()

