// ═══════════════════════════════════════════════════════════════
// PULSOVITAL — Google Apps Script para captação de leads
// Cole este código em script.google.com e implante como Web App
// Acesso: Qualquer pessoa (anônimo)
// ═══════════════════════════════════════════════════════════════

const SPREADSHEET_ID = '1r0RPTULlCSCwB38wxbfNGEnXKIhUH3k9q4KMnJ3tr4U';
const SHEET_NAME = 'Página1';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

    const now = new Date();
    const dataHora = Utilities.formatDate(now, 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss');

    sheet.appendRow([
      dataHora,
      data.nome || '',
      data.whatsapp || '',
      data.email || '',
      data.dispositivo || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Pulsovital Lead Collector ativo' }))
    .setMimeType(ContentService.MimeType.JSON);
}
