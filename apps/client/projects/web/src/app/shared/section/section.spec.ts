import { TestBed } from '@angular/core/testing';

import { Section } from './section';

describe('Section', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Section],
    }).compileComponents();
  });

  it('should render a section with a title', () => {
    const fixture = TestBed.createComponent(Section);
    fixture.componentRef.setInput('title', 'Nos services');
    fixture.componentRef.setInput('subtitle', 'Un accompagnement sur mesure.');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('section')).toBeTruthy();
    expect(element.querySelector('h2')?.textContent).toContain('Nos services');
  });
});
