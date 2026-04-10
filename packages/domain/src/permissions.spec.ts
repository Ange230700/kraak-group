import { describe, it, expect } from 'vitest';
import { UserRole } from '@kraak/contracts';
import {
  getViewPermission,
  getEditPermission,
  Entity,
  type EntityValue,
} from './permissions';

const allEntities = Object.values(Entity) as EntityValue[];

// ── getViewPermission ───────────────────────────────────────────────

describe('getViewPermission', () => {
  describe('Given an admin role', () => {
    it.each(allEntities)('When checking %s / Then returns "all"', (entity) => {
      expect(getViewPermission(UserRole.ADMIN, entity)).toBe('all');
    });
  });

  describe('Given a participant role', () => {
    it.each(allEntities)('When checking %s / Then returns "own"', (entity) => {
      expect(getViewPermission(UserRole.PARTICIPANT, entity)).toBe('own');
    });
  });

  describe('Given a trainer role', () => {
    const ownEntities: EntityValue[] = [
      Entity.APP_USER,
      Entity.PARTICIPANT,
      Entity.PROGRAM,
      Entity.COHORT,
      Entity.SESSION,
      Entity.RESOURCE,
      Entity.ANNOUNCEMENT,
      Entity.NOTIFICATION,
      Entity.SUPPORT_REQUEST,
    ];

    it.each(ownEntities)('When checking %s / Then returns "own"', (entity) => {
      expect(getViewPermission(UserRole.TRAINER, entity)).toBe('own');
    });

    it('When checking Enrollment / Then returns "none"', () => {
      expect(getViewPermission(UserRole.TRAINER, Entity.ENROLLMENT)).toBe(
        'none',
      );
    });
  });
});

// ── getEditPermission ───────────────────────────────────────────────

describe('getEditPermission', () => {
  describe('Given an admin role', () => {
    it.each(allEntities)('When checking %s / Then returns "all"', (entity) => {
      expect(getEditPermission(UserRole.ADMIN, entity)).toBe('all');
    });
  });

  describe('Given a participant role', () => {
    const ownEntities: EntityValue[] = [
      Entity.APP_USER,
      Entity.PARTICIPANT,
      Entity.SUPPORT_REQUEST,
    ];
    const noneEntities: EntityValue[] = [
      Entity.PROGRAM,
      Entity.COHORT,
      Entity.SESSION,
      Entity.RESOURCE,
      Entity.ANNOUNCEMENT,
      Entity.ENROLLMENT,
      Entity.NOTIFICATION,
    ];

    it.each(ownEntities)('When checking %s / Then returns "own"', (entity) => {
      expect(getEditPermission(UserRole.PARTICIPANT, entity)).toBe('own');
    });

    it.each(noneEntities)(
      'When checking %s / Then returns "none"',
      (entity) => {
        expect(getEditPermission(UserRole.PARTICIPANT, entity)).toBe('none');
      },
    );
  });

  describe('Given a trainer role', () => {
    const ownEntities: EntityValue[] = [
      Entity.APP_USER,
      Entity.SESSION,
      Entity.RESOURCE,
      Entity.ANNOUNCEMENT,
      Entity.SUPPORT_REQUEST,
    ];
    const noneEntities: EntityValue[] = [
      Entity.PARTICIPANT,
      Entity.PROGRAM,
      Entity.COHORT,
      Entity.ENROLLMENT,
      Entity.NOTIFICATION,
    ];

    it.each(ownEntities)('When checking %s / Then returns "own"', (entity) => {
      expect(getEditPermission(UserRole.TRAINER, entity)).toBe('own');
    });

    it.each(noneEntities)(
      'When checking %s / Then returns "none"',
      (entity) => {
        expect(getEditPermission(UserRole.TRAINER, entity)).toBe('none');
      },
    );
  });
});
