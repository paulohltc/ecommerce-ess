Feature: User Authentication

    As a user
    I want to login with my credentials
    so that I can use the system

    Background: Login page
        Given I am using the Chrome browser
        And I am at "login" page

    Scenario: Successful login as a Client
        When I fill the CPF box with "00000000001"
        And I fill the password box with "123"
        And I submit my credentials
        Then I am now at "cliente-home" page
        And I close my browser

# Scenario: Successful login as a Employee
#     And I am a employee
#     When I fill the CPF box with "432156789-01"
#     And I fill the password box with "employeepassword"
#     And I submit my credentials
#     Then A message "Successful login" comes to my screen
#     And I am now logged in
#     And I am now at "Home page"

# Scenario: Unsuccessful login as a Client
#     And I am a client
#     When I fill the CPF box with "123456789-01"
#     And I fill the password box with "clientpasswor"
#     And I submit my credentials
#     Then A message "Wrong credentials" comes to my screen
#     And I am not logged in
#     And I go back to "Login page"

# Scenario: Unsuccessful login as a Employee
#     And I am a employee
#     When I fill the CPF box with "432156789-01"
#     And I fill the password box with "employeepasswor"
#     And I submit my credentials
#     Then A message "Wrong credentials" comes to my screen
#     And I am not logged in
#     And I go back to "Login page"

# Scenario: Unsuccessful login with unregistered CPF
#     And I am not a registered user
#     When I fill the CPF box with "000000000-00"
#     And I fill the password box with "password"
#     And I submit my credentials
#     Then A message "CPF is not registered" comes to my screen
#     And I am not logged in
#     And I go back to "Login page"


# Scenario: Sign up new account that does not exist
#     Given I am a not registered user
#     When I go to "Register page"
#     And I fill the CPF box with "234567890-12"
#     And I fill the rest of my credentials
#     And I submit it all
#     Then A message "Your account has been registered" comes to my screen
#     And I go back to "Login page"

# Scenario: Sign up new account that already exist
#     Given I am a registered user
#     When I go to "Register page"
#     And I fill the CPF box with "123456789-01"
#     And I fill the rest of my credentials
#     And I submit it all
#     Then A message "CPF is already registered" comes to my screen
#     And I am still in "Register page"

