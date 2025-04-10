# 🧪 Test Task: Calculator Testing (Trainee QA Manual)

This project is a **test task for the Trainee QA Manual** position.  
The goal is to demonstrate the ability to write automated tests in **BDD style** using **Cucumber.js** and **Playwright**.

🔗 Tested application: [Protractor Calculator](http://juliemr.github.io/protractor-demo/)

---

## 🔍 Implemented Test Scenarios

### ✅ Positive Tests:
- Addition: `3 + 5 = 8`
- Subtraction: `7 - 4 = 3`
- Multiplication: `6 * 2 = 12`
- Division: `8 / 4 = 2`
- Modulo operation: `9 % 4 = 1`

### ❌ Negative Tests:
- Division by zero: `5 / 0 = Infinity`
- Empty input fields: `"" + "" = NaN`

### 🧾 Operation History Validation:
- After performing a calculation, the result is added to the **history table**
- The history is checked for correct display of expression and result
