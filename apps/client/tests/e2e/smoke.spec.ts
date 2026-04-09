import { test, expect } from '@playwright/test';

// Smoke E2E — page d'accueil par défaut
// Given/When/Then : vérification des éléments visibles après chargement

test.describe(`Page d'accueil — smoke tests`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test(`Given la page d'accueil, When elle se charge, Then le titre du document est "Web"`, async ({
    page,
  }) => {
    await expect(page).toHaveTitle('Web');
  });

  test(`Given la page d'accueil, When elle se charge, Then le heading principal affiche "Hello, web"`, async ({
    page,
  }) => {
    await expect(page.locator('h1')).toHaveText('Hello, web');
  });

  test(`Given la page d'accueil, When elle se charge, Then le message de bienvenue est visible`, async ({
    page,
  }) => {
    await expect(
      page.getByText('Congratulations! Your app is running.'),
    ).toBeVisible();
  });

  test(`Given la page d'accueil, When elle se charge, Then le logo Angular est présent`, async ({
    page,
  }) => {
    await expect(page.locator('.angular-logo')).toBeVisible();
  });
});
