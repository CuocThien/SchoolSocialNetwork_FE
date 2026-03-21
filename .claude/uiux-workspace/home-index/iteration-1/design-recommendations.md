# Design Recommendations - Home Index Page
## Implementation Guide for Modern Scholar Design System

---

## Overview

This document provides specific code implementations to redesign the home/index page according to the Modern Scholar Design System already established in the project.

---

## 1. SCSS Updates - Complete Redesign

### File: `src/assets/sass/pages/_index.scss`

Replace the entire file with this modern implementation:

```scss
// ========================================
// MODERN SCHOLAR - HOME INDEX PAGE
// Professional Academic Portal Design
// ========================================

.index-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  padding-bottom: $spacing-3xl;
  position: relative;
  z-index: 1;

  // Add subtle texture overlay
  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      radial-gradient(circle at 20% 30%, rgba(0, 191, 165, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(48, 63, 159, 0.02) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
}

// ========================================
// MAIN GROUP CARD
// ========================================

.main-group {
  background: $color-bg-pure;
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;
  border: 1px solid rgba($color-border, 0.8);
  padding: $spacing-2xl;
  margin: $spacing-2xl 0;
  transition: all 300ms ease-out;
  position: relative;
  z-index: 1;

  &:hover {
    box-shadow: $shadow-md;
  }

  // Add decorative top accent
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, $color-accent 0%, $color-primary 100%);
    border-radius: $radius-xl $radius-xl 0 0;
  }

  h2 {
    font-family: $font-heading;
    font-size: $font-2xl;
    font-weight: $font-bold;
    color: $color-text-primary;
    margin-bottom: $spacing-lg;
    display: flex;
    align-items: center;
    gap: $spacing-md;

    &::before {
      content: '';
      width: 4px;
      height: 28px;
      background: linear-gradient(180deg, $color-accent 0%, darken($color-accent, 12%) 100%);
      border-radius: $radius-pill;
    }
  }

  h3 {
    font-family: $font-heading;
    font-size: $font-xl;
    font-weight: $font-semibold;
    color: $color-text-primary;
    margin: $spacing-xl 0;
    padding-left: $spacing-lg;
  }

  h4 {
    font-family: $font-heading;
    font-size: $font-lg;
    font-weight: $font-semibold;
    color: $color-primary;
    margin-bottom: $spacing-md;
  }
}

// ========================================
// CATEGORY GRID LAYOUT
// ========================================

.student-categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-xl;
  margin-top: $spacing-xl;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
  }
}

.category-column {
  background: $color-bg-pure;
  border-radius: $radius-lg;
  border: 1px solid $color-border-light;
  overflow: hidden;
  transition: all 300ms ease-out;
  min-height: 500px;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: rgba($color-accent, 0.3);
    box-shadow: $shadow-sm;
  }

  &__header {
    background: linear-gradient(135deg, rgba($color-accent, 0.05) 0%, rgba($color-primary, 0.03) 100%);
    padding: $spacing-lg $spacing-xl;
    border-bottom: 1px solid $color-border-light;

    h4 {
      margin: 0;
      display: flex;
      align-items: center;
      gap: $spacing-sm;

      i {
        color: $color-accent;
        font-size: $font-lg;
      }
    }
  }

  &__content {
    padding: $spacing-md;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__pagination {
    padding: $spacing-md;
    border-top: 1px solid $color-border-light;
    background: $color-bg-warm;
  }
}

// ========================================
// POST CARD REDESIGN
// ========================================

.post {
  display: flex;
  gap: $spacing-md;
  padding: $spacing-lg;
  background: $color-bg-pure;
  border: 1px solid $color-border-light;
  border-radius: $radius-lg;
  cursor: pointer;
  transition: all 250ms ease-out;
  position: relative;
  overflow: hidden;

  // Add subtle accent on hover
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, $color-accent 0%, darken($color-accent, 12%) 100%);
    opacity: 0;
    transition: opacity 250ms ease-out;
  }

  &:hover {
    background: linear-gradient(135deg, rgba($color-accent, 0.02) 0%, rgba($color-primary, 0.01) 100%);
    border-color: rgba($color-accent, 0.3);
    transform: translateX(4px);
    box-shadow: $shadow-sm;

    &::before {
      opacity: 1;
    }

    .post__info-title h4 {
      color: $color-accent;
    }
  }

  &:active {
    transform: translateX(2px);
  }

  // Unread state indicator
  &--unread {
    border-left: 3px solid $color-accent;
  }

  // Read state
  &--read {
    opacity: 0.7;

    .post__info-title h4 {
      color: $color-text-secondary;
    }
  }

  &__auth {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }

  &__auth-avatar {
    position: relative;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid $color-bg-pure;
      box-shadow: $shadow-sm;
      transition: transform 250ms ease-out;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  &__auth-info {
    display: none;
    flex-direction: column;
    gap: $spacing-xs;

    @media (min-width: 768px) {
      display: flex;
    }

    &__id {
      font-family: $font-body;
      font-size: $font-xs;
      font-weight: $font-semibold;
      color: $color-text-muted;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    &__fullname {
      font-family: $font-heading;
      font-size: $font-base;
      font-weight: $font-semibold;
      color: $color-text-primary;
    }

    h6 {
      font-family: $font-body;
      font-size: $font-xs;
      color: $color-text-muted;
      margin: 0;
      font-weight: $font-normal;
    }
  }

  &__info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  &__info-title {
    h4 {
      font-family: $font-heading;
      font-size: $font-lg;
      font-weight: $font-semibold;
      color: $color-text-primary;
      line-height: $leading-tight;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      transition: color 250ms ease-out;
    }
  }

  // Mobile specific styles
  @media (max-width: 767px) {
    padding: $spacing-md;
    gap: $spacing-sm;

    &__auth-avatar img {
      width: 48px;
      height: 48px;
    }

    &__info-title h4 {
      font-size: $font-base;
    }
  }
}

// ========================================
// EMPTY STATE
// ========================================

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-4xl $spacing-xl;
  text-align: center;
  background: linear-gradient(135deg, rgba($color-accent, 0.03) 0%, rgba($color-primary, 0.02) 100%);
  border-radius: $radius-lg;
  border: 2px dashed rgba($color-accent, 0.2);
  min-height: 200px;

  h2 {
    font-family: $font-heading;
    font-size: $font-lg;
    font-weight: $font-semibold;
    color: $color-text-secondary;
    margin: 0;
  }

  i {
    font-size: $font-4xl;
    color: $color-accent;
    margin-bottom: $spacing-md;
    opacity: 0.5;
  }
}

// ========================================
// PAGINATION CUSTOM STYLING
// ========================================

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-md 0;

  ::ng-deep ul {
    display: flex;
    gap: $spacing-xs;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  ::ng-deep li {
    display: flex;
  }

  ::ng-deep .page-link {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    padding: $spacing-sm $spacing-md;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    background: $color-bg-pure;
    color: $color-text-primary;
    font-family: $font-body;
    font-size: $font-sm;
    font-weight: $font-medium;
    transition: all 200ms ease-out;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background: rgba($color-accent, 0.08);
      border-color: rgba($color-accent, 0.3);
      color: $color-accent;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba($color-accent, 0.3);
    }
  }

  ::ng-deep .page-item.active .page-link {
    background: linear-gradient(135deg, $color-accent 0%, darken($color-accent, 8%) 100%);
    border-color: $color-accent;
    color: $color-text-inverse;
    box-shadow: 0 4px 12px rgba($color-accent, 0.3);
  }

  ::ng-deep .page-item.disabled .page-link {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}

// ========================================
// FACULTY SELECT
// ========================================

.faculty-select {
  ::ng-deep .ng-select-container {
    border: 2px solid $color-border;
    border-radius: $radius-lg;
    background: $color-bg-pure;
    box-shadow: $shadow-xs;
    transition: all 200ms ease-out;

    &:hover {
      border-color: rgba($color-accent, 0.3);
    }

    &:focus-within {
      border-color: $color-accent;
      box-shadow: 0 0 0 4px rgba($color-accent, 0.1);
    }
  }

  ::ng-deep .ng-value-container {
    font-family: $font-body;
    font-size: $font-base;
    color: $color-text-primary;
  }

  ::ng-deep .ng-placeholder {
    color: $color-text-muted;
  }
}

// ========================================
// CREATE POST BUTTON
// ========================================

.btn-create-post {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  padding: $spacing-md $spacing-xl;
  background: linear-gradient(135deg, $color-accent 0%, darken($color-accent, 8%) 100%);
  border: none;
  border-radius: $radius-lg;
  color: $color-text-inverse;
  font-family: $font-body;
  font-size: $font-base;
  font-weight: $font-semibold;
  cursor: pointer;
  transition: all 250ms ease-out;
  box-shadow: 0 4px 12px rgba($color-accent, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba($color-accent, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  i {
    font-size: $font-lg;
  }

  // Mobile icon-only variant
  &--icon-only {
    padding: $spacing-md;
    width: 44px;
    height: 44px;

    span {
      display: none;
    }
  }
}

// ========================================
// RECRUITMENT NEWS CARDS
// ========================================

.recruiment-news-container {
  background: $color-bg-pure;
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;
  padding: $spacing-2xl;
  margin: $spacing-2xl 0;
}

.card-recruitment-news {
  display: flex;
  gap: $spacing-lg;
  padding: $spacing-lg;
  background: $color-bg-pure;
  border: 1px solid $color-border-light;
  border-radius: $radius-lg;
  transition: all 300ms ease-out;
  position: relative;
  overflow: hidden;
  height: auto;
  min-height: 180px;

  &:hover {
    border-color: rgba($color-accent, 0.3);
    box-shadow: $shadow-md;
    transform: translateY(-2px);
  }

  &__button-control {
    border: none;
    background: transparent;
    color: $color-text-secondary;
    font-size: $font-xl;
    cursor: pointer;
    padding: $spacing-sm;
    border-radius: $radius-md;
    transition: all 200ms ease-out;

    &:hover {
      background: rgba($color-accent, 0.08);
      color: $color-accent;
    }
  }

  &__poster {
    flex-shrink: 0;
    width: 200px;
    height: 160px;
    border-radius: $radius-md;
    overflow: hidden;
    background: $color-bg-warm;
    border: 1px solid $color-border-light;

    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 767px) {
      width: 120px;
      height: 100px;
    }
  }

  &__info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
    padding: 0;

    &-title {
      font-family: $font-heading;
      font-size: $font-xl;
      font-weight: $font-semibold;
      color: $color-text-primary;
      line-height: $leading-tight;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 0;
    }

    &-company,
    &-location,
    &-position {
      font-family: $font-body;
      font-size: $font-sm;
      color: $color-text-secondary;
      margin: 0;
      display: flex;
      align-items: center;
      gap: $spacing-xs;

      i {
        color: $color-accent;
        font-size: $font-xs;
      }
    }

    &-salary {
      font-family: $font-body;
      font-size: $font-sm;
      font-weight: $font-semibold;
      color: $color-success;
      margin: 0;
      display: flex;
      align-items: center;
      gap: $spacing-xs;

      i {
        font-size: $font-xs;
      }
    }

    &-experience {
      font-family: $font-body;
      font-size: $font-sm;
      color: $color-danger;
      margin: 0;
      display: flex;
      align-items: center;
      gap: $spacing-xs;

      i {
        font-size: $font-xs;
      }
    }
  }

  @media (max-width: 767px) {
    flex-direction: column;
    height: auto;

    &__info {
      width: 100%;
    }
  }
}

// ========================================
// RESPONSIVE ADJUSTMENTS
// ========================================

@media (max-width: 767px) {
  .index-container {
    padding-bottom: $spacing-2xl;
  }

  .main-group {
    padding: $spacing-lg;
    margin: $spacing-lg 0;
    border-radius: $radius-lg;

    h2 {
      font-size: $font-xl;

      &::before {
        height: 20px;
      }
    }

    h3 {
      font-size: $font-lg;
      padding-left: $spacing-md;
    }

    h4 {
      font-size: $font-base;
    }
  }

  .post {
    padding: $spacing-md;

    &__auth-avatar img {
      width: 44px;
      height: 44px;
    }
  }

  .category-column {
    min-height: 400px;
  }

  .recruiment-news-container {
    padding: $spacing-lg;
  }
}

// ========================================
// ACCESSIBILITY
// ========================================

@media (prefers-reduced-motion: reduce) {
  .post,
  .card-recruitment-news,
  .btn-create-post {
    transition: none;
  }
}

// Focus visible for keyboard navigation
.post:focus-visible,
.btn-create-post:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba($color-accent, 0.3);
}
```

---

## 2. HTML Structure Updates

### File: `src/app/home/index/index.component.html`

#### A. Update Main Group Section (Lines 5-280)

Replace the main group section with this improved structure:

```html
<div class="index-container">
  <ngx-spinner bdColor="rgba(0, 0, 0, 0.8)" size="large" color="#fff" type="ball-scale-multiple" [fullScreen]="true">
  </ngx-spinner>

  <div *ngIf="!isCompany">
    <!-- Main Group Notifications -->
    <section class="main-group" *ngIf="!isAlumni">
      <h2>{{'HOME.MAIN_NOTIFICATION' | translate}}</h2>

      <!-- Teacher Section -->
      <div *ngIf="isAdmin">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3>{{'HOME.TEACHER' | translate}}</h3>
          <button class="btn-create-post" (click)="createPost('grgv', true, false)">
            <i class="bi bi-pencil-square"></i>
            <span>{{'BUTTON.CREATE_POST' | translate}}</span>
          </button>
        </div>

        <div class="posts-list">
          <article class="post" *ngFor="let post of listMainTeacherPost"
            [ngClass]="post.isRead ? 'post--read' : 'post--unread'"
            (click)="goToDetailPost(post?._id); readPost(post.notifyId)"
            tabindex="0">
            <div class="post__auth">
              <div class="post__auth-avatar">
                <img [src]="post?.avatar" [alt]="post?.fullname">
              </div>
              <div class="post__auth-info">
                <span class="post__auth-info__id">{{post?.author}}</span>
                <span class="post__auth-info__fullname">{{post?.fullname}}</span>
                <h6>{{post?.createdDate | date: 'HH:mm'}} - {{post?.createdDate | date: 'dd/MM'}}</h6>
              </div>
            </div>
            <div class="post__info">
              <div class="post__info-title">
                <h4>{{post?.title}}</h4>
              </div>
            </div>
          </article>

          <div class="empty-state" *ngIf="!listMainTeacherPost?.length">
            <i class="bi bi-inbox"></i>
            <h2>{{'TITLE.NO_DATA' | translate}}</h2>
          </div>
        </div>

        <div class="pagination" *ngIf="listMainTeacherPost?.length">
          <ngb-pagination [collectionSize]="totalMainTeacher" [maxSize]="5" [pageSize]="1" [rotate]="true"
            (pageChange)="goToPage('mainTeacher', $event)" [(page)]="pageMainTeacher">
          </ngb-pagination>
        </div>
      </div>

      <!-- Student Categories Grid -->
      <div *ngIf="isAdmin || isStudent">
        <h3 class="mt-4">{{'HOME.STUDENT' | translate}}</h3>

        <div class="student-categories-grid">
          <!-- Common Category -->
          <div class="category-column">
            <div class="category-column__header">
              <h4><i class="bi bi-chat-left-quote"></i> {{isLangEn ? listCategory[3].nameEn : listCategory[3].nameVi}}</h4>
            </div>
            <div class="category-column__content">
              <article class="post" *ngFor="let post of listPostCommon"
                [ngClass]="post.isRead ? 'post--read' : 'post--unread'"
                (click)="goToDetailPost(post?._id); readPost(post.notifyId)"
                tabindex="0">
                <div class="post__auth">
                  <div class="post__auth-avatar">
                    <img [src]="post?.avatar" [alt]="post?.fullname">
                  </div>
                </div>
                <div class="post__info">
                  <div class="post__auth-info">
                    <span class="post__auth-info__id">{{post?.author}}</span>
                    <span class="post__auth-info__fullname">{{post?.fullname}}</span>
                  </div>
                  <div class="post__info-title">
                    <h4>{{post?.title}}</h4>
                  </div>
                </div>
              </article>

              <div class="empty-state" *ngIf="!listPostCommon?.length">
                <i class="bi bi-inbox"></i>
                <h2>{{'TITLE.NO_DATA' | translate}}</h2>
              </div>
            </div>
            <div class="category-column__pagination" *ngIf="listPostCommon?.length">
              <ngb-pagination [collectionSize]="maxPagePostCommon" [maxSize]="5" [pageSize]="1" [rotate]="true"
                (pageChange)="goToPageInPostCategory($event, '62711cb8442b05ae533b8e60')" [(page)]="pagePostCommon">
              </ngb-pagination>
            </div>
          </div>

          <!-- Study Category -->
          <div class="category-column">
            <div class="category-column__header">
              <h4><i class="bi bi-book"></i> {{isLangEn ? listCategory[0].nameEn : listCategory[0].nameVi}}</h4>
            </div>
            <div class="category-column__content">
              <article class="post" *ngFor="let post of listPostStudy"
                [ngClass]="post.isRead ? 'post--read' : 'post--unread'"
                (click)="goToDetailPost(post?._id); readPost(post.notifyId)"
                tabindex="0">
                <div class="post__auth">
                  <div class="post__auth-avatar">
                    <img [src]="post?.avatar" [alt]="post?.fullname">
                  </div>
                </div>
                <div class="post__info">
                  <div class="post__auth-info">
                    <span class="post__auth-info__id">{{post?.author}}</span>
                    <span class="post__auth-info__fullname">{{post?.fullname}}</span>
                  </div>
                  <div class="post__info-title">
                    <h4>{{post?.title}}</h4>
                  </div>
                </div>
              </article>

              <div class="empty-state" *ngIf="!listPostStudy?.length">
                <i class="bi bi-inbox"></i>
                <h2>{{'TITLE.NO_DATA' | translate}}</h2>
              </div>
            </div>
            <div class="category-column__pagination" *ngIf="listPostStudy?.length">
              <ngb-pagination [collectionSize]="maxPagePostStudy" [maxSize]="5" [pageSize]="1" [rotate]="true"
                (pageChange)="goToPageInPostCategory($event, '62711c4f442b05ae533b8b7a')" [(page)]="pagePostStudy">
              </ngb-pagination>
            </div>
          </div>

          <!-- Union Category -->
          <div class="category-column">
            <div class="category-column__header">
              <h4><i class="bi bi-people"></i> {{isLangEn ? listCategory[1].nameEn : listCategory[1].nameVi}}</h4>
            </div>
            <div class="category-column__content">
              <article class="post" *ngFor="let post of listPostUnion"
                [ngClass]="post.isRead ? 'post--read' : 'post--unread'"
                (click)="goToDetailPost(post?._id); readPost(post.notifyId)"
                tabindex="0">
                <div class="post__auth">
                  <div class="post__auth-avatar">
                    <img [src]="post?.avatar" [alt]="post?.fullname">
                  </div>
                </div>
                <div class="post__info">
                  <div class="post__auth-info">
                    <span class="post__auth-info__id">{{post?.author}}</span>
                    <span class="post__auth-info__fullname">{{post?.fullname}}</span>
                  </div>
                  <div class="post__info-title">
                    <h4>{{post?.title}}</h4>
                  </div>
                </div>
              </article>

              <div class="empty-state" *ngIf="!listPostUnion?.length">
                <i class="bi bi-inbox"></i>
                <h2>{{'TITLE.NO_DATA' | translate}}</h2>
              </div>
            </div>
            <div class="category-column__pagination" *ngIf="listPostUnion?.length">
              <ngb-pagination [collectionSize]="maxPagePostUnion" [maxSize]="5" [pageSize]="1" [rotate]="true"
                (pageChange)="goToPageInPostCategory($event, '62711c71442b05ae533b8c6d')" [(page)]="pagePostUnion">
              </ngb-pagination>
            </div>
          </div>

          <!-- English Category -->
          <div class="category-column">
            <div class="category-column__header">
              <h4><i class="bi bi-translate"></i> {{isLangEn ? listCategory[2].nameEn : listCategory[2].nameVi}}</h4>
            </div>
            <div class="category-column__content">
              <article class="post" *ngFor="let post of listPostEnglish"
                [ngClass]="post.isRead ? 'post--read' : 'post--unread'"
                (click)="goToDetailPost(post?._id); readPost(post.notifyId)"
                tabindex="0">
                <div class="post__auth">
                  <div class="post__auth-avatar">
                    <img [src]="post?.avatar" [alt]="post?.fullname">
                  </div>
                </div>
                <div class="post__info">
                  <div class="post__auth-info">
                    <span class="post__auth-info__id">{{post?.author}}</span>
                    <span class="post__auth-info__fullname">{{post?.fullname}}</span>
                  </div>
                  <div class="post__info-title">
                    <h4>{{post?.title}}</h4>
                  </div>
                </div>
              </article>

              <div class="empty-state" *ngIf="!listPostEnglish?.length">
                <i class="bi bi-inbox"></i>
                <h2>{{'TITLE.NO_DATA' | translate}}</h2>
              </div>
            </div>
            <div class="category-column__pagination" *ngIf="listPostEnglish?.length">
              <ngb-pagination [collectionSize]="maxPagePostEnglish" [maxSize]="5" [pageSize]="1" [rotate]="true"
                (pageChange)="goToPageInPostCategory($event, '62711c84442b05ae533b8cf1')" [(page)]="pagePostEnglish">
              </ngb-pagination>
            </div>
          </div>

          <!-- Tuition Category -->
          <div class="category-column">
            <div class="category-column__header">
              <h4><i class="bi bi-cash-coin"></i> {{isLangEn ? listCategory[4].nameEn : listCategory[4].nameVi}}</h4>
            </div>
            <div class="category-column__content">
              <article class="post" *ngFor="let post of listPostTuition"
                [ngClass]="post.isRead ? 'post--read' : 'post--unread'"
                (click)="goToDetailPost(post?._id); readPost(post.notifyId)"
                tabindex="0">
                <div class="post__auth">
                  <div class="post__auth-avatar">
                    <img [src]="post?.avatar" [alt]="post?.fullname">
                  </div>
                </div>
                <div class="post__info">
                  <div class="post__auth-info">
                    <span class="post__auth-info__id">{{post?.author}}</span>
                    <span class="post__auth-info__fullname">{{post?.fullname}}</span>
                  </div>
                  <div class="post__info-title">
                    <h4>{{post?.title}}</h4>
                  </div>
                </div>
              </article>

              <div class="empty-state" *ngIf="!listPostTuition?.length">
                <i class="bi bi-inbox"></i>
                <h2>{{'TITLE.NO_DATA' | translate}}</h2>
              </div>
            </div>
            <div class="category-column__pagination" *ngIf="listPostTuition?.length">
              <ngb-pagination [collectionSize]="maxPagePostTuition" [maxSize]="5" [pageSize]="1" [rotate]="true"
                (pageChange)="goToPageInPostCategory($event, '62711d2f442b05ae533b919d')" [(page)]="pagePostTuition">
              </ngb-pagination>
            </div>
          </div>

          <!-- Scholarship Category -->
          <div class="category-column">
            <div class="category-column__header">
              <h4><i class="bi bi-award"></i> {{isLangEn ? listCategory[5].nameEn : listCategory[5].nameVi}}</h4>
            </div>
            <div class="category-column__content">
              <article class="post" *ngFor="let post of listPostScholarship"
                [ngClass]="post.isRead ? 'post--read' : 'post--unread'"
                (click)="goToDetailPost(post?._id); readPost(post.notifyId)"
                tabindex="0">
                <div class="post__auth">
                  <div class="post__auth-avatar">
                    <img [src]="post?.avatar" [alt]="post?.fullname">
                  </div>
                </div>
                <div class="post__info">
                  <div class="post__auth-info">
                    <span class="post__auth-info__id">{{post?.author}}</span>
                    <span class="post__auth-info__fullname">{{post?.fullname}}</span>
                  </div>
                  <div class="post__info-title">
                    <h4>{{post?.title}}</h4>
                  </div>
                </div>
              </article>

              <div class="empty-state" *ngIf="!listPostScholarship?.length">
                <i class="bi bi-inbox"></i>
                <h2>{{'TITLE.NO_DATA' | translate}}</h2>
              </div>
            </div>
            <div class="category-column__pagination" *ngIf="listPostScholarship?.length">
              <ngb-pagination [collectionSize]="maxPagePostScholarship" [maxSize]="5" [pageSize]="1" [rotate]="true"
                (pageChange)="goToPageInPostCategory($event, '62712024442b05ae533ba622')" [(page)]="pagePostScholarship">
              </ngb-pagination>
            </div>
          </div>
        </div>
      </div>
    </section>
```

---

## Implementation Priority

### Phase 1: Foundation (Complete this first)
1. Replace `_index.scss` with the complete new styles
2. Update the main group section HTML structure
3. Test basic responsive behavior

### Phase 2: Enhanced Components
1. Update faculty section with new card design
2. Update recruitment news cards
3. Add proper empty states

### Phase 3: Polish
1. Verify accessibility features
2. Test keyboard navigation
3. Validate responsive behavior across all viewports

---

## Testing Checklist

After implementation, verify:

- [ ] Desktop view displays 2-column category grid properly
- [ ] Tablet view collapses to single column
- [ ] Mobile view maintains readable content
- [ ] Hover states work smoothly
- [ ] Keyboard navigation is functional
- [ ] Empty states display correctly
- [ ] Pagination styling is consistent
- [ ] Faculty dropdown integrates well visually

---

## Notes

- All color variables reference the existing Modern Scholar design system
- No new dependencies required
- Changes are purely visual/structural - no business logic affected
- Maintains existing Angular component bindings and event handlers
