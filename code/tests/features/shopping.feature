# todo


Feature: Buying products as a cliente

    As a cliente
        I want to add a product to my shopping cart
        in order to buy the product

    Background: client home page
        Given I have logged in as a "cliente"
        And I am at the "cliente-home" page

    Scenario: Successful add product to cart
        Given I want to buy "Produto1"
        When I select the "Adicionar ao carrinho" function
        And I go to the "shopping-cart" page
        Then I see "Produto1" in my shopping cart

    Scenario: Successful buy product from cart
        Given I have "Produto1" in my cart 
        And I am at the "shopping-cart" page
        When I select the "Comprar" option
        And I am taken to the "cliente-debit-card" page
        And I input my credit card information
        Then I see a "succesfully purchased product" message

    Scenario: Unsuccessful buy product from empty cart
        Given I am at the "shopping-cart" page
        And my shopping cart is empty
        When I select the "Comprar" option
        Then I see a "carrinho vazio" message

    Scenario: Checking purchased products
        Given I am at the "cliente-profile-page"
        And I have purchased "Produto1"
        When I select "Meus pedidos"
        Then I see the "Produto1" purchase information





    