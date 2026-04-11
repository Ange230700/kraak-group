import { InjectionToken } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

export type ContactServiceValue =
  | 'general'
  | 'training'
  | 'projectManagement'
  | 'immigration';

export type ContactIntentValue =
  | 'information'
  | 'consultation'
  | 'programApplication'
  | 'partnership';

export interface ContactOption<TValue extends string> {
  value: TValue;
  label: string;
  description: string;
}

export interface ContactLeadPayload {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  service: ContactServiceValue;
  intent: ContactIntentValue;
  message: string;
  source: string;
}

export interface ContactLeadReceipt {
  reference: string;
  submittedAt: string;
}

export interface ContactLeadGateway {
  submit(payload: ContactLeadPayload): Observable<ContactLeadReceipt>;
}

export const CONTACT_SERVICE_OPTIONS: readonly ContactOption<ContactServiceValue>[] =
  [
    {
      value: 'general',
      label: 'Orientation générale',
      description: 'Vous avez besoin d’être orienté vers le bon accompagnement.',
    },
    {
      value: 'training',
      label: 'Formation',
      description: 'Développement des compétences, leadership et communication.',
    },
    {
      value: 'projectManagement',
      label: 'Gestion de projet',
      description: 'Structuration, pilotage et exécution de projets à impact.',
    },
    {
      value: 'immigration',
      label: 'Conseil en immigration',
      description: 'Préparation d’un parcours international ou d’un projet de mobilité.',
    },
  ] as const;

export const CONTACT_INTENT_OPTIONS: readonly ContactOption<ContactIntentValue>[] =
  [
    {
      value: 'information',
      label: "Demande d'information",
      description: 'Vous cherchez une première orientation rapide.',
    },
    {
      value: 'consultation',
      label: 'Demander une consultation',
      description: 'Vous souhaitez cadrer votre besoin avec notre équipe.',
    },
    {
      value: 'programApplication',
      label: 'Candidater à un programme',
      description: 'Vous souhaitez rejoindre une cohorte ou un parcours précis.',
    },
    {
      value: 'partnership',
      label: 'Parler partenariat',
      description: 'Vous souhaitez collaborer avec KRAAK sur une initiative.',
    },
  ] as const;

const serviceValues = new Set<ContactServiceValue>(
  CONTACT_SERVICE_OPTIONS.map((option) => option.value),
);
const intentValues = new Set<ContactIntentValue>(
  CONTACT_INTENT_OPTIONS.map((option) => option.value),
);

const demoGateway: ContactLeadGateway = {
  submit: () =>
    of({
      reference: buildContactReference(),
      submittedAt: new Date().toISOString(),
    }).pipe(delay(300)),
};

export const CONTACT_LEAD_GATEWAY = new InjectionToken<ContactLeadGateway>(
  'CONTACT_LEAD_GATEWAY',
  {
    providedIn: 'root',
    factory: () => demoGateway,
  },
);

export function parseContactServiceValue(
  value: string | null | undefined,
): ContactServiceValue {
  if (value && serviceValues.has(value as ContactServiceValue)) {
    return value as ContactServiceValue;
  }

  return 'general';
}

export function parseContactIntentValue(
  value: string | null | undefined,
): ContactIntentValue {
  if (value && intentValues.has(value as ContactIntentValue)) {
    return value as ContactIntentValue;
  }

  return 'information';
}

export function getContactServiceLabel(value: ContactServiceValue): string {
  return (
    CONTACT_SERVICE_OPTIONS.find((option) => option.value === value)?.label ??
    CONTACT_SERVICE_OPTIONS[0].label
  );
}

export function getContactIntentLabel(value: ContactIntentValue): string {
  return (
    CONTACT_INTENT_OPTIONS.find((option) => option.value === value)?.label ??
    CONTACT_INTENT_OPTIONS[0].label
  );
}

function buildContactReference(): string {
  const year = new Date().getFullYear();
  const suffix = Math.floor(Math.random() * 900 + 100);

  return `KRAAK-${year}-${suffix}`;
}
