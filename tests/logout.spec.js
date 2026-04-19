const {test, expect} = require('@playwright/test');
const { login } = require('./helpers/auth');
const { logout } = require('./helpers/logout');

test.describe('Logout Module', () => {
 
    test('Valid Logout', async ({page}) => {
    
        await login(page,'admin', 'admin123')
        await logout(page);
        await expect(page).toHaveURL('/login')
        
    })

})
