import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it, beforeEach, expect } from 'vitest';
import ResourceListPage from './resource-list.page';

describe('Mobile ResourceListPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceListPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ResourceListPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(ResourceListPage);
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title?.textContent).toContain('Ressources');
  });
});
