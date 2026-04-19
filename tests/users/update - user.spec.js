const {test, expect} = require('@playwright/test');
const { login } = require('../helpers/auth');
const { logout } = require('../helpers/logout');
const { createUser } = require('../helpers/create-user');
const { getUserRow } = require('../helpers/getUserRow');


test.describe('Update user module', () => {

    test.beforeEach(async ({page}) => {
        await login(page, 'admin', 'admin123');
    });

    test('Update username for admin user with valid data', async ({page}) => {
        await createUser(page, 'Admin2', 'AdminP2', '1');
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the created admin user in the user list and updating it
        const row= await getUserRow(page, 'Admin2', 'Admin');
        await expect(row).toBeVisible();
        await row.getByRole('button', { name: 'Update' }).click();
        
        //for updating the user data
         await page.getByRole('textbox', { name: 'Username' }).fill('Admin2Updated');
        await page.locator('select[name="usertype"]').selectOption('1');
        await page.locator('button').filter({ hasText: /^Update$/ }).click();

        //for checking the success message after updating user details
        await expect(page.getByText('User Update Success!')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the updated admin user in the user list
        const updatedRow= await getUserRow(page, 'Admin2Updated', 'Admin');
        await expect(updatedRow).toBeVisible();
       
        //for checking if the updated username works
        await logout(page);
        await expect(page).toHaveURL('/login')

        await login (page, 'Admin2Updated', 'AdminP2');
        await expect (page.getByText('Logging in to user...')).toContainText('Logging in to user...');
        await expect (page).toHaveURL('/login')

    });

    test('Update password for admin user with valid data', async ({page}) => {
        await createUser(page, 'Admin3', 'AdminP3', '1');
        await page.getByRole('button', { name: 'OK' }).click();
    
        //for checking the created admin user in the user list and updating it
        const row = await getUserRow(page, 'Admin3', 'Admin');
        await expect(row).toBeVisible();
        await row.getByRole('button', { name: 'Update' }).click();
        
        //for updating the user data
        await page.getByRole('textbox', { name: 'Password' }).fill('AdminUpdate123');
        await page.locator('select[name="usertype"]').selectOption('1');
        await page.locator('button').filter({ hasText: /^Update$/ }).click();

        //for checking the success message after updating user details
        await expect(page.getByText('User Update Success!')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the updated admin user in the user list
        const updatedRow = await getUserRow(page, 'Admin3', 'Admin');
        await expect(updatedRow).toBeVisible();

        //for checking if the updated password works
        await logout(page);
        await expect(page).toHaveURL('/login')

        await login (page, 'Admin3', 'AdminUpdate123');
        await expect (page.getByText('Logging in to user...')).toContainText('Logging in to user...');
        await expect (page).toHaveURL('/login')

    });

    test('Update usertype for admin user to user', async ({page}) => {
        await createUser(page, 'Admin4', 'AdminP4', '1');
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the created admin user in the user list and updating it
        const row= await getUserRow(page, 'Admin4', 'Admin');
        await expect(row).toBeVisible();
        await row.getByRole('button', { name: 'Update' }).click();
        
        //for updating the user data
        await page.locator('select[name="usertype"]').selectOption('2');
        await page.locator('button').filter({ hasText: /^Update$/ }).click();

        //for checking the success message after updating user details
        await expect(page.getByText('User Update Success!')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the updated admin user in the user list
       const updatedRow= await getUserRow(page, 'Admin4', 'User');
        await expect(updatedRow).toBeVisible();

    });

     test('Update usertype for regular user to voter', async ({page}) => {
        await createUser(page, 'RegularUser2', 'RegUserP2', '2');
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the created admin user in the user list and updating it
        const row= await getUserRow(page, 'RegularUser2', 'User');
        await expect(row).toBeVisible();
        await row.getByRole('button', { name: 'Update' }).click();
        
        //for updating the user data
        await page.locator('select[name="usertype"]').selectOption('3');
        await page.locator('button').filter({ hasText: /^Update$/ }).click();

        //for checking the success message after updating user details
        await expect(page.getByText('User Update Success!')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the updated admin user in the user list
        const updatedRow= await getUserRow(page, 'RegularUser2', 'Voter');
        await expect(updatedRow).toBeVisible();


    });

     test('Verify Close Button function', async ({page}) => {
        await createUser(page, 'Admin5', 'AdminP5', '1');
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the created admin user in the user list and updating it
        const row= await getUserRow(page, 'Admin5', 'Admin');
        await expect(row).toBeVisible();
        await row.getByRole('button', { name: 'Update' }).click();
        
        //for checking the close button function
        await page.locator('button.btn-secondary', { hasText: 'Close' }).click();
       await expect(page.getByText('CoreUI LogoSystem')).toBeVisible();
    });

     test('Update voter user with empty username', async ({page}) => {
        await createUser(page, 'Voter2', 'VoterP2', '3');
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the created admin user in the user list and updating it
        const row= await getUserRow(page, 'Voter2', 'Voter');
        await expect(row).toBeVisible();
        await row.getByRole('button', { name: 'Update' }).click();
        
        //for updating the user data
        await page.getByRole('textbox', { name: 'Username' }).fill('');
        await page.locator('select[name="usertype"]').selectOption('3');
        await page.locator('button').filter({ hasText: /^Update$/ }).click();

        //for checking the required field validation for username
        const username = page.getByRole('textbox', { name: 'Username' });
        await expect(username).toHaveJSProperty('validity.valid', false);
    
    });


    
     test('Update voter user with empty password', async ({page}) => {
        await createUser(page, 'Voter3', 'VoterP3', '3');
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the created admin user in the user list and updating it
        const row= await getUserRow(page, 'Voter3', 'Voter');
        await expect(row).toBeVisible();
        await row.getByRole('button', { name: 'Update' }).click();
        
        //for updating the user data
         await page.getByRole('textbox', { name: 'Password' }).fill('');
        await page.locator('select[name="usertype"]').selectOption('3');
        await page.locator('button').filter({ hasText: /^Update$/ }).click();

        //for checking the required field validation for username
        const password = page.getByRole('textbox', { name: 'Password' });
        await expect(password).toHaveJSProperty('validity.valid', false);
    
    });

     test('Update voter user with empty username and password', async ({page}) => {
        await createUser(page, 'Voter4', 'VoterP4', '3');
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the created admin user in the user list and updating it
        const row= await getUserRow(page, 'Voter4', 'Voter');
        await expect(row).toBeVisible();
        await row.getByRole('button', { name: 'Update' }).click();
        
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
       