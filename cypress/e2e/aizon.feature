Feature: Aizon Scenarios
  
  @api @main_page
  Scenario: TC_1_Login_logout
    When I login application
    Then 'Login' is successfully
    When I logout application
    Then 'Logout' is successfully

  @api @main_page
  Scenario: TC_2_Add_product_and_deletion
    When I login application
    Then 'Login' is successfully
    When I click on 'Samsung galaxy s6' text
    Then Expect 'Samsung galaxy s6' to be loaded
    When I click on 'Add to cart' text
    Then Expect 'Samsung galaxy s6' to be added in cart
    When I click on 'Delete' text
    Then Expect 'Samsung galaxy s6' to be removed

  @api @main_page
  Scenario: TC_3_Add_product_and_purchase
    When I login application
    Then 'Login' is successfully
    When I click on 'Samsung galaxy s6' text
    Then Expect 'Samsung galaxy s6' to be loaded
    When I click on 'Add to cart' text
    Then Expect 'Samsung galaxy s6' to be added in cart
    When I click on 'Place Order' text
    Then Expect input form
    When Fill input form
    And I click on 'Purchase' text
    Then 'Thank you for your purchase!' message is displayed
