# Mobile MVP

## 1. Main Business Goal

The mobile MVP exists to keep KRAAK participants connected to their learning journey in a simple and reliable way.

Primary business goal:

- allow participants to authenticate securely
- give them direct access to their own training information
- deliver updates and resources in one place
- maintain an active link between participants and KRAAK

## 2. Primary Mobile Audience

MVP target users (priority order):

1. Enrolled participants
2. Prospective participants already engaged in a KRAAK process
3. Internal staff/admins only for strictly necessary MVP operations

Out of scope for MVP:

- broad public browsing app
- advanced admin back-office in mobile
- complex role matrix unless required for pilot

## 3. Top User Actions (Core Flows)

Participants must be able to:

1. Sign in
2. See their enrolled program(s)
3. View schedule and session information
4. Access training resources
5. Receive announcements/updates
6. Contact support, trainer, or KRAAK

## 4. Success Criteria (Pilot Readiness)

The mobile MVP is successful when:

- participant authentication works end-to-end
- each participant sees only relevant content (role/context scoped)
- app runs on Android first (iOS optional for same phase)
- basic announcements/notifications are available
- stability is sufficient for real pilot usage

## 5. MVP Scope Boundaries

In scope:

- participant account access
- read-first learning information and communication
- basic support/contact path

Not in scope for Phase 1:

- advanced payments/subscriptions
- full LMS progression engine
- heavy offline-first sync logic
- deep analytics dashboards in app

## 6. Product Decision Gate (End of Phase 1)

Move to next phase only if all are true:

- goal and audience are approved by stakeholders
- success criteria are measurable and accepted
- core user actions are frozen for implementation planning
- Android-first pilot path is confirmed

## 7. Phase 2 - Prioritized Feature Slice (Must/Should/Could)

This slice translates the Phase 1 outcome into an implementation-ready MVP scope.

### 7.1 MUST (Pilot-critical)

These features are required to start a real Android pilot.

1. Authentication and session

- Email/password sign in
- Secure session persistence
- Sign out
- Password reset (basic flow)
- Outcome mapping: participant can authenticate

2. Participant-scoped home

- Show only participant-relevant content after sign in
- Program card(s): enrolled program title, status, next key step
- Basic onboarding/welcome screen after first sign in
- Outcome mapping: participant sees only relevant content

3. Schedule and sessions

- Upcoming sessions list (date/time, title, location/link)
- Session detail page (description + trainer + join info)
- Outcome mapping: view schedule/sessions

4. Training resources (read/download)

- Resource list by program/module
- Open resource detail and access link/file
- Outcome mapping: access training resources

5. Announcements (basic)

- In-app announcements feed
- Unread/read marker (simple)
- Outcome mapping: basic notifications/announcements exist

6. Contact and support

- Contact action from app (email/WhatsApp/form deeplink)
- Support/trainer contact info visible
- Outcome mapping: stay connected to KRAAK

7. Android pilot readiness

- Android build signed and installable
- Crash-free baseline and basic performance checks
- Outcome mapping: app stable enough for real pilot use

### 7.2 SHOULD (High value, not launch-blocking)

These features improve pilot quality but are not mandatory for day-1 rollout.

1. Push notifications (announcements only)

- Receive push when new announcement is published
- Open app to relevant announcement item

2. Lightweight participant profile

- View/edit basic profile fields (name, phone, preferred contact)

3. Resource progress markers

- Mark resource as viewed/downloaded

4. Session reminders

- Local reminder 24h/1h before upcoming session

5. Basic in-app feedback

- Quick "Need help" or "Report issue" form

### 7.3 COULD (Post-pilot candidates)

These are valuable but intentionally deferred beyond MVP pilot.

1. iOS packaging and TestFlight distribution
2. Offline caching for selected resources
3. In-app messaging/chat with trainer
4. Advanced role-specific dashboards
5. Rich analytics views for participants

## 8. Mapping Matrix (Feature -> Phase 1 Success Criteria)

| Feature slice                  | Auth works | Relevant content only | Android first | Announcements exist | Pilot stability |
| ------------------------------ | ---------- | --------------------- | ------------- | ------------------- | --------------- |
| MUST - Authentication/session  | Yes        | Indirect              | Yes           | No                  | Yes             |
| MUST - Participant-scoped home | No         | Yes                   | Yes           | No                  | Yes             |
| MUST - Schedule/sessions       | No         | Yes                   | Yes           | No                  | Yes             |
| MUST - Resources               | No         | Yes                   | Yes           | No                  | Yes             |
| MUST - Announcements feed      | No         | Yes                   | Yes           | Yes                 | Yes             |
| MUST - Contact/support         | No         | Indirect              | Yes           | No                  | Yes             |
| SHOULD - Push announcements    | No         | Indirect              | Yes           | Yes                 | Indirect        |
| SHOULD - Session reminders     | No         | No                    | Yes           | Indirect            | Indirect        |

## 9. Delivery Recommendation (2 Sprints)

Sprint 1 (MUST foundation):

- Authentication/session
- Basic onboarding/welcome
- Participant-scoped home
- Schedule/sessions
- Contact/support

Sprint 2 (MUST completion + selective SHOULD):

- Resources
- Announcements feed
- Android pilot hardening
- Optional: push announcements if stable

Go/No-Go to pilot:

- All MUST stories accepted
- No P1 blocker open
- End-to-end participant flow validated on Android

## 10. MVP Scope Freeze (Before Design/Coding)

This section freezes the first release scope and defines what is prioritized now versus later.

### 10.1 Must-have (Release 1 locked)

- Participant authentication
- Basic onboarding / welcome
- Program/course list
- Session calendar or schedule
- Resource library
- Announcements / notices
- Contact/support
- Logout / session handling

### 10.2 Should-have (Not blocking Release 1)

- Participant profile
- Basic push notification readiness

### 10.3 Later (Out of MVP)

- Full LMS
- Live video classes inside app
- In-app payments
- Offline sync at scale
- Community/forum/chat
- Assignments grading engine
- Deep analytics dashboards for users
- Advanced certificates engine
- Multi-role admin panel inside mobile app
- Complex gamification

### 10.4 First Release Scope - Frozen

Release 1 is frozen to **Must-have** only.

Execution rules:
- Design and engineering start from Must-have features only.
- Should-have items can be pulled only if Must-have is complete and pilot stability is not at risk.
- Later items remain out of scope until a post-pilot decision.
