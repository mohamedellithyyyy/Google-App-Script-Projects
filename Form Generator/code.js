function generateNewForm() {
  var formUrl = "URL";
  var form = FormApp.openByUrl(formUrl);
  var items = form.getItems();
  for (var i = 0; i < items.length; i++) {
    form.deleteItem(items[i]);
  }

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Customer Support Trial');
  if (!sheet) {
    Logger.log("Sheet 'Customer Support Trial' not found.");
    return;
  }

  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  // Shuffle question order
  form.setShuffleQuestions(true);

  
  for (var i = 1; i <= 5; i++) { // Loop for the first 5 questions
    if (values[i][0] != "") {
      var question = values[i][1];
      var questionType = values[i][3];
      var formItem;
      if (questionType == "SHORT_ANSWER") {
        formItem = form.addTextItem();
      } else if (questionType == "MULTIPLE_CHOICE") {
        formItem = form.addMultipleChoiceItem();
      } else if (questionType == "CHECKBOX") {
        formItem = form.addCheckboxItem();
      } else if (questionType == "DROPDOWN") {
        formItem = form.addListItem();
      } else {
        Logger.log("Unknown question type: " + questionType + question);
        continue; // Skip this iteration if the question type is unknown
      }
      if (!formItem) {
        Logger.log("Failed to create form item for question: " + question);
        continue; 
      }
      formItem.setTitle(question);
      var choices = [];
      for (var j = 5; j < values[i].length; j++) {
        if (values[i][j] !== "") {
          var choice = values[i][j];
          choices.push(choice);
        }
      }
      if (choices.length > 0) {
        var choiceObjects = [];
        for (var k = 0; k < choices.length; k++) {
          choiceObjects.push(formItem.createChoice(choices[k]));
        }
        formItem.setChoices(choiceObjects);
      }
      formItem.setRequired(true);
    } else {
      Logger.log("Empty cell encountered at row " + i);
      break;
    }
  }
  // Define page titles and question ranges
  var pages = [
    { title: 'Questions', startRow: 6, endRow: 15 ,navigationType: FormApp.PageNavigationType.CONTINUE },
    { title: 'Questions', startRow: 16, endRow: 25 ,navigationType: FormApp.PageNavigationType.SUBMIT },
    { title: 'Questions', startRow: 26, endRow: 35 ,navigationType: FormApp.PageNavigationType.SUBMIT },
    { title: 'Questions', startRow: 36, endRow: 45 ,navigationType: FormApp.PageNavigationType.SUBMIT },
    { title: 'Questions', startRow: 46, endRow: 55 ,navigationType: FormApp.PageNavigationType.SUBMIT },
    { title: 'Questions', startRow: 56, endRow: 65 ,navigationType: FormApp.PageNavigationType.SUBMIT }
  ];
  // Iterate over pages and add questions
  pages.forEach(function(page) {
    var pageBreak = form.addPageBreakItem().setTitle(page.title);
    pageBreak.setGoToPage(page.navigationType);
    for (var i = page.startRow; i <= page.endRow; i++) {
      if (values[i][0] != "") {
        var question = values[i][1];
        var questionType = values[i][3];
        var formItem;
        switch (questionType) {
          case "SHORT_ANSWER":
            formItem = form.addTextItem();
            break;
          case "MULTIPLE_CHOICE":
            formItem = form.addMultipleChoiceItem();
            break;
          case "CHECKBOX":
            formItem = form.addCheckboxItem();
            break;
          case "DROPDOWN":
            formItem = form.addListItem();
            break;
          default:
            Logger.log("Unknown question type: " + questionType);
            continue;
        }
        if (!formItem) {
          Logger.log("Failed to create form item for question: " + question);
          continue;
        }
        formItem.setTitle(question);
        var choices = [];
        for (var j = 5; j < values[i].length; j++) {
          if (values[i][j] !== "") {
            var choice = values[i][j];
            choices.push(choice);
          }
        }
        var num_true=values[i][2];
        if (choices.length > 0) {
          var choiceObjects = [];
          for (var k = 0; k < choices.length; k++) {
            if(k<=num_true)
            {
              choiceObjects.push(formItem.createChoice(choices[k],true));
            }
            else
            {
              choiceObjects.push(formItem.createChoice(choices[k],false));
            }
          }
          // Randomize the answers
          for (let i = choiceObjects.length - 1; i > 0; i--) 
          {
            const j = Math.floor(Math.random() * (i + 1));
            [choiceObjects[i], choiceObjects[j]] = [choiceObjects[j], choiceObjects[i]];
          }
          
          formItem.setChoices(choiceObjects);
        }
        formItem.setPoints(1);
        formItem.setRequired(true);
        
      }
    }
  }); // <-- Closing brace for the 'forEach' function
  Logger.log("Form creation completed.");
}
