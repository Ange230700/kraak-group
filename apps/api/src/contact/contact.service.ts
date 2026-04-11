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
   * Actuellement stub MVP : renvoie une confirmation.
   * À brancher à Supabase/Resend dans SUP-04.
   */
  submit(dto: ContactDto): ContactSubmissionResult {
    const hasSubject = dto.subject.trim().length > 0;

    return {
      success: true,
      message: hasSubject
        ? 'Votre message a bien été reçu. Nous vous répondrons dans les plus brefs délais.'
        : 'Votre message a bien été reçu.',
    };
  }
}
