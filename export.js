const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        console.log('🚀 Starting PDF Export...');
        const browser = await puppeteer.launch({
            headless: "new"
        });
        const page = await browser.newPage();

        // Set viewport to a standard A4-ish resolution for better CSS rendering
        await page.setViewport({
            width: 794,
            height: 2000,
            deviceScaleFactor: 2,
        });

        // Get absolute path to index.html
        const filePath = 'file://' + path.join(__dirname, 'index.html');

        console.log(`Opening ${filePath}...`);
        await page.setViewport({ width: 1200, height: 2000, deviceScaleFactor: 2 });
        await page.goto(filePath, { waitUntil: 'networkidle0' });

        // Give extra time for fonts to render
        await new Promise(r => setTimeout(r, 500));

        console.log('Generating PDF...');
        await page.pdf({
            path: 'Muhammad_Tahir_CV.pdf',
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px'
            }
        });

        await browser.close();
        console.log('✅ Export Successful: Muhammad_Tahir_CV.pdf');
    } catch (error) {
        console.error('❌ Export Failed:', error);
    }
})();
