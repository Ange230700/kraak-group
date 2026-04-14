import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import HomePage from './home.page';
import { describe, it, beforeEach, expect } from 'vitest';

describe('Mobile HomePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomePage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title?.textContent).toContain('Votre espace KRAAK');
  });

  it('should render a branded hero with action buttons and a quick link', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const brandImage = element.querySelector(
      'img[alt="Logo KRAAK Consulting"]',
    ) as HTMLImageElement | null;
    const actions = element.querySelectorAll('ion-button');

    expect(brandImage?.getAttribute('src')).toContain(
      'kraak_consulting_logo_192w.png',
    );
    expect(actions.length).toBe(2);
    expect(element.textContent).toContain('Voir les ressources utiles');
  });
});
