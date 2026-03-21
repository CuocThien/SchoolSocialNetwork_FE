---
name: uiux-improvement-loop
description: Iterative UI/UX improvement workflow. Captures screenshots, analyzes user experience, proposes design improvements, and implements code changes in a loop until satisfied. Use this when the user wants to improve the design, appearance, or user experience of any page or component in the application. Triggered by phrases like "improve the UI", "review this page", "make it look better", "UX feedback", "design review", or when asking about visual/design issues with specific pages.
---

# UI/UX Improvement Loop

An iterative workflow to continuously improve the user interface and user experience of application pages through screenshot analysis, design recommendations, and code implementation.

## How It Works

This skill orchestrates three specialized agents in a continuous loop:

1. **User Reviewer Agent** - Captures screenshots using Playwright and provides UX feedback
2. **Designer Agent** - Analyzes feedback and provides specific design/code improvements
3. **Frontend Dev Agent** - Implements the changes without breaking business logic

The loop continues until you're satisfied with the results.

## When to Use This Skill

Use this workflow when:
- You want to improve the visual design of a page
- You need UX feedback on an existing interface
- You're unsure what design improvements to make
- You want a professional review before deployment
- You've received user complaints about usability
- A page looks "off" but you can't pinpoint why

## Starting the Workflow

### Step 1: Choose a Page

First, you'll need to specify which page to review. The workflow can:

1. **List all available pages** - Shows all routes in the application
2. **Capture a specific page** - You provide the URL/route
3. **Review multiple pages** - Queue up several pages for review

### Step 2: Initial Capture

The User Reviewer agent will:
- Start the dev server (if not running)
- Use Playwright to capture screenshots at 3 viewports:
  - Desktop (1920x1080)
  - Tablet (768x1024)
  - Mobile (375x667)
- Provide detailed UX feedback

### Step 3: Design Analysis

The Designer agent will:
- Review the screenshots and feedback
- Identify specific issues (colors, spacing, typography, etc.)
- Provide code-based solutions (HTML/SCSS)
- Prioritize changes by impact

### Step 4: Implementation

The Frontend Dev agent will:
- Implement the designer's recommendations
- Modify only visual/presentation layer
- Preserve all business logic and functionality
- Ensure responsive behavior

### Step 5: Review and Iterate

After implementation:
- View the changes in your browser
- Decide if you're satisfied
- If not satisfied, the loop continues from Step 2 with a new capture

## User Commands

During the workflow, you can use these commands:

- **"Show me the list of pages"** - Display all available routes
- **"Capture [page name]"** - Capture screenshots of a specific page
- **"I'm satisfied"** or **"Looks good"** - End the loop
- **"Keep going"** or **"More improvements"** - Continue iterating
- **"Focus on [specific issue]"** - Direct attention to a particular problem
- **"Show me before/after"** - Compare original vs. current state

## What You'll Get

### From User Reviewer
- Screenshots at 3 viewport sizes
- Detailed UX analysis covering:
  - Visual design issues
  - Usability problems
  - Accessibility concerns
  - Responsive design issues
  - Specific actionable feedback

### From Designer
- Design system updates (if needed)
- Component-specific changes
- HTML structure changes
- SCSS/CSS code changes
- Before/after comparisons
- Implementation priority list

### From Frontend Dev
- Implemented code changes
- List of modified files
- Responsive behavior documentation
- Verification that functionality is preserved

## File Structure

The workflow creates this structure:

```
.claude/
├── uiux-workspace/
│   ├── [page-name]/
│   │   ├── iteration-1/
│   │   │   ├── screenshots/
│   │   │   │   ├── desktop-1920x1080.png
│   │   │   │   ├── tablet-768x1024.png
│   │   │   │   └── mobile-375x667.png
│   │   │   ├── ux-feedback.md
│   │   │   ├── design-recommendations.md
│   │   │   └── implementation-summary.md
│   │   ├── iteration-2/
│   │   └── ...
│   └── summary.md
└── ...
```

## Important Notes

### Playwright Setup

On first run, Playwright will be installed:
```bash
yarn add -D @playwright/test
npx playwright install chromium
```

### Dev Server

The workflow will start the Angular dev server on port 4200:
```bash
yarn start
```

If it's already running, the workflow will use the existing instance.

### Safety

- All changes are to the visual layer only
- Business logic is never modified
- Git can track all changes for easy rollback
- Original files are never overwritten without a Read first

### Iteration Limits

The workflow will automatically pause after 3 iterations to:
- Prevent infinite loops
- Allow you to provide fresh direction
- Reassess priorities

Say "continue" to proceed with more iterations.

## Output Example

```
Starting UI/UX Improvement Loop...

=== Iteration 1 ===

[USER REVIEWER]
✓ Captured screenshots for /home/new-feed
✓ Generated UX feedback

[DESIGNER]
✓ Analyzed feedback
✓ Created design recommendations

[FRONTEND DEV]
✓ Implemented changes
Modified files:
  - src/assets/sass/pages/_home.scss
  - src/app/home/new-feed/new-feed.component.html

=== Review ===
Open http://localhost:4200/home/new-feed to see changes

Your feedback? (satisfied / continue / specific-issue)
```

## Quick Start

To begin, simply say:
- "Review the new feed page"
- "Improve the UX of the login page"
- "What does the profile page look like?"
- "Loop on improving the home page design"

The workflow will guide you through each step.
