import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import ProgramListPage from './program-list.page';
import { describe, it, beforeEach, expect } from 'vitest';

describe('Mobile ProgramListPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramListPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProgramListPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(ProgramListPage);
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title?.textContent).toContain('Programmes');
  });
});
