import { expect, test } from '@playwright/test';

test.describe(`SEO technique du site vitrine`, () => {
  test(`Given la page services, When elle se charge, Then le title, la canonical et les balises Open Graph correspondent a la route`, async ({
    page,
  }) => {
    await page.goto('/services');

    await expect(page).toHaveTitle(/Services/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /solutions concr/i,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /\/services$/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      /Services/,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      /\/services$/,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /open-graph\/kraak-share-card\.svg$/,
    );
  });

  test(`Given la page contact, When elle se charge, Then ses métadonnées SEO orientent vers la prise de contact`, async ({
    page,
  }) => {
    await page.goto('/contact');

    await expect(page).toHaveTitle(/Contact/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /demande d'accompagnement/i,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /\/contact$/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      /Contact/i,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      /\/contact$/,
    );
  });
});
