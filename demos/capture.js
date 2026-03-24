const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  // Desktop screenshots
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('http://localhost:8787/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'desktop-hero.png', fullPage: false });
  await page.screenshot({ path: 'desktop-full.png', fullPage: true });

  // Scroll to a card and interact
  await page.evaluate(() => window.scrollTo(0, 600));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'desktop-cards.png' });

  // Click "How We Calculate" tab
  await page.evaluate(() => {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs[tabs.length - 1].click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'desktop-ingredients.png', fullPage: false });

  // Mobile screenshots
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.evaluate(() => {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs[0].click();
  });
  await page.goto('http://localhost:8787/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'mobile-hero.png' });
  await page.evaluate(() => window.scrollTo(0, 400));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'mobile-cards.png' });

  await browser.close();
  console.log('Screenshots captured!');
})();
