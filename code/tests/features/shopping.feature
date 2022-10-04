Feature: Buying products as a client
    As a client
    I want to realize shops
    In order to buy products

    Background: client home page
        Given I am logged in as a client
        And I am at the "cliente-home" page


    Scenario: Successful full shop, deletion of sale and restocking products
        When I added the first product of the products list to the cart
        And I click the shopping cart button
        And I click the purchase button
        And I fill the "name" box with "Clecio"
        And I fill the "CPF" box with "06296385214"
        And I fill the "CEP" box with "01472500"
        And I fill the "rua" box with "Rua dois"
        And I fill the "numero" box with "38"
        And I fill the "complemento" box with "Apt 101"
        And I click the purchase button
        And I logout
        And I login as an admin
        And I click the sales button
        Then I see my email in Sales table
