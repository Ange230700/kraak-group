import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import type {
  ChapterDto,
  ChapterLessonDto,
  CourseDto,
  CourseModuleDto,
  CreateChapterDto,
  CreateChapterLessonDto,
  CreateCourseDto,
  CreateCourseModuleDto,
  CreateLearningModuleDto,
  CreateLessonDto,
  CreateProgramCourseDto,
  LearningModuleDto,
  LessonDto,
  ParticipantProgramCurriculumDto,
  ProgramCourseDto,
  UpdateChapterDto,
  UpdateChapterLessonDto,
  UpdateCourseDto,
  UpdateCourseModuleDto,
  UpdateLearningModuleDto,
  UpdateLessonDto,
  UpdateProgramCourseDto,
} from '@kraak/contracts';
import { SupabaseService } from '../supabase/supabase.service';

type PublicationStatus = 'draft' | 'published' | 'archived';

type CourseRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: PublicationStatus;
  created_at: string;
  updated_at: string;
};

type LearningModuleRow = CourseRow;

type ChapterRow = {
  id: string;
  learning_module_id: string;
  slug: string;
  title: string;
  summary: string;
  status: PublicationStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type LessonRow = CourseRow;

type ProgramCourseRow = {
  id: string;
  program_id: string;
  course_id: string;
  sort_order: number;
  is_required: boolean;
  created_at: string;
  updated_at: string;
};

type CourseModuleRow = {
  id: string;
  course_id: string;
  learning_module_id: string;
  sort_order: number;
  is_required: boolean;
  created_at: string;
  updated_at: string;
};

type ChapterLessonRow = {
  id: string;
  chapter_id: string;
  lesson_id: string;
  sort_order: number;
  is_required: boolean;
  created_at: string;
  updated_at: string;
};

const courseSelectFields =
  'id, slug, title, summary, description, status, created_at, updated_at';

const learningModuleSelectFields =
  'id, slug, title, summary, description, status, created_at, updated_at';

const chapterSelectFields =
  'id, learning_module_id, slug, title, summary, status, sort_order, created_at, updated_at';

const lessonSelectFields =
  'id, slug, title, summary, description, status, created_at, updated_at';

const programCourseSelectFields =
  'id, program_id, course_id, sort_order, is_required, created_at, updated_at';

const courseModuleSelectFields =
  'id, course_id, learning_module_id, sort_order, is_required, created_at, updated_at';

const chapterLessonSelectFields =
  'id, chapter_id, lesson_id, sort_order, is_required, created_at, updated_at';

@Injectable()
export class CurriculumService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // -------------------------------------------------------------------------
  // Courses
  // -------------------------------------------------------------------------

  async listCourses(): Promise<CourseDto[]> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('course')
      .select(courseSelectFields)
      .order('created_at', { ascending: true });

    if (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Impossible de charger les cours.',
      });
    }

    return ((data as CourseRow[] | null) ?? []).map((row) =>
      this.mapCourse(row),
    );
  }

  async createCourse(payload: CreateCourseDto): Promise<CourseDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('course')
      .insert({
        slug: payload.slug,
        title: payload.title,
        summary: payload.summary,
        description: payload.description,
        status: payload.status,
      })
      .select(courseSelectFields)
      .single();

    if (error || !data) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Impossible de créer le cours.',
      });
    }

    return this.mapCourse(data as CourseRow);
  }

  async updateCourse(
    courseId: string,
    payload: UpdateCourseDto,
  ): Promise<CourseDto> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('course')
      .update(this.mapReusableUpdate(payload))
      .eq('id', courseId)
      .select(courseSelectFields)
      .single();

    if (error || !data) {
      throw new NotFoundException({
        success: false,
        message: 'Cours introuvable.',
      });
    }

    return this.mapCourse(data as CourseRow);
  }

  async archiveCourse(courseId: string): Promise<void> {
    await this.archiveReusable('course', courseId, 'Cours introuvable.');
  }

  // -------------------------------------------------------------------------
  // Learning modules
  // -------------------------------------------------------------------------

  async listLearningModules(): Promise<LearningModuleDto[]> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('learning_module')
      .select(learningModuleSelectFields)
      .order('created_at', { ascending: true });

    if (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Impossible de charger les modules.',
      });
    }

    return ((data as LearningModuleRow[] | null) ?? []).map((row) =>
      this.mapLearningModule(row),
    );
  }

  async createLearningModule(
    payload: CreateLearningModuleDto,
  ): Promise<LearningModuleDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('learning_module')
      .insert({
        slug: payload.slug,
        title: payload.title,
        summary: payload.summary,
        description: payload.description,
        status: payload.status,
      })
      .select(learningModuleSelectFields)
      .single();

    if (error || !data) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Impossible de créer le module.',
      });
    }

    return this.mapLearningModule(data as LearningModuleRow);
  }

  async updateLearningModule(
    learningModuleId: string,
    payload: UpdateLearningModuleDto,
  ): Promise<LearningModuleDto> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('learning_module')
      .update(this.mapReusableUpdate(payload))
      .eq('id', learningModuleId)
      .select(learningModuleSelectFields)
      .single();

    if (error || !data) {
      throw new NotFoundException({
        success: false,
        message: 'Module introuvable.',
      });
    }

    return this.mapLearningModule(data as LearningModuleRow);
  }

  async archiveLearningModule(learningModuleId: string): Promise<void> {
    await this.archiveReusable(
      'learning_module',
      learningModuleId,
      'Module introuvable.',
    );
  }

  // -------------------------------------------------------------------------
  // Chapters
  // -------------------------------------------------------------------------

  async listChapters(learningModuleId?: string): Promise<ChapterDto[]> {
    const client = this.supabaseService.getClient();
    let query = client
      .from('chapter')
      .select(chapterSelectFields)
      .order('sort_order', { ascending: true });

    if (learningModuleId) {
      query = query.eq('learning_module_id', learningModuleId);
    }

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Impossible de charger les chapitres.',
      });
    }

    return ((data as ChapterRow[] | null) ?? []).map((row) =>
      this.mapChapter(row),
    );
  }

  async createChapter(payload: CreateChapterDto): Promise<ChapterDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('chapter')
      .insert({
        learning_module_id: payload.learningModuleId,
        slug: payload.slug,
        title: payload.title,
        summary: payload.summary,
        status: payload.status,
        sort_order: payload.sortOrder,
      })
      .select(chapterSelectFields)
      .single();

    if (error || !data) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Impossible de créer le chapitre.',
      });
    }

    return this.mapChapter(data as ChapterRow);
  }

  async updateChapter(
    chapterId: string,
    payload: UpdateChapterDto,
  ): Promise<ChapterDto> {
    const updatePayload: Record<string, unknown> = {};

    if (payload.learningModuleId !== undefined) {
      updatePayload['learning_module_id'] = payload.learningModuleId;
    }
    if (payload.slug !== undefined) {
      updatePayload['slug'] = payload.slug;
    }
    if (payload.title !== undefined) {
      updatePayload['title'] = payload.title;
    }
    if (payload.summary !== undefined) {
      updatePayload['summary'] = payload.summary;
    }
    if (payload.status !== undefined) {
      updatePayload['status'] = payload.status;
    }
    if (payload.sortOrder !== undefined) {
      updatePayload['sort_order'] = payload.sortOrder;
    }

    const { data, error } = await this.supabaseService
      .getClient()
      .from('chapter')
      .update(updatePayload)
      .eq('id', chapterId)
      .select(chapterSelectFields)
      .single();

    if (error || !data) {
      throw new NotFoundException({
        success: false,
        message: 'Chapitre introuvable.',
      });
    }

    return this.mapChapter(data as ChapterRow);
  }

  async archiveChapter(chapterId: string): Promise<void> {
    await this.archiveReusable('chapter', chapterId, 'Chapitre introuvable.');
  }

  // -------------------------------------------------------------------------
  // Lessons
  // -------------------------------------------------------------------------

  async listLessons(): Promise<LessonDto[]> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('lesson')
      .select(lessonSelectFields)
      .order('created_at', { ascending: true });

    if (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Impossible de charger les leçons.',
      });
    }

    return ((data as LessonRow[] | null) ?? []).map((row) =>
      this.mapLesson(row),
    );
  }

  async createLesson(payload: CreateLessonDto): Promise<LessonDto> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('lesson')
      .insert({
        slug: payload.slug,
        title: payload.title,
        summary: payload.summary,
        description: payload.description,
        status: payload.status,
      })
      .select(lessonSelectFields)
      .single();

    if (error || !data) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Impossible de créer la leçon.',
      });
    }

    return this.mapLesson(data as LessonRow);
  }

  async updateLesson(
    lessonId: string,
    payload: UpdateLessonDto,
  ): Promise<LessonDto> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('lesson')
      .update(this.mapReusableUpdate(payload))
      .eq('id', lessonId)
      .select(lessonSelectFields)
      .single();

    if (error || !data) {
      throw new NotFoundException({
        success: false,
        message: 'Leçon introuvable.',
      });
    }

    return this.mapLesson(data as LessonRow);
  }

  async archiveLesson(lessonId: string): Promise<void> {
    await this.archiveReusable('lesson', lessonId, 'Leçon introuvable.');
  }

  // -------------------------------------------------------------------------
  // Program -> Course placements
  // -------------------------------------------------------------------------

  async listProgramCourses(programId?: string): Promise<ProgramCourseDto[]> {
    const client = this.supabaseService.getClient();
    let query = client
      .from('program_course')
      .select(programCourseSelectFields)
      .order('sort_order', { ascending: true });

    if (programId) {
      query = query.eq('program_id', programId);
    }

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Impossible de charger les cours du programme.',
      });
    }

    return ((data as ProgramCourseRow[] | null) ?? []).map((row) =>
      this.mapProgramCourse(row),
    );
  }

  async createProgramCourse(
    payload: CreateProgramCourseDto,
  ): Promise<ProgramCourseDto> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('program_course')
      .insert({
        program_id: payload.programId,
        course_id: payload.courseId,
        sort_order: payload.sortOrder,
        is_required: payload.isRequired,
      })
      .select(programCourseSelectFields)
      .single();

    if (error || !data) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Impossible d’ajouter le cours au programme.',
      });
    }

    return this.mapProgramCourse(data as ProgramCourseRow);
  }

  async updateProgramCourse(
    placementId: string,
    payload: UpdateProgramCourseDto,
  ): Promise<ProgramCourseDto> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('program_course')
      .update(
        this.mapPlacementUpdate(payload, {
          programId: 'program_id',
          courseId: 'course_id',
        }),
      )
      .eq('id', placementId)
      .select(programCourseSelectFields)
      .single();

    if (error || !data) {
      throw new NotFoundException({
        success: false,
        message: 'Placement programme-cours introuvable.',
      });
    }

    return this.mapProgramCourse(data as ProgramCourseRow);
  }

  async deleteProgramCourse(placementId: string): Promise<void> {
    await this.deletePlacement(
      'program_course',
      placementId,
      'Placement programme-cours introuvable.',
    );
  }

  // -------------------------------------------------------------------------
  // Course -> Learning module placements
  // -------------------------------------------------------------------------

  async listCourseModules(courseId?: string): Promise<CourseModuleDto[]> {
    const client = this.supabaseService.getClient();
    let query = client
      .from('course_module')
      .select(courseModuleSelectFields)
      .order('sort_order', { ascending: true });

    if (courseId) {
      query = query.eq('course_id', courseId);
    }

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Impossible de charger les modules du cours.',
      });
    }

    return ((data as CourseModuleRow[] | null) ?? []).map((row) =>
      this.mapCourseModule(row),
    );
  }

  async createCourseModule(
    payload: CreateCourseModuleDto,
  ): Promise<CourseModuleDto> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('course_module')
      .insert({
        course_id: payload.courseId,
        learning_module_id: payload.learningModuleId,
        sort_order: payload.sortOrder,
        is_required: payload.isRequired,
      })
      .select(courseModuleSelectFields)
      .single();

    if (error || !data) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Impossible d’ajouter le module au cours.',
      });
    }

    return this.mapCourseModule(data as CourseModuleRow);
  }

  async updateCourseModule(
    placementId: string,
    payload: UpdateCourseModuleDto,
  ): Promise<CourseModuleDto> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('course_module')
      .update(
        this.mapPlacementUpdate(payload, {
          courseId: 'course_id',
          learningModuleId: 'learning_module_id',
        }),
      )
      .eq('id', placementId)
      .select(courseModuleSelectFields)
      .single();

    if (error || !data) {
      throw new NotFoundException({
        success: false,
        message: 'Placement cours-module introuvable.',
      });
    }

    return this.mapCourseModule(data as CourseModuleRow);
  }

  async deleteCourseModule(placementId: string): Promise<void> {
    await this.deletePlacement(
      'course_module',
      placementId,
      'Placement cours-module introuvable.',
    );
  }

  // -------------------------------------------------------------------------
  // Chapter -> Lesson placements
  // -------------------------------------------------------------------------

  async listChapterLessons(chapterId?: string): Promise<ChapterLessonDto[]> {
    const client = this.supabaseService.getClient();
    let query = client
      .from('chapter_lesson')
      .select(chapterLessonSelectFields)
      .order('sort_order', { ascending: true });

    if (chapterId) {
      query = query.eq('chapter_id', chapterId);
    }

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Impossible de charger les leçons du chapitre.',
      });
    }

    return ((data as ChapterLessonRow[] | null) ?? []).map((row) =>
      this.mapChapterLesson(row),
    );
  }

  async createChapterLesson(
    payload: CreateChapterLessonDto,
  ): Promise<ChapterLessonDto> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('chapter_lesson')
      .insert({
        chapter_id: payload.chapterId,
        lesson_id: payload.lessonId,
        sort_order: payload.sortOrder,
        is_required: payload.isRequired,
      })
      .select(chapterLessonSelectFields)
      .single();

    if (error || !data) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Impossible d’ajouter la leçon au chapitre.',
      });
    }

    return this.mapChapterLesson(data as ChapterLessonRow);
  }

  async updateChapterLesson(
    placementId: string,
    payload: UpdateChapterLessonDto,
  ): Promise<ChapterLessonDto> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('chapter_lesson')
      .update(
        this.mapPlacementUpdate(payload, {
          chapterId: 'chapter_id',
          lessonId: 'lesson_id',
        }),
      )
      .eq('id', placementId)
      .select(chapterLessonSelectFields)
      .single();

    if (error || !data) {
      throw new NotFoundException({
        success: false,
        message: 'Placement chapitre-leçon introuvable.',
      });
    }

    return this.mapChapterLesson(data as ChapterLessonRow);
  }

  async deleteChapterLesson(placementId: string): Promise<void> {
    await this.deletePlacement(
      'chapter_lesson',
      placementId,
      'Placement chapitre-leçon introuvable.',
    );
  }

  // -------------------------------------------------------------------------
  // Participant curriculum
  // -------------------------------------------------------------------------

  async getPublishedProgramCurriculum(
    programId: string,
  ): Promise<ParticipantProgramCurriculumDto> {
    const client = this.supabaseService.getClient();

    const { data: programCourseData, error: programCourseError } = await client
      .from('program_course')
      .select(programCourseSelectFields)
      .eq('program_id', programId)
      .order('sort_order', { ascending: true });

    if (programCourseError) {
      this.throwCurriculumReadError();
    }

    const programCourses =
      (programCourseData as ProgramCourseRow[] | null) ?? [];

    if (programCourses.length === 0) {
      return { courses: [] };
    }

    const courseIds = programCourses.map((placement) => placement.course_id);

    const { data: courseData, error: courseError } = await client
      .from('course')
      .select(courseSelectFields)
      .in('id', courseIds)
      .eq('status', 'published');

    if (courseError) {
      this.throwCurriculumReadError();
    }

    const courses = (courseData as CourseRow[] | null) ?? [];
    const courseById = new Map(courses.map((course) => [course.id, course]));
    const publishedCourseIds = courses.map((course) => course.id);

    if (publishedCourseIds.length === 0) {
      return { courses: [] };
    }

    const { data: courseModuleData, error: courseModuleError } = await client
      .from('course_module')
      .select(courseModuleSelectFields)
      .in('course_id', publishedCourseIds)
      .order('sort_order', { ascending: true });

    if (courseModuleError) {
      this.throwCurriculumReadError();
    }

    const courseModules = (courseModuleData as CourseModuleRow[] | null) ?? [];
    const learningModuleIds = [
      ...new Set(
        courseModules.map((placement) => placement.learning_module_id),
      ),
    ];

    let learningModules: LearningModuleRow[] = [];

    if (learningModuleIds.length > 0) {
      const { data, error } = await client
        .from('learning_module')
        .select(learningModuleSelectFields)
        .in('id', learningModuleIds)
        .eq('status', 'published');

      if (error) {
        this.throwCurriculumReadError();
      }

      learningModules = (data as LearningModuleRow[] | null) ?? [];
    }

    const learningModuleById = new Map(
      learningModules.map((learningModule) => [
        learningModule.id,
        learningModule,
      ]),
    );
    const publishedLearningModuleIds = learningModules.map(
      (learningModule) => learningModule.id,
    );

    let chapters: ChapterRow[] = [];

    if (publishedLearningModuleIds.length > 0) {
      const { data, error } = await client
        .from('chapter')
        .select(chapterSelectFields)
        .in('learning_module_id', publishedLearningModuleIds)
        .eq('status', 'published')
        .order('sort_order', { ascending: true });

      if (error) {
        this.throwCurriculumReadError();
      }

      chapters = (data as ChapterRow[] | null) ?? [];
    }

    const chapterIds = chapters.map((chapter) => chapter.id);
    let chapterLessons: ChapterLessonRow[] = [];

    if (chapterIds.length > 0) {
      const { data, error } = await client
        .from('chapter_lesson')
        .select(chapterLessonSelectFields)
        .in('chapter_id', chapterIds)
        .order('sort_order', { ascending: true });

      if (error) {
        this.throwCurriculumReadError();
      }

      chapterLessons = (data as ChapterLessonRow[] | null) ?? [];
    }

    const lessonIds = [
      ...new Set(chapterLessons.map((placement) => placement.lesson_id)),
    ];
    let lessons: LessonRow[] = [];

    if (lessonIds.length > 0) {
      const { data, error } = await client
        .from('lesson')
        .select(lessonSelectFields)
        .in('id', lessonIds)
        .eq('status', 'published');

      if (error) {
        this.throwCurriculumReadError();
      }

      lessons = (data as LessonRow[] | null) ?? [];
    }

    const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));

    const chapterLessonsByChapter = new Map<string, ChapterLessonRow[]>();
    for (const placement of chapterLessons) {
      const placements =
        chapterLessonsByChapter.get(placement.chapter_id) ?? [];
      placements.push(placement);
      chapterLessonsByChapter.set(placement.chapter_id, placements);
    }

    const chaptersByModule = new Map<string, ChapterRow[]>();
    for (const chapter of chapters) {
      const moduleChapters =
        chaptersByModule.get(chapter.learning_module_id) ?? [];
      moduleChapters.push(chapter);
      chaptersByModule.set(chapter.learning_module_id, moduleChapters);
    }

    const courseModulesByCourse = new Map<string, CourseModuleRow[]>();
    for (const placement of courseModules) {
      const placements = courseModulesByCourse.get(placement.course_id) ?? [];
      placements.push(placement);
      courseModulesByCourse.set(placement.course_id, placements);
    }

    return {
      courses: programCourses.flatMap((programCoursePlacement) => {
        const course = courseById.get(programCoursePlacement.course_id);

        if (!course) {
          return [];
        }

        return [
          {
            placement: this.mapProgramCourse(programCoursePlacement),
            course: this.mapCourse(course),
            modules: (
              courseModulesByCourse.get(programCoursePlacement.course_id) ?? []
            ).flatMap((courseModulePlacement) => {
              const learningModule = learningModuleById.get(
                courseModulePlacement.learning_module_id,
              );

              if (!learningModule) {
                return [];
              }

              return [
                {
                  placement: this.mapCourseModule(courseModulePlacement),
                  learningModule: this.mapLearningModule(learningModule),
                  chapters: (chaptersByModule.get(learningModule.id) ?? []).map(
                    (chapter) => ({
                      chapter: this.mapChapter(chapter),
                      lessons: (
                        chapterLessonsByChapter.get(chapter.id) ?? []
                      ).flatMap((chapterLessonPlacement) => {
                        const lesson = lessonById.get(
                          chapterLessonPlacement.lesson_id,
                        );

                        if (!lesson) {
                          return [];
                        }

                        return [
                          {
                            placement: this.mapChapterLesson(
                              chapterLessonPlacement,
                            ),
                            lesson: this.mapLesson(lesson),
                          },
                        ];
                      }),
                    }),
                  ),
                },
              ];
            }),
          },
        ];
      }),
    };
  }

  // -------------------------------------------------------------------------
  // Shared helpers
  // -------------------------------------------------------------------------

  private throwCurriculumReadError(): never {
    throw new InternalServerErrorException({
      success: false,
      message: 'Impossible de charger le curriculum du programme.',
    });
  }

  private mapPlacementUpdate(
    payload:
      | UpdateProgramCourseDto
      | UpdateCourseModuleDto
      | UpdateChapterLessonDto,
    idFields: Record<string, string>,
  ): Record<string, unknown> {
    const updatePayload: Record<string, unknown> = {};
    const source = payload as Record<string, unknown>;

    for (const [dtoField, dbField] of Object.entries(idFields)) {
      if (source[dtoField] !== undefined) {
        updatePayload[dbField] = source[dtoField];
      }
    }

    if (payload.sortOrder !== undefined) {
      updatePayload['sort_order'] = payload.sortOrder;
    }

    if (payload.isRequired !== undefined) {
      updatePayload['is_required'] = payload.isRequired;
    }

    return updatePayload;
  }

  private async deletePlacement(
    table: 'program_course' | 'course_module' | 'chapter_lesson',
    id: string,
    notFoundMessage: string,
  ): Promise<void> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from(table)
      .delete()
      .eq('id', id)
      .select('id')
      .single();

    if (error || !data) {
      throw new NotFoundException({
        success: false,
        message: notFoundMessage,
      });
    }
  }

  private mapReusableUpdate(
    payload: UpdateCourseDto | UpdateLearningModuleDto | UpdateLessonDto,
  ): Record<string, unknown> {
    const updatePayload: Record<string, unknown> = {};

    if (payload.slug !== undefined) {
      updatePayload['slug'] = payload.slug;
    }
    if (payload.title !== undefined) {
      updatePayload['title'] = payload.title;
    }
    if (payload.summary !== undefined) {
      updatePayload['summary'] = payload.summary;
    }
    if (payload.description !== undefined) {
      updatePayload['description'] = payload.description;
    }
    if (payload.status !== undefined) {
      updatePayload['status'] = payload.status;
    }

    return updatePayload;
  }

  private async archiveReusable(
    table: 'course' | 'learning_module' | 'chapter' | 'lesson',
    id: string,
    notFoundMessage: string,
  ): Promise<void> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from(table)
      .update({ status: 'archived' })
      .eq('id', id)
      .select('id')
      .single();

    if (error || !data) {
      throw new NotFoundException({
        success: false,
        message: notFoundMessage,
      });
    }
  }

  private mapProgramCourse(row: ProgramCourseRow): ProgramCourseDto {
    return {
      id: row.id,
      programId: row.program_id,
      courseId: row.course_id,
      sortOrder: row.sort_order,
      isRequired: row.is_required,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapCourseModule(row: CourseModuleRow): CourseModuleDto {
    return {
      id: row.id,
      courseId: row.course_id,
      learningModuleId: row.learning_module_id,
      sortOrder: row.sort_order,
      isRequired: row.is_required,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapChapterLesson(row: ChapterLessonRow): ChapterLessonDto {
    return {
      id: row.id,
      chapterId: row.chapter_id,
      lessonId: row.lesson_id,
      sortOrder: row.sort_order,
      isRequired: row.is_required,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapCourse(row: CourseRow): CourseDto {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      summary: row.summary,
      description: row.description,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapLearningModule(row: LearningModuleRow): LearningModuleDto {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      summary: row.summary,
      description: row.description,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapChapter(row: ChapterRow): ChapterDto {
    return {
      id: row.id,
      learningModuleId: row.learning_module_id,
      slug: row.slug,
      title: row.title,
      summary: row.summary,
      status: row.status,
      sortOrder: row.sort_order,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapLesson(row: LessonRow): LessonDto {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      summary: row.summary,
      description: row.description,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
