async function getPositionRow(page, positionName, electionName, positionDescription, numberofWinners, optional) {
  return page.locator('tr')
    .filter({ hasText: positionName })
    .filter({ hasText: electionName })
    .filter({ hasText: positionDescription })
    .filter({ hasText: numberofWinners.toString() })
    .filter({ hasText: optional ? 'Yes' :'No' })    
    .first();
}

module.exports = { getPositionRow };