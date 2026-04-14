import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthService } from './auth.service';

function createSingleRowQuery(result: { data: unknown; error: unknown }) {
  return {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    maybeSingle: jest.fn().mockResolvedValue(result),
  };
}

describe('AuthService', () => {
  let service: AuthService;

  const authClient = {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      refreshSession: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      getUser: jest.fn(),
    },
  };

  const adminClient = {
    from: jest.fn(),
  };

  const supabaseService = {
    createAuthClient: jest.fn(() => authClient),
    getClient: jest.fn(() => adminClient),
  };

  function mockProfile(params?: {
    appUser?: Record<string, unknown> | null;
    participant?: Record<string, unknown> | null;
  }) {
    const appUserQuery = createSingleRowQuery({
      data:
        params?.appUser ??
        ({
          id: 'user-1',
          email: 'alice@example.com',
          role: 'participant',
          first_name: 'Alice',
          last_name: 'Dupont',
          phone: null,
          preferred_contact_channel: null,
          is_active: true,
          created_at: '2026-04-14T12:00:00.000Z',
          updated_at: '2026-04-14T12:00:00.000Z',
        } satisfies Record<string, unknown>),
      error: null,
    });

    const participantQuery = createSingleRowQuery({
      data: params?.participant ?? null,
      error: null,
    });

    adminClient.from.mockImplementation((tableName: string) => {
      if (tableName === 'app_user') {
        return appUserQuery;
      }

      if (tableName === 'participant') {
        return participantQuery;
      }

      throw new Error(`Unexpected table ${tableName}`);
    });
  }

  beforeEach(async () => {
    jest.clearAllMocks();
    mockProfile();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: SupabaseService,
          useValue: supabaseService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  // Given un sign-in Supabase réussi
  // When signIn est appelé
  // Then la session et le profil normalisés sont renvoyés
  it('Given un sign-in Supabase réussi, When signIn est appelé, Then la session et le profil normalisés sont renvoyés', async () => {
    authClient.auth.signInWithPassword.mockResolvedValue({
      data: {
        user: { id: 'user-1' },
        session: {
          access_token: 'access-token',
          refresh_token: 'refresh-token',
          expires_in: 3600,
          expires_at: 1_776_172_800,
          token_type: 'bearer',
        },
      },
      error: null,
    });

    await expect(
      service.signIn({
        email: 'alice@example.com',
        password: 'motdepasse-securise',
      }),
    ).resolves.toEqual({
      session: {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        expiresIn: 3600,
        expiresAt: '2026-04-14T13:20:00.000Z',
        tokenType: 'bearer',
      },
      profile: {
        appUser: {
          id: 'user-1',
          email: 'alice@example.com',
          role: 'participant',
          firstName: 'Alice',
          lastName: 'Dupont',
          phone: null,
          preferredContactChannel: null,
          isActive: true,
          createdAt: '2026-04-14T12:00:00.000Z',
          updatedAt: '2026-04-14T12:00:00.000Z',
        },
        participant: null,
      },
    });
  });

  // Given un sign-in Supabase rejeté
  // When signIn est appelé
  // Then une erreur d'authentification explicite est renvoyée
  it('Given un sign-in rejeté, When signIn est appelé, Then une UnauthorizedException explicite est renvoyée', async () => {
    authClient.auth.signInWithPassword.mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'Invalid login credentials' },
    });

    await expect(
      service.signIn({
        email: 'alice@example.com',
        password: 'motdepasse-securise',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  // Given un signup avec confirmation email
  // When signUp est appelé
  // Then la réponse indique qu'une confirmation reste attendue
  it("Given un signup avec confirmation email, When signUp est appelé, Then la réponse indique qu'une confirmation reste attendue", async () => {
    authClient.auth.signUp.mockResolvedValue({
      data: {
        user: { id: 'user-1' },
        session: null,
      },
      error: null,
    });

    await expect(
      service.signUp({
        email: 'alice@example.com',
        password: 'motdepasse-securise',
        firstName: 'Alice',
        lastName: 'Dupont',
        phone: null,
        preferredContactChannel: null,
        redirectTo: 'kraak://auth/callback',
      }),
    ).resolves.toEqual({
      message:
        'Votre compte a été créé. Vérifiez votre email pour confirmer votre accès.',
      requiresEmailConfirmation: true,
      session: null,
      profile: {
        appUser: {
          id: 'user-1',
          email: 'alice@example.com',
          role: 'participant',
          firstName: 'Alice',
          lastName: 'Dupont',
          phone: null,
          preferredContactChannel: null,
          isActive: true,
          createdAt: '2026-04-14T12:00:00.000Z',
          updatedAt: '2026-04-14T12:00:00.000Z',
        },
        participant: null,
      },
    });
  });

  // Given une session expirée avec refresh token
  // When refreshSession est appelé
  // Then un nouveau bundle de session est renvoyé
  it('Given un refresh token valide, When refreshSession est appelé, Then un nouveau bundle de session est renvoyé', async () => {
    authClient.auth.refreshSession.mockResolvedValue({
      data: {
        user: { id: 'user-1' },
        session: {
          access_token: 'new-access-token',
          refresh_token: 'new-refresh-token',
          expires_in: 3600,
          expires_at: 1_776_176_400,
          token_type: 'bearer',
        },
      },
      error: null,
    });

    await expect(
      service.refreshSession({
        refreshToken: 'refresh-token',
      }),
    ).resolves.toEqual({
      session: {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        expiresIn: 3600,
        expiresAt: '2026-04-14T14:20:00.000Z',
        tokenType: 'bearer',
      },
      profile: {
        appUser: {
          id: 'user-1',
          email: 'alice@example.com',
          role: 'participant',
          firstName: 'Alice',
          lastName: 'Dupont',
          phone: null,
          preferredContactChannel: null,
          isActive: true,
          createdAt: '2026-04-14T12:00:00.000Z',
          updatedAt: '2026-04-14T12:00:00.000Z',
        },
        participant: null,
      },
    });
  });

  // Given une demande de réinitialisation
  // When requestPasswordReset est appelé
  // Then le service confirme l'envoi du mail sans exposer l'existence du compte
  it("Given une demande de réinitialisation, When requestPasswordReset est appelé, Then le service confirme l'envoi du mail", async () => {
    authClient.auth.resetPasswordForEmail.mockResolvedValue({
      data: {},
      error: null,
    });

    await expect(
      service.requestPasswordReset({
        email: 'alice@example.com',
        redirectTo: 'kraak://auth/reset',
      }),
    ).resolves.toEqual({
      success: true,
      message:
        'Si cette adresse existe, un email de réinitialisation vient d’être envoyé.',
    });
  });

  // Given un access token valide
  // When getSession est appelé
  // Then le profil courant est résolu depuis Supabase et la base MVP
  it('Given un access token valide, When getSession est appelé, Then le profil courant est résolu', async () => {
    authClient.auth.getUser.mockResolvedValue({
      data: { user: { id: 'user-1' } },
      error: null,
    });

    await expect(service.getSession('access-token')).resolves.toEqual({
      profile: {
        appUser: {
          id: 'user-1',
          email: 'alice@example.com',
          role: 'participant',
          firstName: 'Alice',
          lastName: 'Dupont',
          phone: null,
          preferredContactChannel: null,
          isActive: true,
          createdAt: '2026-04-14T12:00:00.000Z',
          updatedAt: '2026-04-14T12:00:00.000Z',
        },
        participant: null,
      },
    });
  });
});
