import { Injectable } from '@nestjs/common';
import { ContactDto } from './contact.dto';

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
}

@Injectable()
export class ContactService {
  /**
   * Traite une demande de contact entrante.
   * Actuellement stub MVP : journalise et renvoie une confirmation.
   * À brancher à Supabase/Resend dans SUP-04.
   */
  submit(dto: ContactDto): ContactSubmissionResult {
    console.log('[ContactService] Nouvelle demande de contact :', {
      name: dto.name,
      email: dto.email,
      subject: dto.subject,
    });

    return {
      success: true,
      message:
        'Votre message a bien été reçu. Nous vous répondrons dans les plus brefs délais.',
    };
  }
}
