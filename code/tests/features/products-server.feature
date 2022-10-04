Feature: Products server
    As an user
    I want to realize operations with the server
    In order to it perform as it should

    Scenario: Successful product registering
        When I insert a product with name "Celular", price "2100", stock "50", description "Samsung S22" to the server
        Then the system now has a product name "Celular", price "2100", stock "50", description "Samsung S22"

    Scenario: Successful update stock
        Given the system has a product with code "0"
        When I update the stock of the product "0" with "500"
        Then the system stores "500" as stock for product "0"

