# GitHub Project Setup & Management Guide

## 📊 GitHub Project #6: KRAAK MVP - Product Backlog

**URL**: https://github.com/users/Ange230700/projects/6

---

## ✅ Quick Setup Checklist

### Labels Configured ✓

- **Status Labels** (5): backlog, ready, in-progress, review, done
- **Priority Labels** (4): critical, high, medium, low
- **Type Labels** (4): epic, feature, bug, chore

### Milestones Created ✓

1. Scope locked (#1)
2. Design approved (#2)
3. Content ready (#3)
4. Development complete (#4)
5. QA complete (#5)
6. Launch (#6)

### Issues Created ✓

- **8 Epics** (GitHub Issues #1-8)
- **30 Tasks** (GitHub Issues #9-38)
- **Total**: 38 issues properly labeled and organized

---

## 🎯 How to Use the Project Board

### Creating New Issues

```bash
# Create a new feature issue
gh issue create \
  --title "[Epic Name] Feature description" \
  --body "Feature details and acceptance criteria" \
  --label "type: feature,priority: high,status: backlog" \
  --milestone "Development complete"
```

### Adding Issues to Project

Issues are automatically added when created. To manually add existing issues:

```bash
# Get issue node_id
gh api repos/Ange230700/kraak-group/issues/42 --jq .node_id -q

# Add to project
gh project item-add 6 --owner Ange230700 --id <node_id>
```

### Updating Issue Status

**Option 1: Using labels** (via GitHub CLI)

```bash
gh issue edit 42 --add-label "status: in-progress" --remove-label "status: backlog"
```

**Option 2: Using GitHub Web UI**

- Click issue → Add label or change label

### Workflow States

```
│
├─ Backlog (new work, not started)
│  └─ When: Issue created or task not ready
│  └─ Action: Label with "status: backlog"
│
├─ Ready (dependencies met, assigned)
│  └─ When: All blockers cleared, designer assigned
│  └─ Action: Move to "status: ready"
│
├─ In Progress (actively being worked)
│  └─ When: Work started, branch created
│  └─ Action: Move to "status: in-progress"
│
├─ Review (awaiting approval)
│  └─ When: PR created or review needed
│  └─ Action: Move to "status: review"
│
└─ Done (merged and verified)
   └─ When: PR merged, verified, tested
   └─ Action: Move to "status: done" & close issue
```

---

## 📋 Epic Reference Card

| Epic           | Issues | Priority | Milestone       | Owner              |
| -------------- | ------ | -------- | --------------- | ------------------ |
| Content        | #9-11  | Critical | Content ready   | Content Lead       |
| Design         | #12-14 | Critical | Design approved | Design Lead        |
| Frontend Setup | #15-19 | Critical | Dev complete    | Frontend Lead      |
| Pages          | #20-24 | Critical | Dev complete    | Frontend Team      |
| Forms          | #25-27 | Critical | Dev complete    | Backend + Frontend |
| SEO            | #28-31 | High     | Dev complete    | Frontend + DevOps  |
| QA             | #32-34 | High     | QA complete     | QA Team            |
| Deployment     | #35-38 | High     | Launch          | DevOps             |

---

## 📊 Kanban Board Organization

### Columns Setup

The GitHub Project should have these columns (can be customized):

1. **Backlog** - Not started, blocked, or waiting
2. **Ready** - Dependencies cleared, ready to start
3. **In Progress** - Actively being worked on
4. **Review** - Awaiting approval, testing, or merge
5. **Done** - Completed and shipped

### Card Automation

- Cards automatically created from issues
- Move cards between columns to update status
- Use labels to track phase where card sits

---

## 🔧 Common Commands

### View Project Issues

```bash
# List all open issues
gh issue list --state open

# List by milestone
gh issue list --milestone "Development complete"

# List by label
gh issue list --label "type: epic,status: backlog"
```

### Update Issues in Bulk

```bash
# Close all done issues (if needed)
gh issue close 9 10 11 # Issue numbers

# Add milestone to multiple issues
for i in {20..24}; do gh issue edit $i --milestone "Development complete"; done
```

### View Project Details

```bash
# Get project info
gh api users/Ange230700/projects/6
```

---

## 📈 Tracking Progress

### Weekly Review Template

```markdown
## Week X Progress

### Completed (Status: Done)

- [ ] Issue #X - Description
- [ ] Issue #Y - Description

### In Progress (Status: In Progress)

- [ ] Issue #A - Description: 50% complete
- [ ] Issue #B - Description: blocked by #X

### Blocked/Issues

- [ ] Issue #Z - Blocked because...

### Next Week Focus

- [ ] Issue #N - High priority
- [ ] Issue #M - High priority

### Metrics

- Issues completed: X
- Critical blockers: Y
- On track: Yes/No
```

---

## 🚨 Monitoring & Alerts

### Track Critical Path

Focus on these epic chains:

1. **Content Ready → Design Approved**
   - #9, #10, #11 → #12, #13, #14
   - If blocker: delay all downstream work

2. **Frontend Setup → Page Implementation**
   - #15-19 → #20-24
   - If blocker: no frontend work can proceed

3. **Forms + Pages → SEO → QA → Deploy**
   - #25-27 + #20-24 → #28-31 → #32-34 → #35-38

### Health Check Questions

- [ ] Are all Critical priority items on track?
- [ ] Are there any blockers older than 1 day?
- [ ] Is the critical path (setup → design → pages) progressing?
- [ ] Do we need to escalate any issues?

---

## 🎓 Team Guidelines

### When Creating Issues

1. ✅ Use clear, actionable titles: `[Epic] Specific action`
2. ✅ Include acceptance criteria in body
3. ✅ Assign correct labels (type, priority, status)
4. ✅ Assign to milestone (which phase)
5. ✅ Link to related issues if dependent

### When Working on Issues

1. ✅ Move to "In Progress" when starting work
2. ✅ Create feature branch from issue
3. ✅ Update status in comments or labels
4. ✅ Link PR to issue (fixes #X)
5. ✅ Move to "Review" when PR created

### When Closing Issues

1. ✅ Verify all AC met
2. ✅ PR merged to main
3. ✅ Change status to "Done"
4. ✅ Close issue (auto-closes via PR)
5. ✅ Card moves to Done column

---

## 📱 Mobile/Responsive Project View

### GitHub Project Views

- **List view**: Better for bulk operations
- **Table view**: Better for filtering and sorting
- **Board view**: Better for visual kanban workflow

Recommend using **Board view** for daily standup and status checks.

---

## ⚡ Default Board-View Recipe (2 Minutes)

Apply these 3 saved views in GitHub Project UI for a fast, disciplined workflow.

### View 1: Status Kanban (daily execution)

1. Open Project #6 → **+ New view** → **Board**.
2. Name: `Status Kanban`.
3. Group by: `Status`.
4. Columns order: `Todo`, `In Progress`, `Done`.
5. Show fields on cards: `Priority`, `Milestone`, `Area`, `Launch blocker`.
6. Filter: `is:open`.
7. Save view.

Use for standups and immediate work tracking.

### View 2: Milestone Table (planning and sequencing)

1. **+ New view** → **Table**.
2. Name: `Milestone Table`.
3. Group by: `Milestone`.
4. Visible columns:
   - `Title`
   - `Status`
   - `Priority`
   - `Effort`
   - `Area`
   - `Launch blocker`
   - `Assignees`
5. Sort by:
   - `Priority` (critical → low)
   - then `Effort` (high → low)
6. Filter: `is:open`.
7. Save view.

Use for sprint planning and milestone readiness reviews.

### View 3: Launch Blockers (risk radar)

1. **+ New view** → **Table** (or Board if preferred).
2. Name: `Launch Blockers`.
3. Filter:
   - `is:open`
   - `Launch blocker` = `Yes`
4. Group by: `Milestone` (recommended) or `Status`.
5. Sort by:
   - `Priority` (critical first)
   - then `Status`.
6. Save view.

Use for go/no-go decisions before launch.

### Optional Light Automation (recommended)

- Keep issue labels and project `Status` aligned:
  - `status: backlog` -> `Todo`
  - `status: ready` -> `Todo`
  - `status: in-progress` -> `In Progress`
  - `status: review` -> `In Progress`
  - `status: done` -> `Done`
- Keep `Priority` field synced from labels (`priority: critical|high|medium|low`).
- Mark `Launch blocker = Yes` for `priority: critical` items tied to `Launch` milestone.

---

## 🔐 Project Access

**Repository Owner**: Ange230700  
**Repository**: kraak-group  
**Project**: #6 (KRAAK MVP - Product Backlog)  
**Visibility**: Private (update if needed)

### Invite Team Members

```bash
# Add collaborator to repo
gh repo add-collaborator Ange230700/kraak-group <username> --permission triage
```

---

## ❓ FAQ

**Q: How do I move an issue between milestones?**  
A: `gh issue edit <number> --milestone "<new milestone>"`

**Q: Can I create sub-tasks?**  
A: GitHub doesn't support sub-tasks natively. Create related issues and link them with references (#X depends on #Y).

**Q: How do I see issue dependencies?**  
A: In issue body, use "Depends on #X" or "Blocks #Y" to create references.

**Q: When should I close an issue?**  
A: Close when PR is merged, all AC verified, and code is in main branch.

**Q: Can I use the project to auto-close issues?**  
A: Yes, if PR says "fixes #42", issue auto-closes when PR merges.

---

## 📞 Support

Need help? Check:

- [GitHub Project Docs](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GitHub Issues Docs](https://docs.github.com/en/issues)
- [GitHub CLI Reference](https://cli.github.com/manual/)

**Last Updated**: April 8, 2026
