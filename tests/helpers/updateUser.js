async function updateUser(page, data) {
  if (data.username) {
    await page.getByRole('textbox', { name: 'Username' }).fill(data.username);
  }

  if (data.password) {
      await page.getByRole('textbox', { name: 'Password' }).fill(data.password);
  }

  if (data.userType) {
      await page.locator('select[name="usertype"]').selectOption(data.userType);
  }

  await page.locator('button').filter({ hasText: /^Update$/ }).click();
}

module.exports = { updateUser };