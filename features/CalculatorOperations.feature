Feature: Calculator operations

    Scenario: Positive test - add two numbers
        Given Calculator page is opened
        When  Calculate "3" "+" "5"
        Then the result should be "8"

    Scenario: Positive test - Subtract two numbers
        Given Calculator page is opened
        When Calculate "7" "-" "4"
        Then the result should be "3"

    Scenario: Positive test - Multiply two numbers
        Given Calculator page is opened
        When Calculate "6" "*" "2"
        Then the result should be "12"

    Scenario: Positive test - Divide two numbers
        Given Calculator page is opened
        When Calculate "8" "/" "4"
        Then the result should be "2"

    Scenario: Positive test - Modulo operation
        Given Calculator page is opened
        When Calculate "9" "%" "4"
        Then the result should be "1"

    Scenario: Negative test - Division by zero
        Given Calculator page is opened
        When Calculate "5" "/" "0"
        Then the result should be "Infinity"

    Scenario: Negative test - Multiply empty fields
        Given Calculator page is opened
        When Calculate " " "*" " "
        Then the result should be "NaN"