import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export function readCSV(filePath) {
  const absolutePath = path.resolve(filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });
}