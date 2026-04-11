export interface ContactDto {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function validateContactDto(body: unknown): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const dto = body as Record<string, unknown>;

  if (!dto || typeof dto !== 'object') {
    return { valid: false, errors: ['Corps de requête invalide.'] };
  }

  if (!dto['name'] || typeof dto['name'] !== 'string' || !dto['name'].trim()) {
    errors.push('Le nom est requis.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    !dto['email'] ||
    typeof dto['email'] !== 'string' ||
    !emailRegex.test(dto['email'])
  ) {
    errors.push("L'adresse e-mail est invalide.");
  }

  if (
    !dto['subject'] ||
    typeof dto['subject'] !== 'string' ||
    !dto['subject'].trim()
  ) {
    errors.push("L'objet est requis.");
  }

  if (
    !dto['message'] ||
    typeof dto['message'] !== 'string' ||
    dto['message'].trim().length < 10
  ) {
    errors.push('Le message doit contenir au moins 10 caractères.');
  }

  return { valid: errors.length === 0, errors };
}
