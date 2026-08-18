const fs = require('fs');
const path = require('path');

let ExcelJS;
try {
  ExcelJS = require('exceljs');
} catch (e) {
  try {
    ExcelJS = require('./selenium_testing/node_modules/exceljs');
  } catch (e2) {
    console.error('ExcelJS module loading error:', e2);
  }
}

// Helper to ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Ensure all root folders
const dirs = [
  'Vulnerability Test Results',
  'reports/latest',
  'reports/history',
  'Test Results/Excel',
  'Test Results/HTML',
  'Test Results/JSON',
  'Test Results/Summary',
  'automation/pages',
  'automation/tests',
  'automation/data',
  'automation/utils',
  'automation/reports',
  '.github/workflows'
];

dirs.forEach(ensureDir);

console.log('Folders initialized successfully.');
