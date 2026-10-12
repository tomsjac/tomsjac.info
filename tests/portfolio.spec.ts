import { test, expect } from '@playwright/test';

test.use({ locale: 'fr-FR' });
test.beforeEach(async ({ page }) => {
  // Keep rendering checks independent from external font availability.
  await page.route('https://fonts.googleapis.com/**', route => route.abort());
  await page.route('https://fonts.gstatic.com/**', route => route.abort());
});

test('renders all portfolio sections, illustrations and SVG icons', async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('#loader')).toBeHidden();
  await expect(page.locator('.about-box h1')).toHaveText('Thomas Jacquey');
  await expect(page.locator('.icons-box')).toHaveCount(3);
  for (const [index, count] of [4, 7, 5].entries()) {
    const section = page.locator('.icons-box').nth(index);
    await expect(section.getByRole('heading')).toBeVisible();
    await expect(section.locator('.svgIcon svg')).toHaveCount(count);
    for (const icon of await section.locator('.svgIcon svg').all()) {
      await expect(icon).toBeVisible();
    }
  }
  const portrait = page.locator('.profile-image img');
  if (isMobile) await expect(portrait).toBeHidden();
  else await expect(portrait).toBeVisible();
  for (const image of await page.locator('.content img').all()) {
    await expect(image).toBeVisible();
    expect(await image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('keeps headings and icons inside the viewport on desktop and mobile', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#loader')).toBeHidden();
  const width = page.viewportSize()!.width;
  for (const element of await page.locator('.about-box h1, .icons-box h3, .svgIcon').all()) {
    await expect(element).toBeVisible();
    const box = await element.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(-1);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
  }
});

test('shows a skill tooltip on hover and hides it when leaving', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#loader')).toBeHidden();
  const skill = page.locator('.icons-box').nth(1).locator('.svgIcon').first();
  await skill.hover();
  const title = page.locator('.popper-title').filter({ hasText: 'Réflexion' });
  await expect(title).toBeVisible();
  await expect(title.locator('..').locator('.popper-content')).toContainText('Stratégie, Conception, Anticipation');
  await page.mouse.move(0, 0);
  await expect(title).toBeHidden();
});

test('opens the resume link with the appropriate desktop or mobile gesture', async ({ page, context, isMobile }) => {
  // Validate the destination without contacting the external website.
  await context.route('https://resume.tomsjac.info/**', route => route.fulfill({ body: 'Resume destination' }));
  await page.goto('/');
  await expect(page.locator('#loader')).toBeHidden();
  const resume = page.locator('.icons-box').first().locator('.svgIcon').nth(1);
  const popup = page.waitForEvent('popup');
  if (isMobile) await resume.dblclick();
  else await resume.click();
  const opened = await popup;
  await expect(opened).toHaveURL('https://resume.tomsjac.info/');
  await opened.close();
});
