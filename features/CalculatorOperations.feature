Feature: Calculator operations

    Scenario: Positive test - add two numbers
        Given Calculator page is opened
        When  Calculate "3" "+" "5"
        Then the result should be "8"