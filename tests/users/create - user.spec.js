const {test, expect} = require('@playwright/test');
const { login } = require('../helpers/auth');


test.describe('Create user module', () => {

    test.beforeEach(async ({page}) => {
        await login(page, 'admin', 'admin123');
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

     test('Create user with empty Username', async ({page}) => {
        await page.getByRole('link', { name: 'System Users' }).click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('');
        await page.getByRole('textbox', { name: 'Password' }).fill('AdminP1');
        await page.locator('select[name="usertype"]').selectOption('1');
        await page.getByRole('dialog').getByRole('button', { name: 'Create' }).click();

        //for checking the reired field validation message after creating a user
        const uusername = page.getByRole('textbox', { name: 'Username' });
        await expect(uusername).toHaveJSProperty('validity.valid', false);
    });

    test('Create user with empty Password', async ({page}) => {
        await page.getByRole('link', { name: 'System Users' }).click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('Admin1');
        await page.getByRole('textbox', { name: 'Password' }).fill('');
        await page.locator('select[name="usertype"]').selectOption('1');
        await page.getByRole('dialog').getByRole('button', { name: 'Create' }).click();

        //for checking the required field validation message after creating a user
        const upassword = page.getByRole('textbox', { name: 'Password' });
        await expect(upassword).toHaveJSProperty('validity.valid', false);
    });

     test('Create user with empty Username and Password', async ({page}) => {
        await page.getByRole('link', { name: 'System Users' }).click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('');
        await page.getByRole('textbox', { name: 'Password' }).fill('');
        await page.locator('select[name="usertype"]').selectOption('1');
        await page.getByRole('dialog').getByRole('button', { name: 'Create' }).click();

        //for checking the required field validation message after creating a user
        const uusername = page.getByRole('textbox', { name: 'Username' });
        const upassword = page.getByRole('textbox', { name: 'Password' });
        await expect(uusername).toHaveJSProperty('validity.valid', false);
        await expect(upassword).toHaveJSProperty('validity.valid', false);
    });

       test('Verify Close Button function', async ({page}) => {
        await page.getByRole('link', { name: 'System Users' }).click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('Admin1');
        await page.getByRole('textbox', { name: 'Password' }).fill('AdminP1');
        await page.locator('select[name="usertype"]').selectOption('1');
      

        //for checking the close button function
        await page.locator('button.btn-secondary', { hasText: 'Close' }).click();
       await expect(page.getByText('CoreUI LogoSystem')).toBeVisible();
    });
      
    

});

