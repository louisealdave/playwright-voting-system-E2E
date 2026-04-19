async function logout(page) {
    await page.getByRole('button', { name: 'user@email.com' }).click();
    await page.getByRole('button', { name: 'Logout'}).click();
}

module.exports = { logout };
