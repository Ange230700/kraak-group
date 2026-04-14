import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import SupportPage from './support.page';
import { describe, it, beforeEach, expect } from 'vitest';

describe('Mobile SupportPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SupportPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(SupportPage);
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title?.textContent).toContain('Support');
  });
});
