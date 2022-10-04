Feature: User Authentication Login

    As a user
    I want to login with my credentials
    so that I can use the system

    Background: Login page
        Given I am using the Chrome browser
        And I go to "login" page

    Scenario: Successful login as a Client
        When I fill the "email" box with "client@client.com"
        And I fill the "password" box with "123456"
        And I submit my credentials
        Then I am now at "cliente-home" page


    Scenario: Successful login as a Admin
        When I fill the "email" box with "admin@admin.com"
        And I fill the "password" box with "123456"
        And I submit my credentials
        Then I am now at "products" page


    Scenario: Unsuccessful login
        When I fill the "email" box with "client@client.com"
        And I fill the "password" box with "wrongpassword"
        And I submit my credentials
        Then I see the "Credenciais invalidas" alert
        And I accept the alert
        And I am now at "login" page



