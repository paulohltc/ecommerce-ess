Feature: User Authentication Login

    As a user
    I want to login with my credentials
    so that I can use the system

    Background: Login page
        Given I am using the Chrome browser
        And I am at "login" page

    Scenario: Successful login as a Client
        When I fill the CPF box with "00000000002"
        And I fill the password box with "123"
        And I submit my credentials
        Then I am now at "cliente-home" page


    Scenario: Successful login as a Employee
        When I fill the CPF box with "00000000003"
        And I fill the password box with "123"
        And I submit my credentials
        Then I am now at "products" page
        And I don't see the item Usuários in the sidenav


    Scenario: Unsuccessful login as a Client
        When I fill the CPF box with "00000000002"
        And I fill the password box with "wrongpassword"
        And I submit my credentials
        Then I am now at "login" page
        And A message "Senha incorreta!" comes to my screen

    Scenario: Unsuccessful login as a Employee
        When I fill the CPF box with "00000000003"
        And I fill the password box with "wrongpassword"
        And I submit my credentials
        Then I am now at "login" page
        And A message "Senha incorreta!" comes to my screen

    Scenario: Unsuccessful login with unregistered CPF
        When I fill the CPF box with "00000000000"
        And I fill the password box with "password"
        And I submit my credentials
        Then I am now at "login" page
        And A message "Conta não existente!" comes to my screen

