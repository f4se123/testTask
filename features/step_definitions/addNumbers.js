const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');

let browser;
let page;

Before(async function () {
    // Launch browser and create a new page
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    this.page = page; // Attach page to the context so that it can be accessed in step definitions
});

After(async function () {
    // Close the browser after tests
    await browser.close();
});

Given('Calculator page is opened', async function () {
    await this.page.goto('http://juliemr.github.io/protractor-demo/', { timeout: 15000 }); // Increased timeout
});

When('Calculate {string} {string} {string}', async function (first, operator, second) {
    await this.page.waitForSelector('input [ng-model="first"]', { timeout: 15000 }); // Increased timeout
    await this.page.fill('input [ng-model="first"]', first);

    await this.page.waitForSelector('select [ng-model="operator"]', { timeout: 15000 }); // Increased timeout
    await this.page.selectOption('select [ng-model="operator"]', operator);

    await this.page.waitForSelector('input [ng-model="second"]', { timeout: 15000 }); // Increased timeout
    await this.page.fill('input [ng-model="second"]', second);

    await this.page.waitForSelector('#gobutton', { timeout: 15000 }); // Increased timeout
    await this.page.click('#gobutton');
    await this.page.waitForSelector('h2.ng-binding', { timeout: 40000 }); // Increased timeout
});

Then('the result should be {string}', async function (expected) {
    const result = await this.page.textContent('h2.ng-binding');
    expect(result.trim()).toBe(expected);
});
