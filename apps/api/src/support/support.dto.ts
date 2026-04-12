import type { ContactFormDto } from '@kraak/contracts';

type ContactCategory = ContactFormDto['category'];

type ContactFormValidationSuccess = {
  valid: true;
  data: ContactFormDto;
};

type ContactFormValidationFailure = {
  valid: false;
  errors: string[];
};

export type ContactFormValidationResult =
  | ContactFormValidationSuccess
  | ContactFormValidationFailure;

const supportCategories: ContactCategory[] = [
  'technical',
  'program',
  'session',
  'billing',
  'other',
];

function readTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isSupportCategory(value: string): value is ContactCategory {
  return supportCategories.includes(value as ContactCategory);
}

export function validateContactForm(
  body: unknown,
): ContactFormValidationResult {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { valid: false, errors: ['Corps de requête invalide.'] };
  }

  const dto = body as Record<string, unknown>;
  const name = readTrimmedString(dto['name']);
  const email = readTrimmedString(dto['email']);
  const subject = readTrimmedString(dto['subject']);
  const message = readTrimmedString(dto['message']);
  const rawCategory = readTrimmedString(dto['category']);
  const errors: string[] = [];

  if (!name) {
    errors.push('Le nom est requis.');
  } else if (name.length < 2) {
    errors.push('Le nom doit contenir au moins 2 caracteres.');
  } else if (name.length > 80) {
    errors.push('Le nom ne peut pas depasser 80 caracteres.');
  }

  if (!email || !isValidEmail(email)) {
    errors.push("L'adresse e-mail est invalide.");
  }

  if (!subject) {
    errors.push("L'objet est requis.");
  } else if (subject.length < 3) {
    errors.push("L'objet doit contenir au moins 3 caracteres.");
  } else if (subject.length > 120) {
    errors.push("L'objet ne peut pas depasser 120 caracteres.");
  }

  if (!message) {
    errors.push('Le message est requis.');
  } else if (message.length < 10) {
    errors.push('Le message doit contenir au moins 10 caracteres.');
  } else if (message.length > 2000) {
    errors.push('Le message ne peut pas depasser 2000 caracteres.');
  }

  if (rawCategory && !isSupportCategory(rawCategory)) {
    errors.push('La categorie de support est invalide.');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      name,
      email,
      subject,
      message,
      category:
        rawCategory && isSupportCategory(rawCategory) ? rawCategory : 'other',
    },
  };
}
