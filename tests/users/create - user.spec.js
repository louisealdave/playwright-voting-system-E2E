const {test, expect} = require('@playwright/test');
const { login } = require('../helpers/auth');
const { createUser } = require('../helpers/create-user');


test.describe('Create user module', () => {

    test.beforeEach(async ({page}) => {
        await login(page, 'admin', 'admin123');
    });

    test('Create admin user with valid data', async ({page}) => {
        await createUser(page, 'Admin1', 'AdminP1', '1');
       
        //for checking the success message after creating a user
        await expect(page.getByText('User Creation Success')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the created user in the user list
         const targetRow=page.locator('tr')
        .filter({hasText:'Admin1'})
        .filter({hasText:'Admin'})
        .first();

        await expect(targetRow).toBeVisible();
       
    });

   
 test('Create regular user with valid data', async ({page}) => {
        await createUser(page, 'RegularUser1', 'RegUserP1', '2');
       
        //for checking the success message after creating a user
        await expect(page.getByText('User Creation Success')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the created user in the user list
         const targetRow=page.locator('tr')
        .filter({hasText:'RegularUser1'})
        .filter({hasText:'User'})
        .first();

        await expect(targetRow).toBeVisible();
    
    });


    test('Create voter user with valid data', async ({page}) => {
        await createUser(page, 'Voter1', 'VoterP1', '3');
        
        //for checking the success message after creating a user
        await expect(page.getByText('User Creation Success')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

       //for checking the created user in the user list
         const targetRow=page.locator('tr')
        .filter({hasText:'Voter1'})
        .filter({hasText:'Voter'})
        .first();

        await expect(targetRow).toBeVisible();
    });

     test('Create user with empty Username', async ({page}) => {
        await createUser(page, '', 'AdminP1', '1');
       
        //for checking the reired field validation message after creating a user
        const uusername = page.getByRole('textbox', { name: 'Username' });
        await expect(uusername).toHaveJSProperty('validity.valid', false);
    });

    test('Create user with empty Password', async ({page}) => {
        await createUser(page, 'Admin1', '', '1');

        //for checking the required field validation message after creating a user
        const upassword = page.getByRole('textbox', { name: 'Password' });
        await expect(upassword).toHaveJSProperty('validity.valid', false);
    });

     test('Create user with empty Username and Password', async ({page}) => {
        await createUser(page, '', '', '1');
        
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

