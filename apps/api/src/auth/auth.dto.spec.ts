import {
  extractAccessToken,
  validatePasswordResetPayload,
  validateRefreshSessionPayload,
  validateSignInPayload,
  validateSignUpPayload,
} from './auth.dto';

describe('validateSignInPayload', () => {
  // Given un payload de login valide
  // When la validation est appliquée
  // Then les identifiants sont normalisés
  it('Given un payload valide, When la validation signIn est appliquée, Then les identifiants sont normalisés', () => {
    expect(
      validateSignInPayload({
        email: '  alice@example.com  ',
        password: 'motdepasse-securise',
      }),
    ).toEqual({
      valid: true,
      data: {
        email: 'alice@example.com',
        password: 'motdepasse-securise',
      },
    });
  });
});

describe('validateSignUpPayload', () => {
  // Given un signup invalide
  // When la validation est appliquée
  // Then les erreurs utilisateur sont explicites
  it('Given un signup invalide, When la validation est appliquée, Then des erreurs explicites sont renvoyées', () => {
    expect(
      validateSignUpPayload({
        email: 'alice',
        password: 'court',
        firstName: ' ',
        lastName: ' ',
        redirectTo: 'pas-un-lien',
      }),
    ).toEqual({
      valid: false,
      errors: [
        "L'adresse e-mail est invalide.",
        'Le mot de passe doit contenir au moins 8 caractères.',
        'Le prénom est requis.',
        'Le nom est requis.',
        'Le lien de redirection est invalide.',
      ],
    });
  });
});

describe('validateRefreshSessionPayload', () => {
  it('Given un payload refresh valide, When la validation est appliquée, Then le refresh token est normalisé', () => {
    expect(
      validateRefreshSessionPayload({
        refreshToken: '  refresh-token  ',
      }),
    ).toEqual({
      valid: true,
      data: {
        refreshToken: 'refresh-token',
      },
    });
  });
});

describe('validatePasswordResetPayload', () => {
  it('Given une demande de reset valide, When la validation est appliquée, Then le payload est normalisé', () => {
    expect(
      validatePasswordResetPayload({
        email: '  alice@example.com  ',
        redirectTo: 'kraak://auth/reset',
      }),
    ).toEqual({
      valid: true,
      data: {
        email: 'alice@example.com',
        redirectTo: 'kraak://auth/reset',
      },
    });
  });
});

describe('extractAccessToken', () => {
  // Given un header Bearer valide
  // When le token est extrait
  // Then seule la valeur du token est conservée
  it('Given un header Bearer valide, When le token est extrait, Then seule la valeur utile est conservée', () => {
    expect(extractAccessToken('Bearer access-token')).toEqual({
      valid: true,
      data: 'access-token',
    });
  });

  // Given un header invalide
  // When le token est extrait
  // Then une erreur d'authentification explicite est renvoyée
  it('Given un header invalide, When le token est extrait, Then une erreur explicite est renvoyée', () => {
    expect(extractAccessToken('Token access-token')).toEqual({
      valid: false,
      error: "Le header d'autorisation Bearer est requis.",
    });
  });
});
