import { SOURCE_LOCALE, type SupportedLocale } from '@kraak/domain';

const FRENCH_API_MESSAGES = {
  'validation.invalidPayload': 'Payload invalide.',
  'validation.nonEmptyArrayField':
    'Le champ {{field}} doit contenir au moins une valeur.',
  'validation.updateRequiresField':
    'Le payload de mise à jour doit contenir au moins un champ.',
  'validation.invalidBody': 'Corps de requête invalide.',
  'validation.requiredField': 'Le champ {{field}} est requis.',
  'validation.invalidField': 'Le champ {{field}} est invalide.',
  'validation.invalidEmail': "L'adresse e-mail est invalide.",
  'validation.integerField': 'Le champ {{field}} doit être un entier.',
  'validation.nonNegativeIntegerField':
    'Le champ {{field}} doit être un entier positif ou nul.',
  'validation.booleanField': 'Le champ {{field}} doit être un booléen.',
  'validation.requiredValidUrlField':
    'Le champ {{field}} est requis et doit être une URL valide.',
  'auth.passwordTooShort':
    'Le mot de passe doit contenir au moins 8 caractères.',
  'auth.passwordTooLong':
    'Le mot de passe ne peut pas dépasser 128 caractères.',
  'auth.firstNameRequired': 'Le prénom est requis.',
  'auth.lastNameRequired': 'Le nom est requis.',
  'auth.firstNameTooLong':
    'Le prénom ne peut pas dépasser {{maxLength}} caractères.',
  'auth.lastNameTooLong':
    'Le nom ne peut pas dépasser {{maxLength}} caractères.',
  'auth.redirectInvalid': 'Le lien de redirection est invalide.',
  'auth.refreshTokenRequired': 'Le refresh token est requis.',
  'users.invalidBody': 'Corps de requête manquant ou invalide',
  'users.emailRequired': "L'adresse email est obligatoire",
  'users.firstNameRequired': 'Le prénom est obligatoire',
  'users.lastNameRequired': 'Le nom de famille est obligatoire',
  'users.firstNameInvalid': 'Le prénom est invalide',
  'users.lastNameInvalid': 'Le nom de famille est invalide',
  'users.roleInvalid': "Le rôle doit être l'un des suivants : {{roles}}",
  'users.isActiveBoolean': 'Le statut actif doit être un booléen',
  'articles.notFound': 'Article introuvable.',
  'articles.categoryNotFound': 'Catégorie introuvable.',
  'articles.tagNotFound': 'Tag introuvable.',
  'programs.notFound': 'Programme introuvable.',
  'programs.participantProgramNotFound':
    'Programme introuvable pour ce participant.',
  'programs.featureNotFound': 'Fonctionnalité de programme introuvable.',
  'programs.sessionNotFound': 'Session introuvable pour ce programme.',
  'cms.statisticNotFound': 'Statistique introuvable.',
  'cms.partnerNotFound': 'Partenaire introuvable.',
  'cms.testimonialNotFound': 'Témoignage introuvable.',
  'cms.teamMemberNotFound': "Membre d'équipe introuvable.",
  'curriculum.courseNotFound': 'Cours introuvable.',
  'curriculum.moduleNotFound': 'Module introuvable.',
  'curriculum.chapterNotFound': 'Chapitre introuvable.',
  'curriculum.lessonNotFound': 'Leçon introuvable.',
  'curriculum.programCoursePlacementNotFound':
    'Placement programme-cours introuvable.',
  'curriculum.courseModulePlacementNotFound':
    'Placement cours-module introuvable.',
  'curriculum.chapterLessonPlacementNotFound':
    'Placement chapitre-leçon introuvable.',
  'announcements.notFound': 'Annonce introuvable.',
  'support.requestNotFound': 'Demande de support introuvable.',
  'services.notFound': 'Service introuvable.',
  'services.detailNotFound': 'Détail de service introuvable.',
  'auth.userProfileNotFound': 'Le profil utilisateur est introuvable.',
  'users.notFound': 'Utilisateur introuvable : {{id}}',
  'announcements.notFoundOrNotPublished': 'Annonce introuvable ou non publiée.',
  'announcements.notFoundOrNotAccessible':
    'Annonce introuvable ou non accessible.',
  'articles.categoriesOrTagsUnavailable':
    'Certaines catégories ou certains tags sont introuvables ou archivés.',
  'resources.notFoundOrNotPublished':
    'Ressource {{id}} introuvable ou non publiée.',
  'cms.statisticsLoadFailed': 'Impossible de charger les statistiques.',
  'cms.statisticCreateFailed': 'Impossible de créer la statistique.',
  'cms.partnersLoadFailed': 'Impossible de charger les partenaires.',
  'cms.partnerCreateFailed': 'Impossible de créer le partenaire.',
  'cms.testimonialsLoadFailed': 'Impossible de charger les témoignages.',
  'cms.testimonialCreateFailed': 'Impossible de créer le témoignage.',
  'cms.teamMembersLoadFailed': "Impossible de charger les membres d'équipe.",
  'cms.teamMemberCreateFailed': "Impossible de créer le membre d'équipe.",
  'curriculum.coursesLoadFailed': 'Impossible de charger les cours.',
  'curriculum.courseCreateFailed': 'Impossible de créer le cours.',
  'curriculum.modulesLoadFailed': 'Impossible de charger les modules.',
  'curriculum.moduleCreateFailed': 'Impossible de créer le module.',
  'curriculum.chaptersLoadFailed': 'Impossible de charger les chapitres.',
  'curriculum.chapterCreateFailed': 'Impossible de créer le chapitre.',
  'curriculum.lessonsLoadFailed': 'Impossible de charger les leçons.',
  'curriculum.lessonCreateFailed': 'Impossible de créer la leçon.',
  'curriculum.programCoursesLoadFailed':
    'Impossible de charger les cours du programme.',
  'curriculum.programCourseAddFailed':
    'Impossible d’ajouter le cours au programme.',
  'curriculum.courseModulesLoadFailed':
    'Impossible de charger les modules du cours.',
  'curriculum.courseModuleAddFailed':
    'Impossible d’ajouter le module au cours.',
  'curriculum.chapterLessonsLoadFailed':
    'Impossible de charger les leçons du chapitre.',
  'curriculum.chapterLessonAddFailed':
    'Impossible d’ajouter la leçon au chapitre.',
  'curriculum.programCurriculumLoadFailed':
    'Impossible de charger le curriculum du programme.',
  'programs.detailLoadFailed': 'Impossible de charger le programme demandé.',
  'programs.progressLoadFailed':
    'Impossible de charger la progression des programmes.',
  'programs.listLoadFailed': 'Impossible de charger la liste des programmes.',
  'programs.createFailed': 'Impossible de créer le programme.',
  'programs.featuresLoadFailed':
    'Impossible de charger les fonctionnalités du programme.',
  'programs.featureCreateFailed':
    'Impossible de créer la fonctionnalité du programme.',
  'programs.currentParticipantLoadFailed':
    'Impossible de charger le participant courant.',
  'programs.sessionsLoadFailed':
    'Impossible de charger les sessions du programme.',
  'programs.announcementsLoadFailed':
    'Impossible de charger les annonces du programme.',
  'programs.progressUpdateFailed':
    'Impossible de mettre à jour la progression du programme.',
  'programs.resourcesLoadFailed':
    'Impossible de charger les ressources du programme.',
  'dashboard.currentParticipantLoadFailed':
    'Impossible de charger le participant courant.',
  'dashboard.programsLoadFailed':
    'Impossible de charger les programmes du dashboard.',
  'dashboard.upcomingSessionsLoadFailed':
    'Impossible de charger les sessions à venir du dashboard.',
  'dashboard.announcementsLoadFailed':
    'Impossible de charger les annonces du dashboard.',
  'services.listLoadFailed': 'Impossible de charger la liste des services.',
  'services.detailsLoadFailed': 'Impossible de charger les détails du service.',
  'services.createFailed': 'Impossible de créer le service.',
  'services.detailCreateFailed': 'Impossible de créer le détail du service.',
  'announcements.scopeFieldForbiddenForAudience':
    'Le champ {{field}} doit être absent lorsque audienceType vaut {{audienceType}}.',
  'announcements.scopeFieldRequiredForAudience':
    'Le champ {{field}} est requis lorsque audienceType vaut {{audienceType}}.',
  'announcements.audienceRequiredWhenScoped':
    'Le champ audienceType est requis lorsque programId ou cohortId sont fournis.',
  'announcements.createFailed': 'Impossible de créer l’annonce.',
  'resources.loadFailed': 'Impossible de charger les ressources.',
  'resources.createFailed': 'Impossible de créer la ressource.',
  'support.nameRequired': 'Le nom est requis.',
  'support.nameTooShort': 'Le nom doit contenir au moins 2 caractères.',
  'support.nameTooLong': 'Le nom ne peut pas dépasser 80 caractères.',
  'support.subjectRequired': "L'objet est requis.",
  'support.subjectTooShort': "L'objet doit contenir au moins 3 caractères.",
  'support.subjectTooLong': "L'objet ne peut pas dépasser 120 caractères.",
  'support.messageRequired': 'Le message est requis.',
  'support.messageTooShort': 'Le message doit contenir au moins 10 caractères.',
  'support.messageTooLong': 'Le message ne peut pas dépasser 2000 caractères.',
  'support.categoryInvalid': 'La catégorie de support est invalide.',
  'support.statusInvalid': 'Le statut de la demande de support est invalide.',
  'support.requestsLoadFailed':
    'Impossible de charger les demandes de support.',
  'support.statusChangeForbidden':
    "Vous ne pouvez pas modifier le statut d'une demande de support.",
  'support.requestReadFailed': 'Impossible de lire la demande de support.',
  'support.statusUpdateFailed':
    'Impossible de mettre à jour le statut de la demande.',
  'support.markReadFailed': 'Impossible de marquer la demande comme lue.',
  'support.trackingUnavailable':
    'Votre demande a été reçue mais son suivi est indisponible pour le moment.',
  'support.currentUserProfileResolveFailed':
    'Impossible de résoudre le profil utilisateur courant.',
  'support.participantResolveFailed':
    'Impossible de résoudre le participant associé.',
  'support.contactNotificationFailed':
    "Le formulaire est temporairement indisponible. Veuillez utiliser l'e-mail direct ou WhatsApp indiqué sur la page contact.",
  'support.invalidStatusTransition':
    'Transition de statut invalide: {{fromStatus}} -> {{toStatus}}.',
  'users.listLoadFailed': 'Impossible de récupérer la liste des utilisateurs',
  'users.loadFailed': "Impossible de récupérer l'utilisateur",
  'users.updateFailed': "Impossible de mettre à jour l'utilisateur",
  'users.deleteFailed': "Impossible de supprimer l'utilisateur",
  'users.inviteRateLimited':
    "Trop d'invitations ont été envoyées récemment. Réessayez dans quelques minutes.",
  'users.inviteSendFailed': "Impossible d'envoyer l'invitation",
  'users.profileCreateFailed': 'Impossible de créer le profil utilisateur',
  'auth.signUpAccountExists': 'Un compte existe déjà pour cette adresse email.',
  'auth.signUpPasswordRequirements':
    'Le mot de passe ne respecte pas les exigences minimales.',
  'auth.signUpEmailInvalid': "L'adresse email fournie est invalide.",
  'auth.signUpRateLimited':
    "Le service d'inscription est temporairement indisponible. Réessayez plus tard.",
  'auth.signUpFailed': 'Impossible de créer le compte avec ces informations.',
  'auth.invalidCredentials': 'Email ou mot de passe invalide.',
  'auth.passwordResetRateLimited':
    'Trop de demandes de réinitialisation ont été envoyées récemment. Réessayez dans quelques minutes.',
  'auth.passwordResetSendFailed':
    "Impossible d'envoyer l'email de réinitialisation.",
  'auth.userProfileProvisionFailed':
    "Le profil utilisateur n'a pas pu être provisionné.",
  'auth.userProfileLoadFailed': "Le profil utilisateur n'a pas pu être chargé.",
  'auth.participantProfileLoadFailed':
    "Le profil participant n'a pas pu être chargé.",
  'articles.publishedLoadFailed': 'Impossible de charger les articles publiés.',
  'articles.requestedLoadFailed': "Impossible de charger l'article demandé.",
  'articles.listLoadFailed': 'Impossible de charger les articles.',
  'articles.createFailed': "Impossible de créer l'article.",
  'articles.updateFailed': "Impossible de mettre à jour l'article.",
  'articles.deleteFailed': "Impossible de supprimer l'article.",
  'articles.archiveFailed': "Impossible d'archiver l'article.",
  'articles.publishFailed': "Impossible de publier l'article.",
  'articles.tagDescriptionForbidden':
    'Le champ description n’est pas autorisé pour un tag.',
  'articles.coverImageRequired': 'Le fichier image est requis.',
  'articles.coverImageTypeInvalid': 'Le fichier doit être une image.',
  'articles.coverImageTooLarge':
    "L'image de couverture dépasse la limite de 5MB.",
  'articles.coverImageUploadFailed':
    "Impossible d'envoyer l'image de couverture.",
  'articles.categoriesLoadFailed': 'Impossible de charger les catégories.',
  'articles.categoryCreateFailed': 'Impossible de créer la catégorie.',
  'articles.categoryUpdateFailed': 'Impossible de mettre à jour la catégorie.',
  'articles.categoryArchiveFailed': 'Impossible d’archiver la catégorie.',
  'articles.tagsLoadFailed': 'Impossible de charger les tags.',
  'articles.tagCreateFailed': 'Impossible de créer le tag.',
  'articles.tagUpdateFailed': 'Impossible de mettre à jour le tag.',
  'articles.tagArchiveFailed': 'Impossible d’archiver le tag.',
  'articles.articleCategoriesUpdateFailed':
    "Impossible de mettre à jour les catégories de l'article.",
  'articles.articleTagsUpdateFailed':
    "Impossible de mettre à jour les tags de l'article.",
  'articles.relationsLoadFailed':
    'Impossible de charger les relations article.',
  'articles.categoriesAndTagsValidationFailed':
    'Impossible de valider les catégories et tags.',
  'auth.signUpConfirmationRequired':
    'Votre compte a été créé. Vérifiez votre email pour confirmer votre accès.',
  'auth.signUpReady': 'Votre compte est prêt. Vous êtes maintenant connecté.',
  'auth.passwordResetRequested':
    'Si cette adresse existe, un email de réinitialisation vient d’être envoyé.',
  'support.contactReceived':
    'Votre message a bien été reçu. Nous vous répondrons dans les plus brefs délais.',
  'support.contactReceivedWithEmailUnavailable':
    'Votre demande a bien été enregistrée. La notification e-mail est temporairement indisponible, mais le suivi interne reste ouvert.',
  'auth.bearerRequired': "Le header d'autorisation Bearer est requis.",
  'auth.sessionInvalid': 'Session invalide.',
  'auth.sessionInvalidOrExpired': 'La session est invalide ou expirée.',
  'auth.sessionNoLongerValid':
    'La session n’est plus valide. Veuillez vous reconnecter.',
  'auth.adminRequired': 'Accès admin requis.',
  'auth.employeeOrAdminRequired':
    'Accès réservé aux employés et administrateurs.',
  'auth.trainerOrAdminRequired':
    'Accès réservé aux formateurs et administrateurs.',
} as const;

export type ApiMessageKey = keyof typeof FRENCH_API_MESSAGES;

const ENGLISH_API_MESSAGES = {
  'validation.invalidPayload': 'Invalid payload.',
  'validation.nonEmptyArrayField':
    'The {{field}} field must contain at least one value.',
  'validation.updateRequiresField':
    'The update payload must contain at least one field.',
  'validation.invalidBody': 'Invalid request body.',
  'validation.requiredField': 'The {{field}} field is required.',
  'validation.invalidField': 'The {{field}} field is invalid.',
  'validation.invalidEmail': 'The email address is invalid.',
  'validation.integerField': 'The {{field}} field must be an integer.',
  'validation.nonNegativeIntegerField':
    'The {{field}} field must be a non-negative integer.',
  'validation.booleanField': 'The {{field}} field must be a boolean.',
  'validation.requiredValidUrlField':
    'The {{field}} field is required and must be a valid URL.',
  'auth.passwordTooShort': 'Password must contain at least 8 characters.',
  'auth.passwordTooLong': 'Password cannot exceed 128 characters.',
  'auth.firstNameRequired': 'First name is required.',
  'auth.lastNameRequired': 'Last name is required.',
  'auth.firstNameTooLong': 'First name cannot exceed {{maxLength}} characters.',
  'auth.lastNameTooLong': 'Last name cannot exceed {{maxLength}} characters.',
  'auth.redirectInvalid': 'The redirect URL is invalid.',
  'auth.refreshTokenRequired': 'The refresh token is required.',
  'users.invalidBody': 'The request body is missing or invalid.',
  'users.emailRequired': 'The email address is required.',
  'users.firstNameRequired': 'First name is required.',
  'users.lastNameRequired': 'Last name is required.',
  'users.firstNameInvalid': 'First name is invalid.',
  'users.lastNameInvalid': 'Last name is invalid.',
  'users.roleInvalid': 'Role must be one of the following: {{roles}}',
  'users.isActiveBoolean': 'Active status must be a boolean.',
  'articles.notFound': 'Article not found.',
  'articles.categoryNotFound': 'Category not found.',
  'articles.tagNotFound': 'Tag not found.',
  'programs.notFound': 'Program not found.',
  'programs.participantProgramNotFound':
    'Program not found for this participant.',
  'programs.featureNotFound': 'Program feature not found.',
  'programs.sessionNotFound': 'Session not found for this program.',
  'cms.statisticNotFound': 'Statistic not found.',
  'cms.partnerNotFound': 'Partner not found.',
  'cms.testimonialNotFound': 'Testimonial not found.',
  'cms.teamMemberNotFound': 'Team member not found.',
  'curriculum.courseNotFound': 'Course not found.',
  'curriculum.moduleNotFound': 'Module not found.',
  'curriculum.chapterNotFound': 'Chapter not found.',
  'curriculum.lessonNotFound': 'Lesson not found.',
  'curriculum.programCoursePlacementNotFound':
    'Program-course placement not found.',
  'curriculum.courseModulePlacementNotFound':
    'Course-module placement not found.',
  'curriculum.chapterLessonPlacementNotFound':
    'Chapter-lesson placement not found.',
  'announcements.notFound': 'Announcement not found.',
  'support.requestNotFound': 'Support request not found.',
  'services.notFound': 'Service not found.',
  'services.detailNotFound': 'Service detail not found.',
  'auth.userProfileNotFound': 'User profile not found.',
  'users.notFound': 'User not found: {{id}}',
  'announcements.notFoundOrNotPublished':
    'Announcement not found or not published.',
  'announcements.notFoundOrNotAccessible':
    'Announcement not found or not accessible.',
  'articles.categoriesOrTagsUnavailable':
    'Some categories or tags were not found or are archived.',
  'resources.notFoundOrNotPublished':
    'Resource with ID {{id}} not found or is not published.',
  'cms.statisticsLoadFailed': 'Unable to load statistics.',
  'cms.statisticCreateFailed': 'Unable to create the statistic.',
  'cms.partnersLoadFailed': 'Unable to load partners.',
  'cms.partnerCreateFailed': 'Unable to create the partner.',
  'cms.testimonialsLoadFailed': 'Unable to load testimonials.',
  'cms.testimonialCreateFailed': 'Unable to create the testimonial.',
  'cms.teamMembersLoadFailed': 'Unable to load team members.',
  'cms.teamMemberCreateFailed': 'Unable to create the team member.',
  'curriculum.coursesLoadFailed': 'Unable to load courses.',
  'curriculum.courseCreateFailed': 'Unable to create the course.',
  'curriculum.modulesLoadFailed': 'Unable to load modules.',
  'curriculum.moduleCreateFailed': 'Unable to create the module.',
  'curriculum.chaptersLoadFailed': 'Unable to load chapters.',
  'curriculum.chapterCreateFailed': 'Unable to create the chapter.',
  'curriculum.lessonsLoadFailed': 'Unable to load lessons.',
  'curriculum.lessonCreateFailed': 'Unable to create the lesson.',
  'curriculum.programCoursesLoadFailed': 'Unable to load the program courses.',
  'curriculum.programCourseAddFailed':
    'Unable to add the course to the program.',
  'curriculum.courseModulesLoadFailed': 'Unable to load the course modules.',
  'curriculum.courseModuleAddFailed': 'Unable to add the module to the course.',
  'curriculum.chapterLessonsLoadFailed': 'Unable to load the chapter lessons.',
  'curriculum.chapterLessonAddFailed':
    'Unable to add the lesson to the chapter.',
  'curriculum.programCurriculumLoadFailed':
    'Unable to load the program curriculum.',
  'programs.detailLoadFailed': 'Unable to load the requested program.',
  'programs.progressLoadFailed': 'Unable to load program progress.',
  'programs.listLoadFailed': 'Unable to load the program list.',
  'programs.createFailed': 'Unable to create the program.',
  'programs.featuresLoadFailed': 'Unable to load the program features.',
  'programs.featureCreateFailed': 'Unable to create the program feature.',
  'programs.currentParticipantLoadFailed':
    'Unable to load the current participant.',
  'programs.sessionsLoadFailed': 'Unable to load the program sessions.',
  'programs.announcementsLoadFailed':
    'Unable to load the program announcements.',
  'programs.progressUpdateFailed': 'Unable to update the program progress.',
  'programs.resourcesLoadFailed': 'Unable to load the program resources.',
  'dashboard.currentParticipantLoadFailed':
    'Unable to load the current participant.',
  'dashboard.programsLoadFailed': 'Unable to load the dashboard programs.',
  'dashboard.upcomingSessionsLoadFailed':
    'Unable to load the upcoming dashboard sessions.',
  'dashboard.announcementsLoadFailed':
    'Unable to load the dashboard announcements.',
  'services.listLoadFailed': 'Unable to load the service list.',
  'services.detailsLoadFailed': 'Unable to load the service details.',
  'services.createFailed': 'Unable to create the service.',
  'services.detailCreateFailed': 'Unable to create the service detail.',
  'announcements.scopeFieldForbiddenForAudience':
    'The {{field}} field must be omitted when audienceType is {{audienceType}}.',
  'announcements.scopeFieldRequiredForAudience':
    'The {{field}} field is required when audienceType is {{audienceType}}.',
  'announcements.audienceRequiredWhenScoped':
    'The audienceType field is required when programId or cohortId is provided.',
  'announcements.createFailed': 'Unable to create the announcement.',
  'resources.loadFailed': 'Unable to load resources.',
  'resources.createFailed': 'Unable to create the resource.',
  'support.nameRequired': 'Name is required.',
  'support.nameTooShort': 'Name must contain at least 2 characters.',
  'support.nameTooLong': 'Name cannot exceed 80 characters.',
  'support.subjectRequired': 'Subject is required.',
  'support.subjectTooShort': 'Subject must contain at least 3 characters.',
  'support.subjectTooLong': 'Subject cannot exceed 120 characters.',
  'support.messageRequired': 'Message is required.',
  'support.messageTooShort': 'Message must contain at least 10 characters.',
  'support.messageTooLong': 'Message cannot exceed 2000 characters.',
  'support.categoryInvalid': 'The support category is invalid.',
  'support.statusInvalid': 'The support request status is invalid.',
  'support.requestsLoadFailed': 'Unable to load support requests.',
  'support.statusChangeForbidden':
    'You cannot change the status of a support request.',
  'support.requestReadFailed': 'Unable to read the support request.',
  'support.statusUpdateFailed': 'Unable to update the request status.',
  'support.markReadFailed': 'Unable to mark the request as read.',
  'support.trackingUnavailable':
    'Your request was received, but tracking is currently unavailable.',
  'support.currentUserProfileResolveFailed':
    'Unable to resolve the current user profile.',
  'support.participantResolveFailed':
    'Unable to resolve the associated participant.',
  'support.contactNotificationFailed':
    'The form is temporarily unavailable. Please use the direct email address or WhatsApp listed on the contact page.',
  'support.invalidStatusTransition':
    'Invalid status transition: {{fromStatus}} -> {{toStatus}}.',
  'users.listLoadFailed': 'Unable to retrieve the user list',
  'users.loadFailed': 'Unable to retrieve the user',
  'users.updateFailed': 'Unable to update the user',
  'users.deleteFailed': 'Unable to delete the user',
  'users.inviteRateLimited':
    'Too many invitations were sent recently. Please try again in a few minutes.',
  'users.inviteSendFailed': 'Unable to send the invitation',
  'users.profileCreateFailed': 'Unable to create the user profile',
  'auth.signUpAccountExists':
    'An account already exists for this email address.',
  'auth.signUpPasswordRequirements':
    'The password does not meet the minimum requirements.',
  'auth.signUpEmailInvalid': 'The provided email address is invalid.',
  'auth.signUpRateLimited':
    'The sign-up service is temporarily unavailable. Please try again later.',
  'auth.signUpFailed': 'Unable to create the account with this information.',
  'auth.invalidCredentials': 'Invalid email or password.',
  'auth.passwordResetRateLimited':
    'Too many password reset requests were sent recently. Please try again in a few minutes.',
  'auth.passwordResetSendFailed': 'Unable to send the password reset email.',
  'auth.userProfileProvisionFailed':
    'The user profile could not be provisioned.',
  'auth.userProfileLoadFailed': 'The user profile could not be loaded.',
  'auth.participantProfileLoadFailed':
    'The participant profile could not be loaded.',
  'articles.publishedLoadFailed': 'Unable to load published articles.',
  'articles.requestedLoadFailed': 'Unable to load the requested article.',
  'articles.listLoadFailed': 'Unable to load articles.',
  'articles.createFailed': 'Unable to create the article.',
  'articles.updateFailed': 'Unable to update the article.',
  'articles.deleteFailed': 'Unable to delete the article.',
  'articles.archiveFailed': 'Unable to archive the article.',
  'articles.publishFailed': 'Unable to publish the article.',
  'articles.tagDescriptionForbidden':
    'The description field is not allowed for a tag.',
  'articles.coverImageRequired': 'The image file is required.',
  'articles.coverImageTypeInvalid': 'The file must be an image.',
  'articles.coverImageTooLarge': 'The cover image exceeds the 5 MB limit.',
  'articles.coverImageUploadFailed': 'Unable to upload the cover image.',
  'articles.categoriesLoadFailed': 'Unable to load categories.',
  'articles.categoryCreateFailed': 'Unable to create the category.',
  'articles.categoryUpdateFailed': 'Unable to update the category.',
  'articles.categoryArchiveFailed': 'Unable to archive the category.',
  'articles.tagsLoadFailed': 'Unable to load tags.',
  'articles.tagCreateFailed': 'Unable to create the tag.',
  'articles.tagUpdateFailed': 'Unable to update the tag.',
  'articles.tagArchiveFailed': 'Unable to archive the tag.',
  'articles.articleCategoriesUpdateFailed':
    'Unable to update the article categories.',
  'articles.articleTagsUpdateFailed': 'Unable to update the article tags.',
  'articles.relationsLoadFailed': 'Unable to load article relationships.',
  'articles.categoriesAndTagsValidationFailed':
    'Unable to validate categories and tags.',
  'auth.signUpConfirmationRequired':
    'Your account has been created. Check your email to confirm your access.',
  'auth.signUpReady': 'Your account is ready. You are now signed in.',
  'auth.passwordResetRequested':
    'If this address exists, a password reset email has just been sent.',
  'support.contactReceived':
    'Your message has been received. We will respond as soon as possible.',
  'support.contactReceivedWithEmailUnavailable':
    'Your request has been recorded. Email notification is temporarily unavailable, but internal tracking remains open.',
  'auth.bearerRequired': 'A Bearer authorization header is required.',
  'auth.sessionInvalid': 'Invalid session.',
  'auth.sessionInvalidOrExpired': 'The session is invalid or has expired.',
  'auth.sessionNoLongerValid':
    'The session is no longer valid. Please sign in again.',
  'auth.adminRequired': 'Administrator access is required.',
  'auth.employeeOrAdminRequired':
    'Access is restricted to employees and administrators.',
  'auth.trainerOrAdminRequired':
    'Access is restricted to trainers and administrators.',
} as const satisfies Record<ApiMessageKey, string>;

const API_MESSAGES: Record<
  SupportedLocale,
  Readonly<Record<ApiMessageKey, string>>
> = {
  'fr-CI': FRENCH_API_MESSAGES,
  'en-GB': ENGLISH_API_MESSAGES,
};

export interface ApiMessageDescriptor {
  readonly key: ApiMessageKey;
  readonly params?: Readonly<Record<string, string | number>>;
}

export type ApiMessageValue = string | ApiMessageDescriptor;

export function apiMessage(
  key: ApiMessageKey,
  params?: Readonly<Record<string, string | number>>,
): ApiMessageDescriptor {
  return params ? { key, params } : { key };
}

export function isApiMessageDescriptor(
  value: unknown,
): value is ApiMessageDescriptor {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  const key = (value as { key?: unknown }).key;

  return (
    typeof key === 'string' &&
    Object.prototype.hasOwnProperty.call(FRENCH_API_MESSAGES, key)
  );
}

export function translateApiMessage(
  locale: SupportedLocale,
  value: ApiMessageValue,
): string {
  if (typeof value === 'string') {
    return value;
  }

  const catalog = API_MESSAGES[locale] ?? API_MESSAGES[SOURCE_LOCALE];
  const template = catalog[value.key];

  return template.replace(
    /\{\{([a-zA-Z0-9_]+)\}\}/g,
    (placeholder, parameter: string) => {
      const replacement = value.params?.[parameter];
      return replacement === undefined ? placeholder : String(replacement);
    },
  );
}
