import { chromium, Browser, Page, BrowserContext } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface ScreenshotOptions {
  url: string;
  outputPath: string;
  viewports?: Array<{ width: number; height: number; name: string }>;
  fullPage?: boolean;
  waitForSelector?: string;
  auth?: { username: string; password: string };
}

const DEFAULT_VIEWPORTS = [
  { width: 1920, height: 1080, name: 'desktop' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 375, height: 667, name: 'mobile' }
];

/**
 * Captures screenshots of a web page at multiple viewport sizes.
 *
 * Usage:
 *   ts-node capture-screenshot.ts <url> <output-path> [options]
 *
 * Examples:
 *   ts-node capture-screenshot.ts http://localhost:4200/home ./screenshots/home
 *   ts-node capture-screenshot.ts https://example.com ./screenshots/example
 */
async function captureScreenshots(options: ScreenshotOptions): Promise<string[]> {
  const {
    url,
    outputPath,
    viewports = DEFAULT_VIEWPORTS,
    fullPage = true,
    waitForSelector,
    auth
  } = options;

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`📸 Capturing screenshots for: ${url}`);
  console.log(`📁 Output path: ${outputPath}`);

  const browser: Browser = await chromium.launch({
    headless: true
  });

  const context: BrowserContext = await browser.newContext({
    viewport: null as any, // Will be set per page
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });

  const capturedFiles: string[] = [];

  for (const viewport of viewports) {
    console.log(`  📐 ${viewport.name} (${viewport.width}x${viewport.height})...`);

    const page: Page = await context.newPage();
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    try {
      // Navigate to URL
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait for specific selector if provided
      if (waitForSelector) {
        await page.waitForSelector(waitForSelector, { timeout: 10000 });
      }

      // Additional wait for dynamic content
      await page.waitForTimeout(2000);

      // Handle authentication if needed
      if (auth) {
        // You may need to customize this based on your auth flow
        await page.fill('input[name="username"]', auth.username);
        await page.fill('input[name="password"]', auth.password);
        await page.click('button[type="submit"]');
        await page.waitForNavigation({ waitUntil: 'networkidle' });
      }

      // Generate filename
      const filename = `${path.basename(outputPath)}-${viewport.name}-${viewport.width}x${viewport.height}.png`;
      const filepath = path.join(path.dirname(outputPath), filename);

      // Take screenshot
      await page.screenshot({
        path: filepath,
        fullPage: fullPage
      });

      capturedFiles.push(filepath);
      console.log(`    ✅ Saved: ${filename}`);

    } catch (error) {
      console.error(`    ❌ Error capturing ${viewport.name}:`, error);
    } finally {
      await page.close();
    }
  }

  await context.close();
  await browser.close();

  console.log(`\n✨ Done! Captured ${capturedFiles.length} screenshots.`);
  return capturedFiles;
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: ts-node capture-screenshot.ts <url> <output-path> [options]');
  console.log('');
  console.log('Examples:');
  console.log('  ts-node capture-screenshot.ts http://localhost:4200/home ./screenshots/home');
  console.log('  ts-node capture-screenshot.ts http://localhost:4200/login ./screenshots/login');
  process.exit(1);
}

const url = args[0];
const outputPath = args[1];

captureScreenshots({ url, outputPath })
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
