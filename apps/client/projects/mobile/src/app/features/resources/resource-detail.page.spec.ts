import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import ResourceDetailPage from './resource-detail.page';

describe('Mobile ResourceDetailPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceDetailPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ResourceDetailPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('Given the resources stack, when the detail renders, then it keeps the expected mobile title', () => {
    const fixture = TestBed.createComponent(ResourceDetailPage);
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title?.textContent).toContain('Détail de la ressource');
  });
});
