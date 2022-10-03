Feature: Buying products as a client
    As a client
    I want to realize shops
    In order to buy products

    Background: client home page
        Given I have logged in as a client
        And I am at the "cliente-home" page

    Scenario: Successful add product to cart
        When I want to buy the first product of the products list
        Then I see the "Produto adicionado com sucesso" alert

# Background: shopping cart page
# Given I have logged in as a "cliente"
# And I am at the "shopping-cart" page

# Scenario: Successful change product amount from cart
# When I have "Microondas" in my cart
# And I increase the quantity of "Microondas" in 1
# Then I see the sum of the new amount of "Microondas" in my cart

# Scenario: Unsuccesful change unavailable product amount from cart
# When I have "Microondas" in my cart
# And "Microondas" only has 1 available in "stock"
# And I increase the quantity of "Microondas" in 1
# Then I see the "Estoque inexistente" alert

# Scenario: Change product amount to 0
# When I have "Microondas" in my cart
# And I change the "Microondas" amount to 0
# Then I see the "Valor inválido para quantidade" alert

# Scenario: Unsuccessful buy product from empty cart
# When my shopping cart is empty
# And I want to buy something
# Then I see a "Carrinho vazio" alert

# Background: client purchase page
# Given I have logged in as a "cliente"
# And I am at the "cliente-purchase" page

# Scenario: Successful buy product from cart
# When I have "Microondas" in my cart
# And I want to buy these products
# Then I am now at the "cliente-purchase" page
# And I submit my credentials
# Then I see a "Pedido concluído com sucesso" message
# And I am at the "cliente-home" page

# Background: client profile page
# Given I have logged in as a "cliente"
# And I am at the "cliente-profile-page" page

# Scenario: Checking purchased products
# When I have purchased a product or products
# And I select "Meus pedidos"
# And I want to see more information about a request
# Then I am at the "items" page