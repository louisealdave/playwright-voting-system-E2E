const {test, expect} = require('@playwright/test');
const { login } = require('../helpers/auth');


test.describe('Create user module', () => {

    test.beforeEach(async ({page}) => {
        await login(page, 'Admin1', 'AdminP1');
    });

    test('Create admin user with valid data', async ({page}) => {
        await page.getByRole('link', { name: 'System Users' }).click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('Admin1');
        await page.getByRole('textbox', { name: 'Password' }).fill('AdminP1');
        await page.locator('select[name="usertype"]').selectOption('1');
        await page.getByRole('dialog').getByRole('button', { name: 'Create' }).click();
         await page.getByRole('button', { name: 'OK' }).click();
        //for checking the success message after creating a user
        await expect(page.getByText('User Creation Success')).toBeVisible();

        /*for checking the created user in the user list 
       const rows = page.locator('tr');

       const targetRow = rows.filter({hasText: 'Admin1'
        }).filter({hasText: 'Admin'
        });

        await expect(targetRow).toContainText('Admin1');
        await expect(targetRow).toContainText('Admin');
   */
    });

 test('Create regular user with valid data', async ({page}) => {
        await page.getByRole('link', { name: 'System Users' }).click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('RegularUser1');
        await page.getByRole('textbox', { name: 'Password' }).fill('RegUserP1');
        await page.locator('select[name="usertype"]').selectOption('2');
        await page.getByRole('dialog').getByRole('button', { name: 'Create' }).click();
         await page.getByRole('button', { name: 'OK' }).click();
        //for checking the success message after creating a user
        await expect(page.getByText('User Creation Success')).toBeVisible();

        /*for checking the created user in the user list 
       const rows = page.locator('tr');

       const targetRow = rows.filter({hasText: 'RegularUser1'
        }).filter({hasText: 'User'
        });

        await expect(targetRow).toContainText('RegularUser1');
        await expect(targetRow).toContainText('User');
    */
    });

    test('Create voter user with valid data', async ({page}) => {
        await page.getByRole('link', { name: 'System Users' }).click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('Voter1');
        await page.getByRole('textbox', { name: 'Password' }).fill('VoterP1');
        await page.locator('select[name="usertype"]').selectOption('3');
        await page.getByRole('dialog').getByRole('button', { name: 'Create' }).click();
         await page.getByRole('button', { name: 'OK' }).click();
        //for checking the success message after creating a user
        await expect(page.getByText('User Creation Success')).toBeVisible();

        /*for checking the created user in the user list 
       const rows = page.locator('tr');

       const targetRow = rows.filter({hasText: 'Voter1'
        }).filter({hasText: 'Voter'
        });

        await expect(targetRow).toContainText('Voter1);
        await expect(targetRow).toContainText('Voter');
    */
    });

    

});

