import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { CourseDto, ProgramCourseDto, ProgramDto } from '@kraak/contracts';
import { vi } from 'vitest';

import { WebAuthService } from '../../../core/auth/web-auth.service';
import AdminCurriculumPage from './admin-curriculum.page';

const program: ProgramDto = {
  id: 'program-1',
  slug: 'leadership',
  title: 'Programme Leadership',
  summary: 'Résumé programme',
  description: 'Description programme',
  status: 'published',
  visibility: 'private',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const secondProgram: ProgramDto = {
  ...program,
  id: 'program-2',
  slug: 'management',
  title: 'Programme Management',
};

const course: CourseDto = {
  id: 'course-1',
  slug: 'leadership-fondamentaux',
  title: 'Fondamentaux du leadership',
  summary: 'Bases du leadership.',
  description: 'Description complète.',
  status: 'published',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const placement: ProgramCourseDto = {
  id: 'placement-1',
  programId: 'program-1',
  courseId: 'course-1',
  sortOrder: 0,
  isRequired: true,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const secondPlacement: ProgramCourseDto = {
  ...placement,
  id: 'placement-2',
  programId: secondProgram.id,
  courseId: 'course-2',
  sortOrder: 4,
};

const authMock = {
  currentSession: signal(null),
  isAuthenticated: signal(false),
  isAdmin: signal(false),
};

describe('AdminCurriculumPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCurriculumPage],
      providers: [
        provideRouter([]),
        { provide: WebAuthService, useValue: authMock },
      ],
    }).compileComponents();
  });

  it('Given curriculum data, When the page loads, Then the first program and its courses are rendered', async () => {
    const fixture = TestBed.createComponent(AdminCurriculumPage);
    const component = fixture.componentInstance;

    component.programsClient = {
      list: vi.fn().mockResolvedValue([program]),
    };
    component.coursesClient = {
      list: vi.fn().mockResolvedValue([course]),
      create: vi.fn(),
      update: vi.fn(),
      remove: vi.fn(),
    };
    component.programCoursesClient = {
      list: vi.fn().mockResolvedValue([placement]),
      create: vi.fn(),
      remove: vi.fn(),
    };

    fixture.detectChanges();
    await vi.waitFor(() => {
      expect(component['loading']()).toBe(false);
    });
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Curriculum');
    expect(text).toContain('Programme Leadership');
    expect(text).toContain('Fondamentaux du leadership');
    expect(component['selectedProgramId']()).toBe('program-1');
  });

  it('Given a valid course form, When submitted, Then the reusable course is created', async () => {
    const fixture = TestBed.createComponent(AdminCurriculumPage);
    const component = fixture.componentInstance;
    const create = vi.fn().mockResolvedValue(course);

    component.coursesClient = {
      list: vi.fn(),
      create,
      update: vi.fn(),
      remove: vi.fn(),
    };

    component.openCreateCourseForm();
    component.courseForm.setValue({
      slug: course.slug,
      title: course.title,
      summary: course.summary,
      description: course.description,
      status: course.status,
    });

    await component.submitCourse();

    expect(create).toHaveBeenCalledWith({
      slug: course.slug,
      title: course.title,
      summary: course.summary,
      description: course.description,
      status: course.status,
    });
    expect(component['courses']()).toContainEqual(course);
  });

  it('Given a selected program and available course, When attached, Then a program-course placement is created', async () => {
    const fixture = TestBed.createComponent(AdminCurriculumPage);
    const component = fixture.componentInstance;
    const create = vi.fn().mockResolvedValue(placement);

    component['programs'].set([program]);
    component['courses'].set([course]);
    component['selectedProgramId'].set(program.id);
    component['placementsReady'].set(true);
    component.programCoursesClient = {
      list: vi.fn(),
      create,
      remove: vi.fn(),
    };

    component.placementForm.setValue({
      courseId: course.id,
      sortOrder: 0,
      isRequired: true,
    });

    await component.attachCourse();

    expect(create).toHaveBeenCalledWith({
      programId: program.id,
      courseId: course.id,
      sortOrder: 0,
      isRequired: true,
    });
    expect(component['placements']()).toContainEqual(placement);
  });

  it('Given an assigned course, When removal is confirmed, Then the placement is deleted without deleting the course', async () => {
    const fixture = TestBed.createComponent(AdminCurriculumPage);
    const component = fixture.componentInstance;
    const remove = vi.fn().mockResolvedValue(undefined);

    component['courses'].set([course]);
    component['placements'].set([placement]);
    component.programCoursesClient = {
      list: vi.fn(),
      create: vi.fn(),
      remove,
    };
    vi.stubGlobal(
      'confirm',
      vi.fn(() => true),
    );

    await component.detachCourse(placement);

    expect(remove).toHaveBeenCalledWith(placement.id);
    expect(component['placements']()).toEqual([]);
    expect(component['courses']()).toContainEqual(course);
  });

  it('Given an assigned course, When it is archived, Then it remains locally available with archived status', async () => {
    const fixture = TestBed.createComponent(AdminCurriculumPage);
    const component = fixture.componentInstance;
    const remove = vi.fn().mockResolvedValue(undefined);

    component['courses'].set([course]);
    component['placements'].set([placement]);
    component.coursesClient = {
      list: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      remove,
    };
    vi.stubGlobal(
      'confirm',
      vi.fn(() => true),
    );

    await component.archiveCourse(course);

    expect(remove).toHaveBeenCalledWith(course.id);
    expect(component['courses']()).toHaveLength(1);
    expect(component['courses']()[0]).toMatchObject({
      id: course.id,
      status: 'archived',
    });
    expect(component['placements']()).toEqual([placement]);
    expect(component['courseById'](course.id)?.status).toBe('archived');
  });

  it('Given rapid program changes, When an older placement request resolves last, Then it cannot overwrite the latest program state', async () => {
    const fixture = TestBed.createComponent(AdminCurriculumPage);
    const component = fixture.componentInstance;

    let resolveFirstProgram!: (value: ProgramCourseDto[]) => void;
    let resolveSecondProgram!: (value: ProgramCourseDto[]) => void;

    const list = vi.fn(({ programId }: { programId?: string } = {}) => {
      return new Promise<ProgramCourseDto[]>((resolve) => {
        if (programId === secondProgram.id) {
          resolveSecondProgram = resolve;
          return;
        }

        resolveFirstProgram = resolve;
      });
    });

    component['programs'].set([program, secondProgram]);
    component['selectedProgramId'].set(program.id);
    component['placements'].set([placement]);
    component['placementsReady'].set(true);
    component.programCoursesClient = {
      list,
      create: vi.fn(),
      remove: vi.fn(),
    };

    const secondProgramLoad = component.selectProgram(secondProgram.id);

    expect(component['selectedProgramId']()).toBe(secondProgram.id);
    expect(component['placements']()).toEqual([]);
    expect(component['placementsReady']()).toBe(false);
    expect(component['placementsLoading']()).toBe(true);

    const firstProgramReload = component.selectProgram(program.id);

    resolveFirstProgram([placement]);
    await firstProgramReload;

    expect(component['selectedProgramId']()).toBe(program.id);
    expect(component['placements']()).toEqual([placement]);
    expect(component['placementsReady']()).toBe(true);
    expect(component['placementsLoading']()).toBe(false);

    resolveSecondProgram([secondPlacement]);
    await secondProgramLoad;

    expect(component['selectedProgramId']()).toBe(program.id);
    expect(component['placements']()).toEqual([placement]);
    expect(component['placementsReady']()).toBe(true);
  });

  it('Given sparse placement ordering, When the placement form resets, Then the next order follows the highest existing value', () => {
    const fixture = TestBed.createComponent(AdminCurriculumPage);
    const component = fixture.componentInstance;

    component['placements'].set([
      placement,
      {
        ...secondPlacement,
        programId: program.id,
        sortOrder: 5,
      },
    ]);

    component['resetPlacementForm']();

    expect(component.placementForm.controls.sortOrder.value).toBe(6);
  });
});
