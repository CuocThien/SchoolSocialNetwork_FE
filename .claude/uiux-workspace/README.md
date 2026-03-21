# UI/UX Improvement Workflow

This workspace contains the artifacts and results from the iterative UI/UX improvement process.

## Workflow Overview

The UI/UX improvement workflow uses three specialized agents working in a loop:

1. **User Reviewer Agent** - Captures screenshots and provides UX feedback
2. **Designer Agent** - Analyzes feedback and proposes design improvements
3. **Frontend Dev Agent** - Implements changes without breaking functionality

## Directory Structure

```
.claude/uiux-workspace/
├── [page-name]/
│   ├── iteration-1/
│   │   ├── screenshots/
│   │   │   ├── desktop-1920x1080.png
│   │   │   ├── tablet-768x1024.png
│   │   │   └── mobile-375x667.png
│   │   ├── ux-feedback.md
│   │   ├── design-recommendations.md
│   │   └── implementation-summary.md
│   ├── iteration-2/
│   └── ...
└── summary.md
```

## How to Use

### Starting a New Review

Invoke the `uiux-improvement-loop` skill and specify which page you want to review:

```
"Review the new feed page"
"Improve the UX of the login page"
"Check the profile page design"
```

### Manual Screenshot Capture

You can manually capture screenshots using:

```bash
yarn screenshot <url> <output-path>

# Examples:
yarn screenshot http://localhost:4200/home .claude/uiux-workspace/new-feed/iteration-1/screenshots/new-feed
yarn screenshot http://localhost:4200/login .claude/uiux-workspace/login/iteration-1/screenshots/login
```

### Viewing Results

Each iteration produces:
- **Screenshots** - Visual evidence at 3 viewport sizes
- **UX Feedback** - Detailed analysis of usability issues
- **Design Recommendations** - Specific code changes to implement
- **Implementation Summary** - What was actually changed

## Agent Instructions

### User Reviewer Agent
Located at: `.claude/agents/user-reviewer.md`

Responsible for:
- Starting the dev server
- Capturing screenshots at multiple viewports
- Providing detailed UX feedback

### Designer Agent
Located at: `.claude/agents/designer.md`

Responsible for:
- Analyzing UX feedback and screenshots
- Proposing specific design improvements
- Providing code-based solutions (HTML/SCSS)

### Frontend Dev Agent
Located at: `.claude/agents/frontend-dev.md`

Responsible for:
- Implementing design recommendations
- Preserving all business logic
- Ensuring responsive behavior

## Skill Configuration

The orchestrating skill is located at: `.claude/skills/uiux-improvement-loop.md`

It triggers when:
- You ask to improve UI/UX of a page
- You request design feedback
- You want to review page appearance
- You mention visual/design issues

## Quick Reference

| Command | Action |
|---------|--------|
| "List pages" | Show all available routes |
| "Capture [page]" | Take screenshots of specific page |
| "Continue" | Next iteration of improvements |
| "Satisfied" | End the workflow |
| "Focus on [issue]" | Direct attention to specific problem |

## Files Modified

The workflow typically modifies:
- `src/assets/sass/abstracts/_variables.scss` - Design system variables
- `src/assets/sass/pages/[page].scss` - Page-specific styles
- `src/app/[path]/component.html` - HTML structure
- `src/assets/sass/components/[component].scss` - Component styles

## Notes

- All changes are to the visual layer only
- Business logic is never modified
- Changes can be reverted via git
- The workflow stops after 3 iterations for review
- You can say "continue" to proceed further
