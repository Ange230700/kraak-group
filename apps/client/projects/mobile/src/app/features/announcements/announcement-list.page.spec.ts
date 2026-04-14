import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';
import AnnouncementListPage from './announcement-list.page';

describe('Mobile AnnouncementListPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementListPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AnnouncementListPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(AnnouncementListPage);
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title?.textContent).toContain('Annonces');
  });
});
