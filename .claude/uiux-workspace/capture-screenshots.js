const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function captureScreenshots() {
  const viewports = [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 667 }
  ];

  const authStatePath = path.join(__dirname, '.auth-state.json');

  if (!fs.existsSync(authStatePath)) {
    console.error('Auth state file not found. Please login first.');
    return;
  }

  const browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext({
    storageState: authStatePath
  });

  const page = await context.newPage();

  console.log('Starting screenshot capture for group page...');
  console.log('Using saved auth state for login...');

  const outputDir = path.join(__dirname, 'group-page', 'iteration-1', 'screenshots');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const vp of viewports) {
    console.log(`\nCapturing ${vp.name} (${vp.width}x${vp.height})...`);

    await page.setViewportSize({ width: vp.width, height: vp.height });

    try {
      await page.goto('http://localhost:4200/home/group', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      await page.waitForTimeout(3000);

      try {
        await page.waitForSelector('.group-card--skeleton', { state: 'detached', timeout: 5000 });
      } catch {}

      try {
        await page.waitForSelector('.group-card:not(.group-card--skeleton)', { timeout: 5000 });
      } catch {}

      const screenshotPath = path.join(outputDir, `${vp.name}-${vp.width}x${vp.height}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      console.log(`✓ Captured ${vp.name}: ${screenshotPath}`);
    } catch (error) {
      console.error(`✗ Failed to capture ${vp.name}:`, error.message);
    }
  }

  await browser.close();
  console.log('\n✓ All screenshots captured successfully!');
}

captureScreenshots().catch(console.error);
