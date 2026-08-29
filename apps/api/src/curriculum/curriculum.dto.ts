import type {
  CreateChapterDto,
  CreateChapterLessonDto,
  CreateCourseDto,
  CreateCourseModuleDto,
  CreateLearningModuleDto,
  CreateLessonDto,
  CreateProgramCourseDto,
  UpdateChapterDto,
  UpdateChapterLessonDto,
  UpdateCourseDto,
  UpdateCourseModuleDto,
  UpdateLearningModuleDto,
  UpdateLessonDto,
  UpdateProgramCourseDto,
} from '@kraak/contracts';
import {
  isObjectPayload,
  readTrimmedString,
} from '../shared/dto-validation.utils';
import type { ValidationResult } from '../shared/validation-result.type';

const publicationStatuses = new Set(['draft', 'published', 'archived']);

function assignRequiredText(
  body: Record<string, unknown>,
  field: string,
  errors: string[],
  data: Record<string, unknown>,
): void {
  if (!(field in body)) {
    errors.push(`Le champ ${field} est requis.`);
    return;
  }

  const value = readTrimmedString(body[field]);

  if (!value) {
    errors.push(`Le champ ${field} est requis.`);
    return;
  }

  data[field] = value;
}

function assignOptionalText(
  body: Record<string, unknown>,
  field: string,
  errors: string[],
  data: Record<string, unknown>,
): void {
  if (!(field in body)) {
    return;
  }

  const value = readTrimmedString(body[field]);

  if (!value) {
    errors.push(`Le champ ${field} est requis.`);
    return;
  }

  data[field] = value;
}

function assignRequiredSlug(
  body: Record<string, unknown>,
  errors: string[],
  data: Record<string, unknown>,
): void {
  assignRequiredText(body, 'slug', errors, data);

  if (typeof data['slug'] === 'string' && !/^[a-z0-9-]+$/.test(data['slug'])) {
    errors.push('Le champ slug est invalide.');
    delete data['slug'];
  }
}

function assignOptionalSlug(
  body: Record<string, unknown>,
  errors: string[],
  data: Record<string, unknown>,
): void {
  assignOptionalText(body, 'slug', errors, data);

  if (typeof data['slug'] === 'string' && !/^[a-z0-9-]+$/.test(data['slug'])) {
    errors.push('Le champ slug est invalide.');
    delete data['slug'];
  }
}

function assignRequiredStatus(
  body: Record<string, unknown>,
  errors: string[],
  data: Record<string, unknown>,
): void {
  if (!('status' in body)) {
    errors.push('Le champ status est requis.');
    return;
  }

  const status = readTrimmedString(body['status']);

  if (!publicationStatuses.has(status)) {
    errors.push('Le champ status est invalide.');
    return;
  }

  data['status'] = status;
}

function assignOptionalStatus(
  body: Record<string, unknown>,
  errors: string[],
  data: Record<string, unknown>,
): void {
  if (!('status' in body)) {
    return;
  }

  const status = readTrimmedString(body['status']);

  if (!publicationStatuses.has(status)) {
    errors.push('Le champ status est invalide.');
    return;
  }

  data['status'] = status;
}

function assignRequiredNonNegativeInteger(
  body: Record<string, unknown>,
  field: string,
  errors: string[],
  data: Record<string, unknown>,
): void {
  if (!(field in body)) {
    errors.push(`Le champ ${field} est requis.`);
    return;
  }

  const value = body[field];

  if (!Number.isInteger(value) || (value as number) < 0) {
    errors.push(`Le champ ${field} doit être un entier positif ou nul.`);
    return;
  }

  data[field] = value;
}

function assignOptionalNonNegativeInteger(
  body: Record<string, unknown>,
  field: string,
  errors: string[],
  data: Record<string, unknown>,
): void {
  if (!(field in body)) {
    return;
  }

  const value = body[field];

  if (!Number.isInteger(value) || (value as number) < 0) {
    errors.push(`Le champ ${field} doit être un entier positif ou nul.`);
    return;
  }

  data[field] = value;
}

function assignRequiredBoolean(
  body: Record<string, unknown>,
  field: string,
  errors: string[],
  data: Record<string, unknown>,
): void {
  if (!(field in body)) {
    errors.push(`Le champ ${field} est requis.`);
    return;
  }

  if (typeof body[field] !== 'boolean') {
    errors.push(`Le champ ${field} doit être un booléen.`);
    return;
  }

  data[field] = body[field];
}

function assignOptionalBoolean(
  body: Record<string, unknown>,
  field: string,
  errors: string[],
  data: Record<string, unknown>,
): void {
  if (!(field in body)) {
    return;
  }

  if (typeof body[field] !== 'boolean') {
    errors.push(`Le champ ${field} doit être un booléen.`);
    return;
  }

  data[field] = body[field];
}

function finalizeCreate<T>(
  body: unknown,
  assign: (
    body: Record<string, unknown>,
    errors: string[],
    data: Record<string, unknown>,
  ) => void,
): ValidationResult<T> {
  if (!isObjectPayload(body)) {
    return {
      valid: false,
      errors: ['Corps de requête invalide.'],
    };
  }

  const errors: string[] = [];
  const data: Record<string, unknown> = {};

  assign(body, errors, data);

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: data as T,
  };
}

function finalizeUpdate<T>(
  body: unknown,
  assign: (
    body: Record<string, unknown>,
    errors: string[],
    data: Record<string, unknown>,
  ) => void,
): ValidationResult<T> {
  if (!isObjectPayload(body)) {
    return {
      valid: false,
      errors: ['Corps de requête invalide.'],
    };
  }

  const errors: string[] = [];
  const data: Record<string, unknown> = {};

  assign(body, errors, data);

  if (Object.keys(data).length === 0 && errors.length === 0) {
    return {
      valid: false,
      errors: ['Le payload de mise à jour doit contenir au moins un champ.'],
    };
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: data as T,
  };
}

function assignReusableCreate(
  body: Record<string, unknown>,
  errors: string[],
  data: Record<string, unknown>,
): void {
  assignRequiredSlug(body, errors, data);
  assignRequiredText(body, 'title', errors, data);
  assignRequiredText(body, 'summary', errors, data);
  assignRequiredText(body, 'description', errors, data);
  assignRequiredStatus(body, errors, data);
}

function assignReusableUpdate(
  body: Record<string, unknown>,
  errors: string[],
  data: Record<string, unknown>,
): void {
  assignOptionalSlug(body, errors, data);
  assignOptionalText(body, 'title', errors, data);
  assignOptionalText(body, 'summary', errors, data);
  assignOptionalText(body, 'description', errors, data);
  assignOptionalStatus(body, errors, data);
}

export function validateCreateCoursePayload(
  body: unknown,
): ValidationResult<CreateCourseDto> {
  return finalizeCreate(body, assignReusableCreate);
}

export function validateUpdateCoursePayload(
  body: unknown,
): ValidationResult<UpdateCourseDto> {
  return finalizeUpdate(body, assignReusableUpdate);
}

export function validateCreateLearningModulePayload(
  body: unknown,
): ValidationResult<CreateLearningModuleDto> {
  return finalizeCreate(body, assignReusableCreate);
}

export function validateUpdateLearningModulePayload(
  body: unknown,
): ValidationResult<UpdateLearningModuleDto> {
  return finalizeUpdate(body, assignReusableUpdate);
}

export function validateCreateLessonPayload(
  body: unknown,
): ValidationResult<CreateLessonDto> {
  return finalizeCreate(body, assignReusableCreate);
}

export function validateUpdateLessonPayload(
  body: unknown,
): ValidationResult<UpdateLessonDto> {
  return finalizeUpdate(body, assignReusableUpdate);
}

function assignChapterCreate(
  body: Record<string, unknown>,
  errors: string[],
  data: Record<string, unknown>,
): void {
  assignRequiredText(body, 'learningModuleId', errors, data);
  assignRequiredSlug(body, errors, data);
  assignRequiredText(body, 'title', errors, data);
  assignRequiredText(body, 'summary', errors, data);
  assignRequiredStatus(body, errors, data);
  assignRequiredNonNegativeInteger(body, 'sortOrder', errors, data);
}

function assignChapterUpdate(
  body: Record<string, unknown>,
  errors: string[],
  data: Record<string, unknown>,
): void {
  assignOptionalText(body, 'learningModuleId', errors, data);
  assignOptionalSlug(body, errors, data);
  assignOptionalText(body, 'title', errors, data);
  assignOptionalText(body, 'summary', errors, data);
  assignOptionalStatus(body, errors, data);
  assignOptionalNonNegativeInteger(body, 'sortOrder', errors, data);
}

export function validateCreateChapterPayload(
  body: unknown,
): ValidationResult<CreateChapterDto> {
  return finalizeCreate(body, assignChapterCreate);
}

export function validateUpdateChapterPayload(
  body: unknown,
): ValidationResult<UpdateChapterDto> {
  return finalizeUpdate(body, assignChapterUpdate);
}

function validateCreatePlacement<T>(
  body: unknown,
  firstId: string,
  secondId: string,
): ValidationResult<T> {
  return finalizeCreate(body, (payload, errors, data) => {
    assignRequiredText(payload, firstId, errors, data);
    assignRequiredText(payload, secondId, errors, data);
    assignRequiredNonNegativeInteger(payload, 'sortOrder', errors, data);
    assignRequiredBoolean(payload, 'isRequired', errors, data);
  });
}

function validateUpdatePlacement<T>(
  body: unknown,
  firstId: string,
  secondId: string,
): ValidationResult<T> {
  return finalizeUpdate(body, (payload, errors, data) => {
    assignOptionalText(payload, firstId, errors, data);
    assignOptionalText(payload, secondId, errors, data);
    assignOptionalNonNegativeInteger(payload, 'sortOrder', errors, data);
    assignOptionalBoolean(payload, 'isRequired', errors, data);
  });
}

export function validateCreateProgramCoursePayload(
  body: unknown,
): ValidationResult<CreateProgramCourseDto> {
  return validateCreatePlacement(body, 'programId', 'courseId');
}

export function validateUpdateProgramCoursePayload(
  body: unknown,
): ValidationResult<UpdateProgramCourseDto> {
  return validateUpdatePlacement(body, 'programId', 'courseId');
}

export function validateCreateCourseModulePayload(
  body: unknown,
): ValidationResult<CreateCourseModuleDto> {
  return validateCreatePlacement(body, 'courseId', 'learningModuleId');
}

export function validateUpdateCourseModulePayload(
  body: unknown,
): ValidationResult<UpdateCourseModuleDto> {
  return validateUpdatePlacement(body, 'courseId', 'learningModuleId');
}

export function validateCreateChapterLessonPayload(
  body: unknown,
): ValidationResult<CreateChapterLessonDto> {
  return validateCreatePlacement(body, 'chapterId', 'lessonId');
}

export function validateUpdateChapterLessonPayload(
  body: unknown,
): ValidationResult<UpdateChapterLessonDto> {
  return validateUpdatePlacement(body, 'chapterId', 'lessonId');
}
