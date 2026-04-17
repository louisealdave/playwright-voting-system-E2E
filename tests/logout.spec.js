const {test, expect} = require('@playwright/test');
const { login } = require('./helpers/auth');

test.describe('Logout Module', () => {
 
    test('Valid Logout', async ({page}) => {
    
    await login(page,'admin', 'admin123')
    await page.getByRole('button', { name: 'user@email.com' }).click();
    await page.getByRole('button', { name: 'Logout'}).click();
    await expect(page).toHaveURL('/login')

    })

})
