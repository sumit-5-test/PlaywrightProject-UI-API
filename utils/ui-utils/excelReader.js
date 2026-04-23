 
import * as xlsx from 'xlsx';
import * as path from 'path';

export function readExcel(filePath, sheetName) {
  const absolutePath = path.resolve(filePath); // 

  const workbook = xlsx.readFile(absolutePath);
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);
  }

  return xlsx.utils.sheet_to_json(sheet);
}