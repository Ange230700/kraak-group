import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import WelcomePage from './welcome.page';

describe('Mobile WelcomePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(WelcomePage);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
