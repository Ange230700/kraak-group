import { expect, test } from '@playwright/test';

test.describe(`Conversion web — contact et CTA`, () => {
  test(`Given la page services, When un visiteur clique sur le CTA d'une offre, Then le formulaire de contact est prérempli avec le bon service`, async ({
    page,
  }) => {
    await page.goto('/services');

    await page
      .getByRole('link', { name: 'Parler de cette offre' })
      .first()
      .click();

    await expect(page).toHaveURL(/\/contact/);
    await expect(page.getByLabel('Service concerné')).toHaveValue('training');
    await expect(page.getByTestId('contact-context')).toContainText(
      'Formation',
    );
  });

  test(`Given la page contact, When un visiteur soumet une demande valide, Then un message de confirmation s'affiche`, async ({
    page,
  }) => {
    await page.goto('/contact?service=training&intent=consultation&source=e2e');

    // Attend que l'hydratation Angular applique les query params au formulaire
    await expect(page.getByLabel('Service concerné')).toHaveValue('training');

    const fullName = page.getByLabel('Nom complet');
    const email = page.getByLabel('Adresse e-mail');
    const phone = page.getByLabel('Téléphone (optionnel)');
    const organization = page.getByLabel('Organisation (optionnel)');
    const message = page.getByLabel('Message');
    const consent = page.getByLabel(
      'J’accepte que KRAAK me recontacte au sujet de cette demande.',
    );

    await fullName.fill('Awa Konate');
    await expect(fullName).toHaveValue('Awa Konate');
    await email.fill('awa@example.com');
    await phone.fill('+2250102030405');
    await organization.fill('KRAAK Labs');
    await message.fill(
      'Je souhaite échanger sur un accompagnement en leadership pour notre prochaine cohorte.',
    );
    await consent.check();

    await page.getByRole('button', { name: 'Envoyer la demande' }).click();

    await expect(page.getByRole('status')).toContainText(
      'Votre demande a bien été préparée.',
    );
    await expect(page.getByRole('status')).toContainText('KRAAK-');
  });
});
