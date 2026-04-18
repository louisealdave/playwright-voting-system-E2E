const {test, expect} = require('@playwright/test');
const { login } = require('../helpers/auth');


test.describe('Remove user module', () => {

    test.beforeEach(async ({page}) => {
        await login(page, 'admin', 'admin123');
    });

 test('Remove admin user', async ({page}) => {
        await page.getByRole('link', { name: 'System Users' }).click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('Admin1');
        await page.getByRole('textbox', { name: 'Password' }).fill('AdminP1');
        await page.locator('select[name="usertype"]').selectOption('1');
        await page.getByRole('dialog').getByRole('button', { name: 'Create' }).click();
         await page.getByRole('button', { name: 'OK' }).click();
         
        //for checking the success message after creating a user
        await expect(page.getByText('User Creation Success')).toBeVisible();

       //for checking the created admin user in the user list and removing it
       
        const targetRow=page.locator('tr')
        .filter({hasText:'Admin1'})
        .filter({hasText:'Admin'})
        .first();

        await expect(targetRow).toBeVisible();
        await targetRow.getByRole('button', { name: 'Remove' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        await page.getByRole('button', { name: 'OK' }).click();


         //for checking the removed admin user in the user list
       
        const removedtargetRow=page.locator('tr')
        .filter({hasText:'Admin1'})
        .filter({hasText:'Admin'})
        .first();

        await expect(removedtargetRow).not.toBeVisible();

        //for checking if the removed user can login
        await page.getByRole('button', { name: 'user@email.com' }).click();
        await page.getByRole('button', { name: 'Logout'}).click();
        await expect(page).toHaveURL('/login');

        await login (page, 'Admin1', 'AdminP1');
        await expect(page.getByRole('dialog', { name: 'Oops...' })).toContainText('Oops...Please check your username and password, and try again!');
        
    });

    test('Remove regular user', async ({page}) => {

        await page.getByRole('link', { name: 'System Users' }).click();
       //for checking the created regular user in the user list and removing it
       
        const targetRow=page.locator('tr')
        .filter({hasText:'RegularUser1'})
        .filter({hasText:'USER'})
        .first();

        await expect(targetRow).toBeVisible();
        await targetRow.getByRole('button', { name: 'Remove' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        await page.getByRole('button', { name: 'OK' }).click();


         //for checking the removed admin user in the user list
       
        const removedtargetRow=page.locator('tr')
        .filter({hasText:'RegularUser1'})
        .filter({hasText:'USER'})
        .first();

        await expect(removedtargetRow).not.toBeVisible();


    });

     test('Remove voter user', async ({page}) => {

        await page.getByRole('link', { name: 'System Users' }).click();
       //for checking the created regular user in the user list and removing it
       
        const targetRow=page.locator('tr')
        .filter({hasText:'Voter1'})
        .filter({hasText:'VOTER'})
        .first();

        await expect(targetRow).toBeVisible();
        await targetRow.getByRole('button', { name: 'Remove' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        await page.getByRole('button', { name: 'OK' }).click();


         //for checking the removed admin user in the user list
       
        const removedtargetRow=page.locator('tr')
        .filter({hasText:'Voter1'})
        .filter({hasText:'VOTER'})
        .first();

        await expect(removedtargetRow).not.toBeVisible();


    });
       



    });
