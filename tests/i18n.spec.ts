import { test, expect } from '@playwright/test';

const headings = {
  fr: ['Pour mieux me connaitre', 'Quelques une de mes compétences', "Pour me vider l'esprit"],
  en: ['To get to know me', 'A few of my skills', 'To clear my mind'],
};

// External font availability must not determine whether translations work.
test.beforeEach(async ({ page }) => {
  await page.route('https://fonts.googleapis.com/**', route => route.abort());
  await page.route('https://fonts.gstatic.com/**', route => route.abort());
});

for (const locale of ['fr', 'en'] as const) {
  test.describe(`browser language: ${locale}`, () => {
    test.use({ locale: locale === 'fr' ? 'fr-FR' : 'en-US' });
    test('renders translated headings, title and tooltip', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('/');
      await expect(page.locator('h1')).toHaveText('Thomas Jacquey');
      for (const heading of headings[locale]) {
        await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
      }
      await expect(page).toHaveTitle(locale === 'fr'
        ? 'Jacquey Thomas - Chef de projet - Lead Dev - Dev'
        : 'Thomas Jacquey - Project Manager - Lead Dev - Dev');
      await page.locator('.svgIcon').first().hover();
      await expect(page.locator('.popper-title').first()).toHaveText(locale === 'fr' ? 'Profil linkedin' : 'LinkedIn profile');
      expect(errors).toEqual([]);
      expect(new URL(page.url()).pathname).toBe('/');
    });
  });
}

test.describe('saved preference and locale switching', () => {
  test.use({ locale: 'en-US' });
  test('cookie preference overrides browser language and survives reload', async ({ context, page }) => {
    await context.addCookies([{ name: 'i18n_redirected', value: 'fr', url: 'http://127.0.0.1:3100' }]);
    await page.goto('/');
    await expect(page.getByRole('heading', { name: headings.fr[0], exact: true })).toBeVisible();
    await page.reload();
    await expect(page.getByRole('heading', { name: headings.fr[0], exact: true })).toBeVisible();
  });

  test('setLocale updates headings, persists the preference and keeps the URL', async ({ page, context }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: headings.en[0], exact: true })).toBeVisible();
    // The portfolio has no language selector; exercise the module's public API.
    await page.evaluate(async () => {
      const root = document.querySelector('#__nuxt') as any;
      await root.__vue_app__.config.globalProperties.$nuxt.$i18n.setLocale('fr');
    });
    for (const heading of headings.fr) {
      await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    }
    expect(new URL(page.url()).pathname).toBe('/');
    expect((await context.cookies()).find(cookie => cookie.name === 'i18n_redirected')?.value).toBe('fr');
    await page.reload();
    await expect(page.getByRole('heading', { name: headings.fr[0], exact: true })).toBeVisible();
  });
});
