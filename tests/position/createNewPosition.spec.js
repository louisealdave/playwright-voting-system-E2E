const {test, expect} = require('@playwright/test');
const { login } = require('../helpers/auth');
const { logout } = require('../helpers/logout');
const { getPositionRow } = require('../helpers/getPositionRow');
const { createPosition } = require('../helpers/createPosition');
const { createCandidate } = require('../helpers/createCandidate');

test.describe('Create Position module', () => {

    test.beforeEach(async ({page}) => {
        await login(page, 'admin', 'admin123');
    });
 
    test('Create a new position with valid data', async ({page}) => {
        await createPosition(page, 'President1', 'Leader of the organization', '1', 'LIS Elementary SSG Election', true);
        
        await expect(page.getByText('Position Creation Success')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();
        
        //for checking the created position in the position list
        const row = await getPositionRow(page, 'President1', 'LIS Elementary SSG Election', 'Leader of the organization', '1', true);
        await expect(row).toBeVisible();

    });

    test('Create a new position with empty position name', async ({page}) => {
        await createPosition(page, '', 'Leader of the organization', '1', 'LIS Elementary SSG Election', true);
        const positionName = page.getByRole('textbox', { name: 'Position Name' });
        await expect(positionName).toHaveJSProperty('validity.valid', false);
    
    });

     test('Create new position with special characters in position name', async ({page}) => {
        await createPosition(page, 'President@2026', 'Leader of the organization', '1', 'LIS Elementary SSG Election', true);
        await expect(page.getByText('Position Creation Success')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the created position in the position list
        const row = await getPositionRow(page, 'President@2026', 'LIS Elementary SSG Election', 'Leader of the organization', '1', true);
        await expect(row).toBeVisible();
    
    });

     test('Create new position with long position name', async ({page}) => {
        const longPositionName = 'P'.repeat(256);
        await createPosition(page, longPositionName, 'Leader of the organization', '1', 'LIS Elementary SSG Election', true);
        await expect(page.getByText('Position Creation Success')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the created position in the position list
        const row = await getPositionRow(page, longPositionName, 'LIS Elementary SSG Election', 'Leader of the organization', '1', true);
        await expect(row).toBeVisible();
    
    });

    test('Create a new position with duplicate position name in different election', async ({page}) => {
        await createPosition(page, 'President3', 'Leader of the organization', '1', 'LIS Elementary SSG Election', true);
        await expect(page.getByText('Position Creation Success')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();
        
        await createPosition(page, 'President3', 'Another description', '1', '2026 Student Council General Election', true);
        await expect(page.getByText('Position Creation Success')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();
        
        //for checking the created position in the position list
        const row = await getPositionRow(page, 'President3', 'LIS Elementary SSG Election', 'Leader of the organization', '1', true);
        await expect(row).toBeVisible();
        const row2 = await getPositionRow(page, 'President3', '2026 Student Council General Election', 'Another description', '1', true);
        await expect(row2).toBeVisible();
    });

    test('Create new position and check if it can be selected when creating a candidate', async ({page}) => {
        await createPosition(page, 'President4', 'Leader of the organization', '1', 'LIS Elementary SSG Election', true);
        await expect(page.getByText('Position Creation Success')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();
        
        //for checking the created position in the position list
        const row = await getPositionRow(page, 'President4', 'LIS Elementary SSG Election', 'Leader of the organization', '1', true);
        await expect(row).toBeVisible();

        //for checking if the created position can be selected when creating a candidate
        await createCandidate(page, 'Candidate1', 'Last Name', '4th Year', 'Molave', 'LIS Elementary SSG Election', 'President4' );
        await page.getByText('Candidate Creation Success!').click();
        await page.getByRole('button', { name: 'OK' }).click();
    })

     test('Create a new position with empty position description', async ({page}) => {
        await createPosition(page, 'President5', '', '1', 'LIS Elementary SSG Election', true);
        const positionDescription = page.getByRole('textbox', { name: 'Position Description' });
        await expect(positionDescription).toHaveJSProperty('validity.valid', false);
    
    });

     test('Create a new position with special characters in position description', async ({page}) => {
        await createPosition(page, 'President5', 'Leader of the @organization', '1', 'LIS Elementary SSG Election', true);
        await expect(page.getByText('Position Creation Success')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the created position in the position list
        const row = await getPositionRow(page, 'President5', 'LIS Elementary SSG Election', 'Leader of the @organization', '1', true);
        await expect(row).toBeVisible();
    
    });

     test('Create new position with long position description', async ({page}) => {
        const longPositionDescription = 'D'.repeat(256);
        await createPosition(page, 'President6', longPositionDescription, '1', 'LIS Elementary SSG Election', true);
        await expect(page.getByText('Position Creation Success')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the created position in the position list
        const row = await getPositionRow(page, 'President6', 'LIS Elementary SSG Election', longPositionDescription, '1', true);
        await expect(row).toBeVisible();
    
    });

    test('Create new position with zero winner count', async ({page}) => {
      
        await createPosition(page, 'President7', 'Test Description', '0', 'LIS Elementary SSG Election', true);
        const winnerField = page.getByRole('spinbutton', { name: 'Number of winners' });
        await expect(winnerField).not.toHaveValue('0');

    });
    

    test('Create new position with negative winner count', async ({page}) => {
      
        await createPosition(page, 'President7', 'Test Description', '-1', 'LIS Elementary SSG Election', true);
        const winnerField = page.getByRole('spinbutton', { name: 'Number of winners' });
        await expect(winnerField).not.toHaveValue('-1');

    });

    test('Create new position with maximum count', async ({page}) => {
      
        await createPosition(page, 'President7', 'Test Description', '1000', 'LIS Elementary SSG Election', true);
        const winnerField = page.getByRole('spinbutton', { name: 'Number of winners' });
        await expect(winnerField).toHaveJSProperty('validity.rangeOverflow', true);

    });

     test('Create a new position with empty election Name', async ({page}) => {
        await createPosition(page, 'President8', 'Test Description', '1', '', true);
        const electionName =  await page.getByLabel('Position Election');
        await expect(electionName).toHaveJSProperty('validity.valid', false);
    
    });

     test('Create a new position that is not optional', async ({page}) => {
        await createPosition(page, 'President9', 'Test Description', '1', 'LIS Elementary SSG Election', false);
        await expect(page.getByText('Position Creation Success')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        //for checking the created position in the position list
        const row = await getPositionRow(page, 'President9', 'LIS Elementary SSG Election', 'Test Description', '1', false);
        await expect(row).toBeVisible();

    
    });


});
