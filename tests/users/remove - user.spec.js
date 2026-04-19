const {test, expect} = require('@playwright/test');
const { login } = require('../helpers/auth');
const { createUser } = require('../helpers/create-user');
const { logout } = require('../helpers/logout');


test.describe('Remove user module', () => {

    test.beforeEach(async ({page}) => {
        await login(page, 'admin', 'admin123');
    });

 test('Remove admin user', async ({page}) => {
        await createUser(page, 'Admin6', 'AdminP6', '1');
        await page.getByRole('button', { name: 'OK' }).click();
         
      
       //for checking the created admin user in the user list and removing it
       
        const targetRow=page.locator('tr')
        .filter({hasText:'Admin6'})
        .filter({hasText:'Admin'})
        .first();

        await expect(targetRow).toBeVisible();
        await targetRow.getByRole('button', { name: 'Remove' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        await page.getByRole('button', { name: 'OK' }).click();


         //for checking the removed admin user in the user list
       
        const removedtargetRow=page.locator('tr')
        .filter({hasText:'Admin6'})
        .filter({hasText:'Admin'})
        .first();

        await expect(removedtargetRow).not.toBeVisible();

        //for checking if the removed user can login
        await logout(page);
        await login (page, 'Admin6', 'AdminP6');
        await expect(page.getByRole('dialog', { name: 'Oops...' })).toContainText('Oops...Please check your username and password, and try again!');
        
    });

    test('Remove regular user', async ({page}) => {
        await createUser(page, 'RegularUser3', 'RegUserP3', '2');
        await page.getByRole('button', { name: 'OK' }).click();

       //for checking the created regular user in the user list and removing it
        const targetRow=page.locator('tr')
        .filter({hasText:'RegularUser3'})
        .filter({hasText:'USER'})
        .first();

        await expect(targetRow).toBeVisible();
        await targetRow.getByRole('button', { name: 'Remove' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        await page.getByRole('button', { name: 'OK' }).click();


         //for checking the removed admin user in the user list
       
        const removedtargetRow=page.locator('tr')
        .filter({hasText:'RegularUser3'})
        .filter({hasText:'USER'})
        .first();

        await expect(removedtargetRow).not.toBeVisible();


    });

     test('Remove voter user', async ({page}) => {

        await createUser(page, 'Voter3', 'VoterP3', '3');
        await page.getByRole('button', { name: 'OK' }).click();

       //for checking the created regular user in the user list and removing it
       
        const targetRow=page.locator('tr')
        .filter({hasText:'Voter3'})
        .filter({hasText:'VOTER'})
        .first();

        await expect(targetRow).toBeVisible();
        await targetRow.getByRole('button', { name: 'Remove' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        await page.getByRole('button', { name: 'OK' }).click();


         //for checking the removed admin user in the user list
       
        const removedtargetRow=page.locator('tr')
        .filter({hasText:'Voter3'})
        .filter({hasText:'VOTER'})
        .first();

        await expect(removedtargetRow).not.toBeVisible();


    });
       



    });
