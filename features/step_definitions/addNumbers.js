const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');

let browser;
let page;

Before(async function () {
    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();
});

After(async function () {
    await this.browser.close();
});

Given('Calculator page is opened', async function () {
    await this.page.goto('http://juliemr.github.io/protractor-demo/', { timeout: 15000 });
});

When('Calculate {string} {string} {string}', { timeout: 20000 }, async function (first, operator, second) {
    await this.page.waitForSelector('input[ng-model="first"]', { timeout: 15000 });
    await this.page.fill('input[ng-model="first"]', first);

    await this.page.waitForSelector('select[ng-model="operator"]', { timeout: 15000 });
    const operatorMap = {
        '+': 'ADDITION',
        '-': 'SUBTRACTION',
        '*': 'MULTIPLICATION',
        '/': 'DIVISION',
        '%': 'MODULO',
    };
    await this.page.selectOption('select[ng-model="operator"]', operatorMap[operator]);

    await this.page.waitForSelector('input[ng-model="second"]', { timeout: 15000 });
    await this.page.fill('input[ng-model="second"]', second);

    await this.page.waitForSelector('#gobutton', { timeout: 15000 });
    await this.page.click('#gobutton');
    await this.page.waitForSelector('h2.ng-binding', { timeout: 40000 });
    await this.page.waitForTimeout(5000);
});

Then('the result should be {string}', async function (expected) {
    const result = await this.page.textContent('h2.ng-binding');
    expect(result.trim()).toBe(expected);
});

Then('the history should show {string}', async function (historyEntry) {
    // Отримуємо всі рядки таблиці історії операцій
    const history = await this.page.$$eval('table.table tbody tr', rows =>
        rows.map(row => {
            const time = row.querySelector('td.ng-binding').innerText.trim();
            const expressionSpans = row.querySelectorAll('span.ng-binding');
            const expression = Array.from(expressionSpans).map(span => span.innerText.trim()).join(' '); // Перетворюємо NodeList в масив
            const result = row.querySelector('td.ng-binding:nth-child(3)').innerText.trim();
            return `${expression} = ${result}`;
        })
    );


    // Перевіряємо, чи є потрібний запис в історії
    expect(history).toContain(historyEntry);
});
