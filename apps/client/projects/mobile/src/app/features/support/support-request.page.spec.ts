import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import SupportRequestPage from './support-request.page';

describe('Mobile SupportRequestPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportRequestPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SupportRequestPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('Given the Support stack, when the request page renders, then it keeps the expected mobile header', () => {
    const fixture = TestBed.createComponent(SupportRequestPage);
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title?.textContent).toContain('Nouvelle demande');
  });
});
