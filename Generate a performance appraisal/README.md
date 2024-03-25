# README

This script automates the generation of performance appraisal documents and sends email notifications with attached PDF files based on form submissions. 🚀

## Script Overview:

### `afterFormSubmit(e)`
- Triggered after a form submission.
- Extracts form submission data, creates a PDF file, and sends an email notification with the attached PDF.
- Updates the 'People' sheet with PDF URL, name, and email notification status.

### `sendEmail(email, pdfFile, info)`
- Constructs and sends an email with the attached PDF.
- Customizes email subject and body based on form data, including function type.

### `createPDF(info)`
- Generates a performance appraisal PDF document based on form data.
- Replaces placeholders in a template document with form data.
- Converts the document to PDF format and saves it in a designated folder.

## Usage:

1. **Setup Google Sheets:**
   - Ensure a Google Sheets document with a sheet named "People" is available.
   - Sheet should have columns for relevant information.

2. **Setup Google Forms:**
   - Create a Google Form for performance appraisals.
   - Link form responses to the Google Sheets document.

3. **Template Document Setup:**
   - Create a Google Docs template for performance appraisals.
   - Customize with placeholders for dynamic data.

4. **Folder Setup:**
   - Create folders in Google Drive for temporary files and generated PDFs.
   - Obtain folder IDs and update the script.

5. **Customization:**
   - Customize email body in `sendEmail`.
   - Adjust template document and placeholders in `createPDF`.

6. **Deploy the Script:**
   - Copy script into Google Apps Script editor.
   - Save and deploy script as an installable trigger for form submission.

7. **Testing:**
   - Test form submission process to verify PDF generation and email sending.

8. **Monitoring:**
   - Monitor 'People' sheet for form submissions and email statuses.

## Notes:
- Share Google Sheets, Forms, and Drive folders with collaborators.
- Regularly update the script for changes in requirements.

By following these steps, streamline performance appraisal generation and notification effectively. 📊

