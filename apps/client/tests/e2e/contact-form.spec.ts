import { expect, test } from '@playwright/test';

test.describe(`Page contact — comportement formulaire`, () => {
  test(`Given la page contact, When l'utilisateur soumet un formulaire valide, Then un message de confirmation est affiché`, async ({
    page,
  }) => {
    await page.route('**/contact', async (route) => {
      if (route.request().method() !== 'POST') {
        await route.continue();
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message:
            'Votre message a bien été reçu. Nous vous répondrons dans les plus brefs délais.',
        }),
      });
    });

    await page.goto('/contact');

    await page.getByLabel('Nom complet').fill('Alice Dupont');
    await page.getByLabel('Adresse e-mail').fill('alice@exemple.com');
    await page.getByLabel('Objet').fill('Demande de renseignements');
    await page
      .getByLabel('Message')
      .fill('Bonjour, je souhaite discuter de vos programmes de formation.');

    await page.getByRole('button', { name: 'Envoyer le message' }).click();

    await expect(
      page.getByText(
        'Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.',
      ),
    ).toBeVisible();
  });
});
