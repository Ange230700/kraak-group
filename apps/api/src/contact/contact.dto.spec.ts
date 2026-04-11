import { validateContactDto } from './contact.dto';

describe('validateContactDto', () => {
  // Given un corps de requête valide
  // When la validation est appliquée
  // Then aucune erreur n'est renvoyée
  it('devrait valider un DTO complet et valide', () => {
    const result = validateContactDto({
      name: 'Alice Dupont',
      email: 'alice@exemple.com',
      subject: 'Demande de renseignements',
      message: 'Bonjour, je souhaite en savoir plus sur vos services.',
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  // Given un corps sans nom
  // When la validation est appliquée
  // Then une erreur indique que le nom est requis
  it('devrait rejeter un DTO sans nom', () => {
    const result = validateContactDto({
      name: '',
      email: 'alice@exemple.com',
      subject: 'Sujet',
      message: 'Message de test suffisamment long.',
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Le nom est requis.');
  });

  // Given un corps avec un e-mail invalide
  // When la validation est appliquée
  // Then une erreur indique que l'e-mail est invalide
  it('devrait rejeter un e-mail invalide', () => {
    const result = validateContactDto({
      name: 'Alice',
      email: 'not-an-email',
      subject: 'Sujet',
      message: 'Message de test suffisamment long.',
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("L'adresse e-mail est invalide.");
  });

  // Given un message trop court
  // When la validation est appliquée
  // Then une erreur indique la longueur minimale
  it('devrait rejeter un message trop court', () => {
    const result = validateContactDto({
      name: 'Alice',
      email: 'alice@exemple.com',
      subject: 'Sujet',
      message: 'Court',
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'Le message doit contenir au moins 10 caractères.',
    );
  });

  // Given un corps null
  // When la validation est appliquée
  // Then la validation échoue proprement
  it('devrait gérer un corps null sans erreur inattendue', () => {
    const result = validateContactDto(null);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
