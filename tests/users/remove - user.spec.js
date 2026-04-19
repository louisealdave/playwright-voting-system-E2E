const {test, expect} = require('@playwright/test');
const { login } = require('../helpers/auth');
const { createUser } = require('../helpers/create-user');
const { logout } = require('../helpers/logout');
const { getUserRow } = require('../helpers/getUserRow');


test.describe('Remove user module', () => {

    test.beforeEach(async ({page}) => {
        await login(page, 'admin', 'admin123');
    });

 test('Remove admin user', async ({page}) => {
        await createUser(page, 'Admin6', 'AdminP6', '1');
        await page.getByRole('button', { name: 'OK' }).click();
         
       //for checking the created admin user in the user list and removing it
       const row= await getUserRow(page, 'Admin6', 'Admin');
        await expect(row).toBeVisible();
        await row.getByRole('button', { name: 'Remove' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        await page.getByRole('button', { name: 'OK' }).click();


         //for checking the removed admin user in the user list
        const removedTargetRow= await getUserRow(page, 'Admin6', 'Admin');
        await expect(removedTargetRow).not.toBeVisible();
    

        //for checking if the removed user can login
        await logout(page);
        await login (page, 'Admin6', 'AdminP6');
        await expect(page.getByRole('dialog', { name: 'Oops...' })).toContainText('Oops...Please check your username and password, and try again!');
        
    });

    test('Remove regular user', async ({page}) => {
        await createUser(page, 'RegularUser3', 'RegUserP3', '2');
        await page.getByRole('button', { name: 'OK' }).click();

       //for checking the created regular user in the user list and removing it
       const row= await getUserRow(page, 'RegularUser3', 'User');
        await expect(row).toBeVisible();
        await row.getByRole('button', { name: 'Remove' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        await page.getByRole('button', { name: 'OK' }).click();

         //for checking the removed admin user in the user list
        const removedTrgetRow= await getUserRow(page, 'RegularUser3', 'User');
        await expect(removedTrgetRow).not.toBeVisible();

    });

     test('Remove voter user', async ({page}) => {
        await createUser(page, 'Voter3', 'VoterP3', '3');
        await page.getByRole('button', { name: 'OK' }).click();

       //for checking the created regular user in the user list and removing it
        const row= await getUserRow(page, 'Voter3', 'Voter');
        await expect(row).toBeVisible();
        await row.getByRole('button', { name: 'Remove' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        await page.getByRole('button', { name: 'OK' }).click();

         //for checking the removed admin user in the user list
        const removedTargetRow= await getUserRow(page, 'Voter3', 'Voter');
        await expect(removedTargetRow).not.toBeVisible();

    });
       
    });
