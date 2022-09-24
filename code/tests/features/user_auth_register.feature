Feature: User Authentication Register
    As a user
    I want to register with my credentials
    so that I can use the system

    Background: Register page
        Given I am using the Chrome browser
        And I am at "register" page

    Scenario: Sign up new account that does not exist
        When I fill the name box with "Clecio"
        And I fill the CPF box with "00000000004"
        And I fill the password box with "clecio123456"
        And I fill the email box with "clecio@gmail.com"
        And I submit my credentials
        Then I am now at "login" page

    Scenario: Sign up new account that already exist
        When I fill the name box with "Clecio"
        And I fill the CPF box with "00000000001"
        And I fill the password box with "clecio123456"
        And I fill the email box with "clecio@gmail.com"
        And I submit my credentials
        Then A message "CPF já cadastrado!" comes to my screen
        And I am now at "register" page

