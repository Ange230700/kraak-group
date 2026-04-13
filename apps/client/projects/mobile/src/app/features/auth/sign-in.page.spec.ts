import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import SignInPage from './sign-in.page';
import { describe, it, beforeEach, expect } from 'vitest';

describe('Mobile SignInPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SignInPage);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
