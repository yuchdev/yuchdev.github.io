
const fs = require('fs');
const path = require('path');

// Mock browser functions if they were needed, but for these unit tests we can just test the logic

/**
 * Formats YYYYMMDD date string to YYYY-MM-DD
 */
function formatDatetime(dateStr) {
    if (dateStr.length === 8) {
        return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
    }
    return dateStr;
}

/**
 * Formats YYYYMMDD date string to a more readable format
 */
function displayDate(dateStr) {
    if (dateStr.length === 8) {
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(4, 6);
        const day = dateStr.substring(6, 8);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthIndex = parseInt(month, 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
            return `${monthNames[monthIndex]} ${parseInt(day, 10)}, ${year}`;
        }
        return `${year}-${month}-${day}`;
    }
    return dateStr;
}

function runTests() {
    console.log('Running Date Formatting Tests...');

    const testCases = [
        { input: '20260222', expectedDatetime: '2026-02-22', expectedDisplay: 'Feb 22, 2026' },
        { input: '20260110', expectedDatetime: '2026-01-10', expectedDisplay: 'Jan 10, 2026' },
        { input: '20261231', expectedDatetime: '2026-12-31', expectedDisplay: 'Dec 31, 2026' },
        { input: 'invalid', expectedDatetime: 'invalid', expectedDisplay: 'invalid' }
    ];

    testCases.forEach(tc => {
        const dt = formatDatetime(tc.input);
        const disp = displayDate(tc.input);
        
        if (dt === tc.expectedDatetime) {
            console.log(`PASS: formatDatetime(${tc.input}) === ${dt}`);
        } else {
            console.log(`FAIL: formatDatetime(${tc.input}) expected ${tc.expectedDatetime}, got ${dt}`);
            process.exit(1);
        }

        if (disp === tc.expectedDisplay) {
            console.log(`PASS: displayDate(${tc.input}) === ${disp}`);
        } else {
            console.log(`FAIL: displayDate(${tc.input}) expected ${tc.expectedDisplay}, got ${disp}`);
            process.exit(1);
        }
    });

    console.log('\nVerifying articles/index.json consistency...');
    const indexJsonPath = path.join(__dirname, '../articles/index.json');
    const indexJson = JSON.parse(fs.readFileSync(indexJsonPath, 'utf8'));

    indexJson.forEach(article => {
        // Check date format
        if (!/^\d{8}$/.test(article.date)) {
            console.log(`FAIL: Article "${article.slug}" has invalid date format: ${article.date}`);
            process.exit(1);
        } else {
            console.log(`PASS: Article "${article.slug}" date format is OK: ${article.date}`);
        }

        // Check if file exists
        const filePath = path.join(__dirname, '../articles', article.file);
        if (fs.existsSync(filePath)) {
            console.log(`PASS: File exists for "${article.slug}": ${article.file}`);
        } else {
            console.log(`FAIL: File NOT found for "${article.slug}": ${article.file}`);
            process.exit(1);
        }

        // Check if file name matches date
        if (!article.file.startsWith(article.date)) {
            console.log(`FAIL: File name "${article.file}" does not start with date "${article.date}"`);
            process.exit(1);
        }
    });

    console.log('\nAll tests passed successfully!');
}

runTests();
