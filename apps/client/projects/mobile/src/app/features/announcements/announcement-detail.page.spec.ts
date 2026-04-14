import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import AnnouncementDetailPage from './announcement-detail.page';

describe('Mobile AnnouncementDetailPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementDetailPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AnnouncementDetailPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('Given the Annonces stack, when the detail renders, then it keeps the expected shell title', () => {
    const fixture = TestBed.createComponent(AnnouncementDetailPage);
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title?.textContent).toContain("Détail de l'annonce");
  });
});
