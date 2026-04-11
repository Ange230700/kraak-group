export interface ContactDto {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Vérifie qu'une adresse e-mail a la forme minimale user@domain.tld (vérification linéaire). */
function isValidEmail(email: string): boolean {
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || local.includes(' ')) return false;
  const domainParts = domain.split('.');
  return (
    domainParts.length >= 2 &&
    domainParts.every((p) => p.length > 0 && !p.includes(' '))
  );
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

  if (
    !dto['email'] ||
    typeof dto['email'] !== 'string' ||
    !isValidEmail(dto['email'])
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
