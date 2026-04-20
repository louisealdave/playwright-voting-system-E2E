async function createPosition(page, positionName, positionDescription,numberofWinners, positionElection,optional) {
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('link', { name: 'Position' }).click();
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('button', { name: 'Create New Position' }).click();
    await page.getByRole('textbox', { name: 'Position Name' }).fill(positionName);
    await page.getByRole('textbox', { name: 'Position Description' }).fill(positionDescription);
    await page.getByRole('spinbutton', { name: 'Number of winners' }).fill(numberofWinners);
    await page.getByLabel('Position Election').selectOption(positionElection);
    await setOptionalCheckbox(page, optional);

     await page.getByRole('button', { name: 'Create', exact: true }).click();

}

async function setOptionalCheckbox(page, optional) {
  const checkbox = page.getByRole('checkbox', { name: 'Make Position Optional?' });

  if (optional === true) {
    await checkbox.check();
  } else if (optional === false) {
    await checkbox.uncheck();
  }
  // if undefined → do nothing
}

module.exports = { createPosition };
