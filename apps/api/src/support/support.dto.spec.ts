import { validateContactForm } from './support.dto';

describe('validateContactForm', () => {
  // Given un corps de requête valide
  // When la validation est appliquée
  // Then les champs sont normalisés et la catégorie par défaut vaut other
  it('Given un corps valide, When la validation est appliquée, Then les données sont normalisées et la catégorie par défaut vaut other', () => {
    const result = validateContactForm({
      name: '  Alice Dupont  ',
      email: 'alice@exemple.com',
      subject: '  Demande de renseignements  ',
      message: '  Bonjour, je souhaite en savoir plus sur vos services.  ',
    });

    expect(result).toEqual({
      valid: true,
      data: {
        name: 'Alice Dupont',
        email: 'alice@exemple.com',
        subject: 'Demande de renseignements',
        message: 'Bonjour, je souhaite en savoir plus sur vos services.',
        category: 'other',
      },
    });
  });

  // Given un payload invalide
  // When la validation est appliquée
  // Then les erreurs utilisateur sont explicites
  it('Given un payload invalide, When la validation est appliquée, Then des erreurs explicites sont renvoyées', () => {
    const result = validateContactForm({
      name: 'A',
      email: 'not-an-email',
      subject: ' ',
      message: 'Court',
      category: 'finance',
    });

    expect(result).toEqual({
      valid: false,
      errors: [
        'Le nom doit contenir au moins 2 caractères.',
        "L'adresse e-mail est invalide.",
        "L'objet est requis.",
        'Le message doit contenir au moins 10 caractères.',
        'La catégorie de support est invalide.',
      ],
    });
  });

  // Given un corps non objet
  // When la validation est appliquée
  // Then une erreur de requête invalide est renvoyée
  it('Given un corps invalide, When la validation est appliquée, Then la requête est rejetée proprement', () => {
    expect(validateContactForm(null)).toEqual({
      valid: false,
      errors: ['Corps de requête invalide.'],
    });
  });
});
