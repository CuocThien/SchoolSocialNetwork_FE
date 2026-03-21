# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

School Social Network Frontend - An Angular 12 social networking application for educational institutions. Features include posts, groups, chat, recruitment news, user management, and real-time communication via WebSocket.

## Common Commands

### Development
```bash
yarn start           # Start dev server (uses --openssl-legacy-provider)
yarn build           # Build for production (runs Angular build + gulp post-processing)
yarn watch           # Build in watch mode
yarn test            # Run tests with Karma/Jasmine
```

### Code Quality
```bash
yarn format          # Format code with Prettier
yarn lint:staged     # Run Prettier + ESLint on staged files (via Husky pre-commit)
```

### Build Pipeline
The build process uses Gulp for post-processing:
- Bundles and zips JavaScript files
- Zips SCSS files
- Outputs to `dist/SchoolSocialNetwork/`

## Architecture

### Module Structure
- **AppModule**: Root module with shared components (login, header, sidebar, footer) and popups
- **HomeModule**: Lazy-loaded module containing all authenticated pages under `/home/*`

### Key Directories
- `src/app/entities/`: TypeScript models for domain objects (post, group, user, message, etc.)
- `src/app/services/`: HTTP services for API communication (one per domain)
- `src/app/socket-event/`: Socket.io event constants (client/ and server/ message types)
- `src/app/home/`: Authenticated feature components
- `src/app/popup/`: Modal/popup components
- `src/app/utils/`: Constants including API host configuration

### Routing & Authentication
- All `/home/*` routes are protected by `AuthGuardService` (checks localStorage token)
- Root redirects to `/login`
- Home routes defined in `home-routing.module.ts`

### API Configuration
API base URL is configured in `src/app/utils/constant.ts`:
- `HOST` constant used by all services
- Currently points to `https://dev.social-network-be.cuocthien.io.vn`

### Real-time Communication
Socket.io is used for:
- Chat messaging
- Notifications
- Video chat (PeerJS integration)

Event constants defined in `socket-event/client/` and `socket-event/server/` directories.

### Internationalization
Uses `@ngx-translate` with locales in `src/assets/i18n/`:
- `en.json` - English
- `vi.json` - Vietnamese

### Legacy Build Flag
All Angular commands use `NODE_OPTIONS=--openssl-legacy-provider` for Node.js compatibility.

## Key Dependencies
- **UI**: Bootstrap 5, ng-bootstrap, FontAwesome
- **Forms**: Angular Reactive Forms, ng-select, CKEditor
- **Real-time**: socket.io-client, PeerJS (video chat)
- **Utilities**: lodash, moment, ngx-image-cropper, ngx-toastr
