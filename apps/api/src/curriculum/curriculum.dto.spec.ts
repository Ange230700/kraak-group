import {
  validateCreateChapterLessonPayload,
  validateCreateChapterPayload,
  validateCreateCourseModulePayload,
  validateCreateCoursePayload,
  validateCreateLearningModulePayload,
  validateCreateLessonPayload,
  validateCreateProgramCoursePayload,
  validateUpdateChapterLessonPayload,
  validateUpdateChapterPayload,
  validateUpdateCourseModulePayload,
  validateUpdateCoursePayload,
  validateUpdateLearningModulePayload,
  validateUpdateLessonPayload,
  validateUpdateProgramCoursePayload,
} from './curriculum.dto';

describe('Curriculum DTO validation', () => {
  it('Given des entités pédagogiques valides, When les validateurs create sont appelés, Then les payloads sont normalisés', () => {
    expect(
      validateCreateCoursePayload({
        slug: ' leadership-foundations ',
        title: ' Leadership Foundations ',
        summary: ' Résumé ',
        description: ' Description ',
        status: 'published',
      }),
    ).toEqual({
      valid: true,
      data: {
        slug: 'leadership-foundations',
        title: 'Leadership Foundations',
        summary: 'Résumé',
        description: 'Description',
        status: 'published',
      },
    });

    expect(
      validateCreateLearningModulePayload({
        slug: ' self-leadership ',
        title: ' Self Leadership ',
        summary: ' Résumé ',
        description: ' Description ',
        status: 'draft',
      }).valid,
    ).toBe(true);

    expect(
      validateCreateLessonPayload({
        slug: ' leading-yourself ',
        title: ' Leading Yourself ',
        summary: ' Résumé ',
        description: ' Description ',
        status: 'draft',
      }).valid,
    ).toBe(true);

    expect(
      validateCreateChapterPayload({
        learningModuleId: ' module-1 ',
        slug: ' introduction ',
        title: ' Introduction ',
        summary: ' Résumé ',
        status: 'published',
        sortOrder: 0,
      }),
    ).toEqual({
      valid: true,
      data: {
        learningModuleId: 'module-1',
        slug: 'introduction',
        title: 'Introduction',
        summary: 'Résumé',
        status: 'published',
        sortOrder: 0,
      },
    });
  });

  it('Given des placements valides, When les validateurs create sont appelés, Then les relations et ordres sont normalisés', () => {
    expect(
      validateCreateProgramCoursePayload({
        programId: ' program-1 ',
        courseId: ' course-1 ',
        sortOrder: 0,
        isRequired: true,
      }),
    ).toEqual({
      valid: true,
      data: {
        programId: 'program-1',
        courseId: 'course-1',
        sortOrder: 0,
        isRequired: true,
      },
    });

    expect(
      validateCreateCourseModulePayload({
        courseId: 'course-1',
        learningModuleId: 'module-1',
        sortOrder: 1,
        isRequired: false,
      }).valid,
    ).toBe(true);

    expect(
      validateCreateChapterLessonPayload({
        chapterId: 'chapter-1',
        lessonId: 'lesson-1',
        sortOrder: 2,
        isRequired: true,
      }).valid,
    ).toBe(true);
  });

  it('Given des valeurs invalides, When les validateurs sont appelés, Then les erreurs métier sont explicites', () => {
    expect(
      validateCreateCoursePayload({
        slug: 'Slug Invalide',
        title: '',
        summary: '',
        description: '',
        status: 'deleted',
      }),
    ).toEqual({
      valid: false,
      errors: [
        'Le champ slug est invalide.',
        'Le champ title est requis.',
        'Le champ summary est requis.',
        'Le champ description est requis.',
        'Le champ status est invalide.',
      ],
    });

    expect(
      validateCreateChapterPayload({
        learningModuleId: '',
        slug: 'chapter',
        title: 'Chapter',
        summary: 'Summary',
        status: 'draft',
        sortOrder: -1,
      }).valid,
    ).toBe(false);

    expect(
      validateCreateProgramCoursePayload({
        programId: 'program-1',
        courseId: 'course-1',
        sortOrder: 0.5,
        isRequired: 'yes',
      }),
    ).toEqual({
      valid: false,
      errors: [
        'Le champ sortOrder doit être un entier positif ou nul.',
        'Le champ isRequired doit être un booléen.',
      ],
    });
  });

  it('Given des mises à jour partielles valides, When les validateurs update sont appelés, Then chaque famille est acceptée', () => {
    expect(validateUpdateCoursePayload({ title: ' Nouveau titre ' })).toEqual({
      valid: true,
      data: { title: 'Nouveau titre' },
    });

    expect(
      validateUpdateLearningModulePayload({ status: 'archived' }).valid,
    ).toBe(true);

    expect(validateUpdateLessonPayload({ summary: ' Nouveau ' }).valid).toBe(
      true,
    );

    expect(validateUpdateChapterPayload({ sortOrder: 3 }).valid).toBe(true);

    expect(
      validateUpdateProgramCoursePayload({ isRequired: false }).valid,
    ).toBe(true);

    expect(validateUpdateCourseModulePayload({ sortOrder: 4 }).valid).toBe(
      true,
    );

    expect(validateUpdateChapterLessonPayload({ sortOrder: 5 }).valid).toBe(
      true,
    );
  });

  it('Given un payload update vide ou un body invalide, When la validation est exécutée, Then le payload est rejeté', () => {
    expect(validateUpdateCoursePayload({})).toEqual({
      valid: false,
      errors: ['Le payload de mise à jour doit contenir au moins un champ.'],
    });

    expect(validateCreateCoursePayload(null)).toEqual({
      valid: false,
      errors: ['Corps de requête invalide.'],
    });
  });
});
