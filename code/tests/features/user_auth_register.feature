Feature: User Authentication Register
    As a user
    I want to register with my credentials
    so that I can use the system

    Background: Register page
        Given I am using the Chrome browser
        And I go to "register" page

    # Scenario: Sign up new account that does not exist
    #     When I fill the email box with "Clecio"
    #     And I fill the password box with "clecio123456"
    #     And I submit my credentials
    #     Then I am now at "login" page

    Scenario: Sign up new account that already exist
        When I fill the email box with "client@client.com"
        And I fill the password box with "123456"
        And I submit my credentials
        Then I see the "Conta já existente ou formato inválido" alert
        And I accept the alert
        And I am now at "register" page

