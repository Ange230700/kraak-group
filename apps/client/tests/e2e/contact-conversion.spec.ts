import { expect, test } from '@playwright/test';

test.describe(`Conversion web — contact et CTA`, () => {
  test(`Given la page services, When un visiteur clique sur le CTA d'une offre, Then le formulaire de contact est prérempli avec le bon service`, async ({
    page,
  }) => {
    await page.goto('/services');

    await page.getByRole('link', { name: 'Parler de cette offre' }).first().click();

    await expect(page).toHaveURL(/\/contact/);
    await expect(page.getByLabel('Service concerné')).toHaveValue('training');
    await expect(page.getByTestId('contact-context')).toContainText('Formation');
  });

  test(`Given la page contact, When un visiteur soumet une demande valide, Then un message de confirmation s'affiche`, async ({
    page,
  }) => {
    await page.goto('/contact?service=training&intent=consultation&source=e2e');

    await page.getByLabel('Nom complet').fill('Awa Konate');
    await page.getByLabel('Adresse e-mail').fill('awa@example.com');
    await page.getByLabel('Téléphone (optionnel)').fill('+2250102030405');
    await page.getByLabel('Organisation (optionnel)').fill('KRAAK Labs');
    await page.getByLabel('Message').fill(
      "Je souhaite échanger sur un accompagnement en leadership pour notre prochaine cohorte.",
    );
    await page
      .getByLabel('J’accepte que KRAAK me recontacte au sujet de cette demande.')
      .check();

    await page.getByRole('button', { name: 'Envoyer la demande' }).click();

    await expect(page.getByRole('status')).toContainText(
      'Votre demande a bien été préparée.',
    );
    await expect(page.getByRole('status')).toContainText('KRAAK-');
  });
});
