const puppeteer = require('puppeteer');
let broswer, page;


test('Test Adds two numbers', () => {
    /* Simple Test To know setup testing is setup correctly */
    const sum = 1 + 2
    expect(sum).toEqual(3)
});
/* Test To run Before Every Test To Start Headless Broswer */
beforeEach(async () => {
    broswer = await puppeteer.launch({
        headless: false
    });
    page = await broswer.newPage();
    await page.goto('localhost:3000');
})

/* Create Headless Broswer to vist our app and make assertions about application*/

test('Welcome Page is Running', async (done) => {
    const test = await page.$eval('h2.ui.black.center.aligned.header', el => el.innerHTML)
    expect(test).toEqual('Welcome to Fit App')
    done();

});

