const {test , expect } = require ('@playwright/test');

test("Valid Login test", async ({page}) => {

  await page.goto('https://eva-cruz-soundtrack-essays.trycloudflare.com/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect (page.getByText('Logging in to user...')).toContainText('Logging in to user...');
  await expect (page).toHaveURL('https://eva-cruz-soundtrack-essays.trycloudflare.com/')

});

test("Invalid Login - wrong username test", async ({page}) => {

  await page.goto('https://eva-cruz-soundtrack-essays.trycloudflare.com/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('admin123');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('dialog', { name: 'Oops...' })).toContainText('Oops...Please check your username and password, and try again!');

});


test("Invalid Login - wrong password test", async ({page}) => {

  await page.goto('https://eva-cruz-soundtrack-essays.trycloudflare.com/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('dialog', { name: 'Oops...' })).toContainText('Oops...Please check your username and password, and try again!');

});

test("Invalid Login - both wrong username and password test", async ({page}) => {

  await page.goto('https://eva-cruz-soundtrack-essays.trycloudflare.com/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('dialog', { name: 'Oops...' })).toContainText('Oops...Please check your username and password, and try again!');

});


test("Invalid Login - empty username", async ({page}) => {

  await page.goto('https://eva-cruz-soundtrack-essays.trycloudflare.com/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  const username = page.getByLabel('Username');
  await expect(username).toHaveJSProperty('validity.valid', false);

});

test("Invalid Login - empty password", async ({page}) => {

  await page.goto('https://eva-cruz-soundtrack-essays.trycloudflare.com/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('');
  await page.getByRole('button', { name: 'Login' }).click();
  const password = page.getByLabel('Password');
  await expect(password).toHaveJSProperty('validity.valid', false);

});

test("Invalid Login - empty username and password", async ({page}) => {

  await page.goto('https://eva-cruz-soundtrack-essays.trycloudflare.com/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('');
  await page.getByRole('textbox', { name: 'Password' }).fill('');
  await page.getByRole('button', { name: 'Login' }).click();
  const username = page.getByLabel('Username');
  await expect(username).toHaveJSProperty('validity.valid', false);
});