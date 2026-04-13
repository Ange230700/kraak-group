import { TestBed } from '@angular/core/testing';

import { Testimonials } from './testimonials';

describe('Testimonials', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonials],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Testimonials);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
