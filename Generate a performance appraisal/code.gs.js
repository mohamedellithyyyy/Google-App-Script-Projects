function afterFormSubmit(e) {
  if (!e || !e.namedValues) {
    console.error("Event object or namedValues property is undefined.");
    return;
  }
  console.log('Form submission data:', e.namedValues);
  // Extract form submission data
  const info = e.namedValues;
  
  // Create PDF file based on form data
  const pdfFile = createPDF(info);
  
  // Get the row number of the form submission
  const entryRow = e.range.getRow();
  
  // Get the 'People' sheet in the active spreadsheet
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("People");
  
  // Set URL and name of the PDF file in the corresponding columns in the 'People' sheet
  const pdfUrl = pdfFile.getUrl();
  const pdfName = pdfFile.getName();
  ws.getRange(entryRow, 6).setValue(pdfUrl);
  ws.getRange(entryRow, 7).setValue(pdfName);
  try {
    // Send email notification with attached PDF
    sendEmail(info['Email Address'][0], pdfFile, info);
    // If email sent successfully, mark as TRUE
    ws.getRange(entryRow, 8).setValue("TRUE");
  } catch (error) {
    console.error("Error sending email:", error);
    // If email sending fails, mark as FALSE
    ws.getRange(entryRow, 8).setValue("FALSE");
  }
  // Send email notification with attached PDF
}

function sendEmail(email, pdfFile, info) {
  // Set email subject
  let subject = `Performance Appraisal`;
  // Set email body with a default message
  let body = `Dear ${info['TL’s Name'][0]},\n\nHope this email finds you well. Kindly check the file attached for ${info['Month'][0]} Appraisal.\n\nBest Regards,\nMXP`;
  // Determine the function type based on form data
  const functionType = info && info['Function'] ? info['Function'][0] : '';
  // Customize email body based on the function type
  if (functionType === 'OGV' || functionType === 'OGT') {
    body += '\n\nIf you have any questions, ask Salma';
  } else if (functionType === 'IGV' || functionType === 'IGTa' || functionType === 'IGTe' || functionType === 'F&L') {
    body += '\n\nIf you have any questions, ask Reem';
  }
  // Send email with attached PDF
  GmailApp.sendEmail(email, subject, body, {
    attachments: [pdfFile.getAs(MimeType.PDF)],
    name: 'MXP AIESEC In ASU',
    cc: "email#1," + "email#2," + "email#3"
  });
  // Get the 'People' sheet in the active spreadsheet
}
function createPDF(info) {
  // Get folders by their IDs
  const pdfFolderId = "id";
  const tempFolderId = "id";
  const pdfFolder = DriveApp.getFolderById(pdfFolderId);
  const tempFolder = DriveApp.getFolderById(tempFolderId);
  // Determine which template document to use based on the number of members
  let templateDocId = info['Number of members'] == 4 ? "id" :
    (info['Number of members'] == 5 ? "id" : '');
  // Throw an error if the template document ID is not found
  if (!templateDocId) {
    throw new Error('Template document not found for the given number of members.');
  }
  // Get the template document
  const templateDoc = DriveApp.getFileById(templateDocId);
  // Create a copy of the template document in the temporary folder
  const newTempFile = templateDoc.makeCopy(tempFolder);
  // Open the copied document
  const openDoc = DocumentApp.openById(newTempFile.getId());
  const body = openDoc.getBody();
  // Replace placeholders in the document body with form data
  body.replaceText("{functionName}", info['Function'][0]);
      body.replaceText("{tl’sName}", info['TL’s Name'][0]);
      // body.replaceText("{TL's Email}", info['TL\'s Email'][0]);
      body.replaceText("{tlGoal}", info['Goal'][0]);
      body.replaceText("{tlAchieved}", info['Achieved'][0]);
      body.replaceText("{tlAchieved/tlGoal}", (info['Achieved'][0] / info['Goal'][0]) * 100);
      body.replaceText("{tl’sMXS}", info['MX Standards'][0]);
      body.replaceText("{tl’sNPS}", info['NPS'][0]);
      body.replaceText("{tl’sLPS}", info['LPS'][0]);
      body.replaceText("{tl’sProd}", info['Productivity'][0]);
      // Repeat for TM1
      body.replaceText("{tm1Name}", info['TM1\'s Name'][0]);
      body.replaceText("{tm1Goal}", info['Goal1'][0]);
      body.replaceText("{tm1Achieved}", info['Achieved1'][0]);
      body.replaceText("{tm1Achieved/tm1Goal}", (info['Achieved1'][0] / info['Goal1'][0]) * 100+ "%");
      body.replaceText("{tm1MXS}", info['MX Standards1'][0]);
      body.replaceText("{tm1NPS}", info['NPS1'][0]);
      body.replaceText("{tm1LPS}", info['LPS1'][0]);
      body.replaceText("{tm1Prod}", info['Productivity1'][0]);
      body.replaceText("{MXSTextTm1}", info['What each member lacks regarding the MX Standards:1'][0]);
      body.replaceText("{tm1tm}", info['Number of Team meeting1'][0]);
      body.replaceText("{tm1o2o}", info['Number of O2O1'][0]);
      // Repeat for TM2
      body.replaceText("{tm2Name}", info['TM2\'s Name'][0]);
      body.replaceText("{tm2Goal}", info['Goal2'][0]);
      body.replaceText("{tm2Achieved}", info['Achieved2'][0]);
      body.replaceText("{tm2Achieved/tm2Goal}", (info['Achieved2'][0] / info['Goal2'][0]) * 100+ "%");
      body.replaceText("{tm2MXS}", info['MX Standards2'][0]);
      body.replaceText("{tm2NPS}", info['NPS2'][0]);
      body.replaceText("{tm2LPS}", info['LPS2'][0]);
      body.replaceText("{tm2Prod}", info['Productivity2'][0]);
      body.replaceText("{MXSTextTm2}", info['What each member lacks regarding the MX Standards:2'][0]+ "%");
      body.replaceText("{tm2tm}", info['Number of Team meeting2'][0]);
      body.replaceText("{tm2o2o}", info['Number of O2O2'][0]);

      // Repeat for TM3
      body.replaceText("{tm3Name}", info['TM3\'s Name'][0]);
      body.replaceText("{tm3Goal}", info['Goal3'][0]);
      body.replaceText("{tm3Achieved}", info['Achieved3'][0]);
      body.replaceText("{tm3Achieved/tm3Goal}", (info['Achieved3'][0] / info['Goal3'][0]) * 100+ "%");
      body.replaceText("{tm3MXS}", info['MX Standards3'][0]);
      body.replaceText("{tm3NPS}", info['NPS3'][0]);
      body.replaceText("{tm3LPS}", info['LPS3'][0]);
      body.replaceText("{tm3Prod}", info['Productivity3'][0]);
      body.replaceText("{MXSTextTm3}", info['What each member lacks regarding the MX Standards:3'][0]);
      body.replaceText("{tm3tm}", info['Number of Team meeting3'][0]);
      body.replaceText("{tm3o2o}", info['Number of O2O3'][0]);

      // Repeat for TM4
      body.replaceText("{tm4Name}", info['TM4\'s Name'][0]);
      body.replaceText("{tm4Goal}", info['Goal4'][0]);
      body.replaceText("{tm4Achieved}", info['Achieved4'][0]);
      body.replaceText("{tm4Achieved/tm4Goal}", (info['Achieved4'][0] / info['Goal4'][0]) * 100+ "%");
      body.replaceText("{tm4MXS}", info['MX Standards4'][0]);
      body.replaceText("{tm4NPS}", info['NPS4'][0]);
      body.replaceText("{tm4LPS}", info['LPS4'][0]);
      body.replaceText("{tm4Prod}", info['Productivity4'][0]);
      body.replaceText("{MXSTextTm4}", info['What each member lacks regarding the MX Standards:4'][0]);
      body.replaceText("{tm4tm}", info['Number of Team meeting4'][0]);
      body.replaceText("{tm4o2o}", info['Number of O2O4'][0]);

      if (info['Number of members'] == 5) {
        // Repeat for TM5
        body.replaceText("{tm5Name}", info['TM5\'s Name'][0]);
        body.replaceText("{tm5Goal}", info['Goal5'][0]);
        body.replaceText("{tm5Achieved}", info['Achieved5'][0]);
        body.replaceText("{tm5Achieved/tm5Goal}", (info['Achieved5'][0] / info['Goal5'][0]) * 100+ "%");
        body.replaceText("{tm5MXS}", info['MX Standards5'][0]);
        body.replaceText("{tm5NPS}", info['NPS5'][0]);
        body.replaceText("{tm5LPS}", info['LPS5'][0]);
        body.replaceText("{tm5Prod}", info['Productivity5'][0]);
        body.replaceText("{MXSTextTm5}", info['What each member lacks regarding the MX Standards:5'][0]);
        body.replaceText("{tm5tm}", info['Number of Team meeting5'][0]);
        body.replaceText("{tm5o2o}", info['Number of O2O5'][0]);
      }
      body.replaceText("{{totalPlaned}}", info['PLANNED'][0]);
      body.replaceText("{{totalAchieved}}", info['ACHIEVED'][0]);
      body.replaceText("{MX%P}", info['MXP achieved'][0]);
      body.replaceText("{NPST}", info['NPS achieved'][0]);
      body.replaceText("{LPST}", info['LPS achieved'][0]);
      body.replaceText("{PRODT}", info['Productivity achieved'][0]);
      body.replaceText("{minTM}", info['Minimum Team Meetings / Team Working Hours'][0]);
      body.replaceText("{minO2o}", info['Minimum O2Os'][0]);
      body.replaceText("{TMD/minTM}", (info['How many Team Meetings / Team Working Hours have done?'][0] / info['Minimum Team Meetings / Team Working Hours'+ "%"][0]) * 100);
      body.replaceText("{o2oD/minO2o}", ((info['How many O2Os have done?'][0] / info['Minimum O2Os'][0]) * 100) + "%");
      body.replaceText("{TMD}", info['How many Team Meetings / Team Working Hours have done?'][0]);
      body.replaceText("{o2oD}", info['How many O2Os have done?'][0]);
      body.replaceText("{freeText}", info['Next Month Focuses'][0]);
  // Save and close the document
  openDoc.saveAndClose();
  
  // Convert the document to PDF format
  const blobPDF = newTempFile.getAs(MimeType.PDF);
  
  // Create a PDF file in the PDF folder with a customized name
  const pdfFile = pdfFolder.createFile(blobPDF).setName("Performance Appraisal - "+ info['TL’s Name'][0] + " - " + new Date().toString());
  
  // Remove the temporary document
  tempFolder.removeFile(newTempFile);

  // Return the created PDF file
  return pdfFile;
}

