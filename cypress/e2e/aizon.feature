Feature: Aizon Scenarios
  
  @main_page
  Scenario: TC_1_Login-logout
    When I login application
    Then 'Login' is successfully
    When I logout application
    Then 'Logout' is successfully