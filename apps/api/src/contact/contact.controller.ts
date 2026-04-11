import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ContactDto, validateContactDto } from './contact.dto';
import { ContactService, ContactSubmissionResult } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // POST /contact
  // Given une demande de contact valide
  // When le client soumet le formulaire
  // Then la réponse confirme la réception du message
  @Post()
  @HttpCode(HttpStatus.OK)
  submit(@Body() body: unknown): ContactSubmissionResult {
    const { valid, errors } = validateContactDto(body);

    if (!valid) {
      throw new BadRequestException({ success: false, errors });
    }

    return this.contactService.submit(body as ContactDto);
  }
}
