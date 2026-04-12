import { Injectable } from '@nestjs/common';
import type {
  ContactFormDto,
  ContactSubmissionResultDto,
} from '@kraak/contracts';

@Injectable()
export class SupportService {
  submitContact(_dto: ContactFormDto): ContactSubmissionResultDto {
    return {
      success: true,
      message:
        'Votre message a bien ete recu. Nous vous repondrons dans les plus brefs delais.',
    };
  }
}
