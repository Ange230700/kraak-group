import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import type { ContactSubmissionResultDto } from '@kraak/contracts';
import { SupportService } from './support.service';
import { validateContactForm } from './support.dto';

@Controller(['support/contact', 'contact'])
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  // Given une demande de contact/support valide
  // When le client soumet le formulaire
  // Then la reponse confirme la reception du message
  @Post()
  @HttpCode(HttpStatus.OK)
  submit(@Body() body: unknown): ContactSubmissionResultDto {
    const validation = validateContactForm(body);

    if (!validation.valid) {
      throw new BadRequestException({
        success: false,
        errors: validation.errors,
      });
    }

    return this.supportService.submitContact(validation.data);
  }
}
