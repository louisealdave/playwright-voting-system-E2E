async function getUserRow(page, username, usertype) {
  return page.locator('tr')
    .filter({ hasText: username })
    .filter({ hasText: usertype })
    .first();
}

module.exports = { getUserRow };