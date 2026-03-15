const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const viewports = [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 667 }
  ];

  const screenshotsDir = path.join(__dirname, 'home-index/pagination-redesign/screenshots');

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    try {
      await page.goto('http://localhost:4200/home/index', { timeout: 60000 });
      await page.waitForLoadState('networkidle', { timeout: 30000 });
      await page.waitForTimeout(3000);

      const filename = `${viewport.name}-${viewport.width}x${viewport.height}.png`;
      await page.screenshot({
        path: path.join(screenshotsDir, filename),
        fullPage: true
      });
      console.log(`Captured: ${filename}`);
    } catch (error) {
      console.error(`Failed to capture ${viewport.name}:`, error.message);
    }
  }

  await browser.close();
  console.log('Pagination redesign screenshots captured!');
})();
