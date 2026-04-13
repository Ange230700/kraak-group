import { TestBed } from '@angular/core/testing';

import { FaqAccordion } from './faq-accordion';

describe('FaqAccordion', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqAccordion],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FaqAccordion);
    fixture.componentRef.setInput('items', []);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
