const {test, expect} = require('@playwright/test');
const { login } = require('../helpers/auth');


test.describe('Update user module', () => {

    test.beforeEach(async ({page}) => {
        await login(page, 'admin', 'admin123');
    });

    test('Update username for admin user with valid data', async ({page}) => {
        await page.waitForLoadState('domcontentloaded');
        await page.getByRole('link', { name: 'System Users' }).click();

        //for checking the created admin user in the user list and updating it
       
        const targetRow=page.locator('tr')
        .filter({hasText:'Admin1'})
        .filter({hasText:'Admin'})
        .first();

        await expect(targetRow).toBeVisible();
        await targetRow.getByRole('button', { name: 'Update' }).click();
        
        //for updating the user data
         await page.getByRole('textbox', { name: 'Username' }).fill('Admin1Updated');
        await page.locator('select[name="usertype"]').selectOption('1');
        await page.locator('button').filter({ hasText: /^Update$/ }).click();

        //for checking the success message after creating a user
        await expect(page.getByText('User Update Success!')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the updated admin user in the user list
       
        const updatedtargetRow=page.locator('tr')
        .filter({hasText:'Admin1Updated'})
        .filter({hasText:'Admin'})
        .first();
        await expect(updatedtargetRow).toBeVisible();

        //for checking if the updated username works
        await page.getByRole('button', { name: 'user@email.com' }).click();
        await page.getByRole('button', { name: 'Logout'}).click();
        await expect(page).toHaveURL('/login')

        await login (page, 'Admin1Updated', 'AdminP1');

    });

    test('Update password for admin user with valid data', async ({page}) => {
        await page.waitForLoadState('domcontentloaded');
        await page.getByRole('link', { name: 'System Users' }).click();

        //for checking the created admin user in the user list and updating it
       
        const targetRow=page.locator('tr')
        .filter({hasText:'Admin1Updated'})
        .filter({hasText:'Admin'})
        .first();

        await expect(targetRow).toBeVisible();
        await targetRow.getByRole('button', { name: 'Update' }).click();
        
        //for updating the user data
        await page.getByRole('textbox', { name: 'Password' }).fill('AdminUpdate123');
        await page.locator('select[name="usertype"]').selectOption('1');
        await page.locator('button').filter({ hasText: /^Update$/ }).click();

        //for checking the success message after creating a user
        await expect(page.getByText('User Update Success!')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the updated admin user in the user list
       
        const updatedtargetRow=page.locator('tr')
        .filter({hasText:'Admin1Updated'})
        .filter({hasText:'Admin'})
        .first();
        await expect(updatedtargetRow).toBeVisible();

        //for checking if the updated password works
        await page.getByRole('button', { name: 'user@email.com' }).click();
        await page.getByRole('button', { name: 'Logout'}).click();
        await expect(page).toHaveURL('/login')

         await login (page, 'Admin1Updated', 'AdminUpdate123');

    });

    test('Update usertype for admin user to user', async ({page}) => {
        await page.waitForLoadState('domcontentloaded');
        await page.getByRole('link', { name: 'System Users' }).click();

        //for checking the created admin user in the user list and updating it
       
        const targetRow=page.locator('tr')
        .filter({hasText:'Admin1Updated'})
        .filter({hasText:'Admin'})
        .first();

        await expect(targetRow).toBeVisible();
        await targetRow.getByRole('button', { name: 'Update' }).click();
        
        //for updating the user data
        await page.locator('select[name="usertype"]').selectOption('2');
        await page.locator('button').filter({ hasText: /^Update$/ }).click();

        //for checking the success message after creating a user
        await expect(page.getByText('User Update Success!')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the updated admin user in the user list
       
        const updatedtargetRow=page.locator('tr')
        .filter({hasText:'Admin1Updated'})
        .filter({hasText:'User'})
        .first();
        await expect(updatedtargetRow).toBeVisible();


    });

     test('Update usertype for regular user to voter', async ({page}) => {
        await page.waitForLoadState('domcontentloaded');
        await page.getByRole('link', { name: 'System Users' }).click();

        //for checking the created admin user in the user list and updating it
       
        const targetRow=page.locator('tr')
        .filter({hasText:'Admin1Updated'})
        .filter({hasText:'User'})
        .first();

        await expect(targetRow).toBeVisible();
        await targetRow.getByRole('button', { name: 'Update' }).click();
        
        //for updating the user data
        await page.locator('select[name="usertype"]').selectOption('3');
        await page.locator('button').filter({ hasText: /^Update$/ }).click();

        //for checking the success message after creating a user
        await expect(page.getByText('User Update Success!')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the updated admin user in the user list
       
        const updatedtargetRow=page.locator('tr')
        .filter({hasText:'Admin1Updated'})
        .filter({hasText:'Voter'})
        .first();
        await expect(updatedtargetRow).toBeVisible();


    });

     test('Verify Close Button function', async ({page}) => {
        await page.waitForLoadState('domcontentloaded');
        await page.getByRole('link', { name: 'System Users' }).click();

        //for checking the created admin user in the user list and updating it
       
        const targetRow=page.locator('tr')
        .filter({hasText:'Admin1Updated'})
        .filter({hasText:'Voter'})
        .first();

        await expect(targetRow).toBeVisible();
        await targetRow.getByRole('button', { name: 'Update' }).click();
        
        //for checking the close button function
        await page.locator('button.btn-secondary', { hasText: 'Close' }).click();
       await expect(page.getByText('CoreUI LogoSystem')).toBeVisible();
    });

     test('Update voter user with empty username', async ({page}) => {
        await page.waitForLoadState('domcontentloaded');
        await page.getByRole('link', { name: 'System Users' }).click();

        //for checking the created admin user in the user list and updating it
       
        const targetRow=page.locator('tr')
        .filter({hasText:'Admin1Updated'})
        .filter({hasText:'Voter'})
        .first();

        await expect(targetRow).toBeVisible();
        await targetRow.getByRole('button', { name: 'Update' }).click();
        
        //for updating the user data
         await page.getByRole('textbox', { name: 'Username' }).fill('');
        await page.locator('select[name="usertype"]').selectOption('3');
        await page.locator('button').filter({ hasText: /^Update$/ }).click();

        //for checking the required field validation for username
        const username = page.getByRole('textbox', { name: 'Username' });
        await expect(username).toHaveJSProperty('validity.valid', false);
    
    });


    
     test('Update voter user with empty password', async ({page}) => {
        await page.waitForLoadState('domcontentloaded');
        await page.getByRole('link', { name: 'System Users' }).click();

        //for checking the created admin user in the user list and updating it
       
        const targetRow=page.locator('tr')
        .filter({hasText:'Admin1Updated'})
        .filter({hasText:'Voter'})
        .first();

        await expect(targetRow).toBeVisible();
        await targetRow.getByRole('button', { name: 'Update' }).click();
        
        //for updating the user data
         await page.getByRole('textbox', { name: 'Password' }).fill('');
        await page.locator('select[name="usertype"]').selectOption('3');
        await page.locator('button').filter({ hasText: /^Update$/ }).click();

        //for checking the required field validation for username
        const password = page.getByRole('textbox', { name: 'Password' });
        await expect(password).toHaveJSProperty('validity.valid', false);
    
    });

     test('Update voter user with empty username and password', async ({page}) => {
        await page.waitForLoadState('domcontentloaded');
        await page.getByRole('link', { name: 'System Users' }).click();

        //for checking the created admin user in the user list and updating it
       
        const targetRow=page.locator('tr')
        .filter({hasText:'Admin1Updated'})
        .filter({hasText:'Voter'})
        .first();

        await expect(targetRow).toBeVisible();
        await targetRow.getByRole('button', { name: 'Update' }).click();
        
        //for updating the user data
        await page.getByRole('textbox', { name: 'Username' }).fill('');
        await page.getByRole('textbox', { name: 'Password' }).fill('');
        await page.locator('select[name="usertype"]').selectOption('3');
        await page.locator('button').filter({ hasText: /^Update$/ }).click();

        //for checking the required field validation for username
        const username = page.getByRole('textbox', { name: 'Username' });
        const password = page.getByRole('textbox', { name: 'Password' });
        await expect(username).toHaveJSProperty('validity.valid', false);
        await expect(password).toHaveJSProperty('validity.valid', false);
    
    });

});
       