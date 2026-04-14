import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import SessionDetailPage from './session-detail.page';

describe('Mobile SessionDetailPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionDetailPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SessionDetailPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('Given the Programmes stack, when the session detail renders, then it keeps a dedicated mobile header', () => {
    const fixture = TestBed.createComponent(SessionDetailPage);
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title?.textContent).toContain('Détail de la session');
  });
});
