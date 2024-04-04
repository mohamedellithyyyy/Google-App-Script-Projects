function createLinks() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var slotsSheet = spreadsheet.getSheetByName("Slots");
  var lastRow = slotsSheet.getLastRow();
  var range = slotsSheet.getRange("C1:C" + lastRow);
  var values = range.getValues();
  
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] === "GTa") {
      createLink(slotsSheet, i + 1, "http://aiesec.org/opportunity/global-talent/");
    } else if (values[i][0] === "GTe") {
      createLink(slotsSheet, i + 1, "http://aiesec.org/opportunity/global-teacher/");
    }
  }
}

function createLink(sheet, row, baseUrl) {
  var id = sheet.getRange(row, 2).getValue();
  var link = baseUrl + id;
  sheet.getRange(row, 1).setFormula('=HYPERLINK("' + link + '", "Link")');
}

// Function to set up the time-driven trigger to run 'createLinks' every 24 hours
function setUpTrigger() {
  ScriptApp.newTrigger('createLinks')
    .timeBased()
    .everyDays(1)
    .create();
}
