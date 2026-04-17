const {test , expect } = require ('@playwright/test');
const { login } = require('./helpers/auth');

test.describe ('Login Module', () => {

  test("Valid Login test", async ({page}) => {
    
    await login (page, 'admin', 'admin123');
    await expect (page.getByText('Logging in to user...')).toContainText('Logging in to user...');
    await expect (page).toHaveURL('/login')

  });

  test("Invalid Login - wrong username test", async ({page}) => {

    await login (page, 'admin1','admin123');
    await expect(page.getByRole('dialog', { name: 'Oops...' })).toContainText('Oops...Please check your username and password, and try again!');

  });


  test("Invalid Login - wrong password test", async ({page}) => {

    await login(page, 'admin', 'admin1235');
    await expect(page.getByRole('dialog', { name: 'Oops...' })).toContainText('Oops...Please check your username and password, and try again!');

  });

  test("Invalid Login - both wrong username and password test", async ({page}) => {

    await login(page, 'admin1', 'admin1235');
    await expect(page.getByRole('dialog', { name: 'Oops...' })).toContainText('Oops...Please check your username and password, and try again!');

  });


  test("Invalid Login - empty username", async ({page}) => {

    await login(page,'','admin123');
    const username = page.getByLabel('Username');
    await expect(username).toHaveJSProperty('validity.valid', false);

  });

  test("Invalid Login - empty password", async ({page}) => {

    await login(page,'admin','');
    const password = page.getByLabel('Password');
    await expect(password).toHaveJSProperty('validity.valid', false);

  });

  test("Invalid Login - empty username and password", async ({page}) => {

    await login(page,'','');
    const username = page.getByLabel('Username');
    await expect(username).toHaveJSProperty('validity.valid', false);
  });

});