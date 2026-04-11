import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

describe('ContactController', () => {
  let controller: ContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [ContactService],
    }).compile();

    controller = module.get<ContactController>(ContactController);
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
  });

  // Given un corps de requête valide
  // When le contrôleur reçoit POST /contact
  // Then la réponse contient success:true
  it('POST /contact avec données valides — devrait renvoyer success:true', () => {
    const result = controller.submit({
      name: 'Alice Dupont',
      email: 'alice@exemple.com',
      subject: "Demande d'information",
      message: 'Bonjour, je souhaite en savoir plus sur vos services.',
    });

    expect(result).toEqual(
      expect.objectContaining({ success: true }),
    );
  });

  // Given un corps de requête invalide (champs manquants)
  // When le contrôleur reçoit POST /contact
  // Then la réponse contient un tableau d'erreurs
  it('POST /contact avec données invalides — devrait renvoyer des erreurs', () => {
    const result = controller.submit({
      name: '',
      email: 'invalid',
      subject: '',
      message: 'Court',
    }) as { errors: string[] };

    expect(result.errors).toBeDefined();
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
