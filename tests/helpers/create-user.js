async function createUser(page, username, password, usertype) {
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('link', { name: 'System Users' }).click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.locator('select[name="usertype"]').selectOption(usertype);
    await page.getByRole('dialog').getByRole('button', { name: 'Create' }).click();
    
}
module.exports = { createUser };