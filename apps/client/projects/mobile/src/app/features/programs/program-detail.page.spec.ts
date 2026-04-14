import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it, beforeEach, expect } from 'vitest';
import ProgramDetailPage from './program-detail.page';

describe('Mobile ProgramDetailPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramDetailPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProgramDetailPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(ProgramDetailPage);
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title?.textContent).toContain('Détail du programme');
  });
});
