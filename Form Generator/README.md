# Google Apps Script Form Generator

This Google Apps Script generates a new Google Form based on data from a specified spreadsheet. It clears the existing questions in the form and replaces them with new ones based on the data in the spreadsheet. The script also shuffles the question order and divides questions into multiple pages.

## Usage

1. **Setup**
   - Make sure you have a Google Form template with the desired structure.
   - Create a Google Spreadsheet with the data for the new form. The spreadsheet should have the following columns:
     - Column A: Leave empty for now.
     - Column B: Question text.
     - Column C: Leave empty for now.
     - Column D: Question type (SHORT_ANSWER, MULTIPLE_CHOICE, CHECKBOX, DROPDOWN).
     - Column E onwards: Options for multiple choice, checkbox, or dropdown questions.

2. **Run the Script**
   - Open the Google Apps Script editor.
   - Copy and paste the provided script into the editor.
   - Save the script and run the `generateNewForm` function.

3. **Review the Form**
   - Open the newly generated form and review the questions.
   - Make any necessary adjustments directly in the form editor if needed.

## Important Notes

- This script will replace all existing questions in the form specified by the `formUrl` variable.
- The script assumes a specific structure for the spreadsheet data. Ensure that your spreadsheet follows this structure for the script to work correctly.

## Author

- Mohamed Ellithy (https://github.com/mohamedellithyyyy)

