import { validateContactForm } from './support.dto';

describe('validateContactForm', () => {
  // Given un corps de requete valide
  // When la validation est appliquee
  // Then les champs sont normalises et la categorie par defaut vaut other
  it('Given un corps valide, When la validation est appliquee, Then les donnees sont normalisees', () => {
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
  // When la validation est appliquee
  // Then les erreurs utilisateur sont explicites
  it('Given un payload invalide, When la validation est appliquee, Then des erreurs explicites sont renvoyees', () => {
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
        'Le nom doit contenir au moins 2 caracteres.',
        "L'adresse e-mail est invalide.",
        "L'objet est requis.",
        'Le message doit contenir au moins 10 caracteres.',
        'La categorie de support est invalide.',
      ],
    });
  });

  // Given un corps non objet
  // When la validation est appliquee
  // Then une erreur de requete invalide est renvoyee
  it('Given un corps invalide, When la validation est appliquee, Then la requete est rejetee proprement', () => {
    expect(validateContactForm(null)).toEqual({
      valid: false,
      errors: ['Corps de requete invalide.'],
    });
  });
});
