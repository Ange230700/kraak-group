import type { UserRoleValue } from '@kraak/contracts';
import { UserRole } from '@kraak/contracts';

// ── Entités du domaine ──────────────────────────────────────────────

export const Entity = {
  APP_USER: 'AppUser',
  PARTICIPANT: 'Participant',
  PROGRAM: 'Program',
  COHORT: 'Cohort',
  SESSION: 'Session',
  RESOURCE: 'Resource',
  ANNOUNCEMENT: 'Announcement',
  ENROLLMENT: 'Enrollment',
  NOTIFICATION: 'Notification',
  SUPPORT_REQUEST: 'SupportRequest',
} as const;

export type EntityValue = (typeof Entity)[keyof typeof Entity];

// ── Niveaux de permission ───────────────────────────────────────────

export type PermissionLevel = 'all' | 'own' | 'none';

// ── Matrices de permission ──────────────────────────────────────────

type PermissionMatrix = Record<
  UserRoleValue,
  Record<EntityValue, PermissionLevel>
>;

const allEntities = Object.values(Entity) as EntityValue[];

/** Construit une ligne de permissions : remplit avec `defaultLevel` puis applique les surcharges. */
function buildRow(
  defaultLevel: PermissionLevel,
  overrides: Partial<Record<EntityValue, PermissionLevel>> = {},
): Record<EntityValue, PermissionLevel> {
  const row = {} as Record<EntityValue, PermissionLevel>;
  for (const e of allEntities) row[e] = overrides[e] ?? defaultLevel;
  return row;
}

const viewMatrix: PermissionMatrix = {
  [UserRole.ADMIN]: buildRow('all'),
  [UserRole.PARTICIPANT]: buildRow('own'),
  [UserRole.TRAINER]: buildRow('own', { [Entity.ENROLLMENT]: 'none' }),
};

const editMatrix: PermissionMatrix = {
  [UserRole.ADMIN]: buildRow('all'),
  [UserRole.PARTICIPANT]: buildRow('none', {
    [Entity.APP_USER]: 'own',
    [Entity.PARTICIPANT]: 'own',
    [Entity.SUPPORT_REQUEST]: 'own',
  }),
  [UserRole.TRAINER]: buildRow('none', {
    [Entity.APP_USER]: 'own',
    [Entity.SESSION]: 'own',
    [Entity.RESOURCE]: 'own',
    [Entity.ANNOUNCEMENT]: 'own',
    [Entity.SUPPORT_REQUEST]: 'own',
  }),
};

// ── Fonctions publiques ─────────────────────────────────────────────

export function getViewPermission(
  role: UserRoleValue,
  entity: EntityValue,
): PermissionLevel {
  return viewMatrix[role][entity];
}

export function getEditPermission(
  role: UserRoleValue,
  entity: EntityValue,
): PermissionLevel {
  return editMatrix[role][entity];
}
