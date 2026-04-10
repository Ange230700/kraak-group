import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import ProgramDetailPage from './program-detail.page';

describe('Mobile ProgramDetailPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramDetailPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProgramDetailPage);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
