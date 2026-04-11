import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CtaBanner } from './cta-banner';

describe('CtaBanner', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaBanner],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render a PrimeNG card surface and CTA button', () => {
    const fixture = TestBed.createComponent(CtaBanner);
    fixture.componentRef.setInput('heading', 'Parlons de votre projet');
    fixture.componentRef.setInput(
      'body',
      'Nous pouvons cadrer le prochain pas ensemble.',
    );
    fixture.componentRef.setInput('ctaLabel', 'Nous contacter');
    fixture.componentRef.setInput('ctaLink', '/contact');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.p-card')).toBeTruthy();
    expect(element.querySelector('.p-button')).toBeTruthy();
  });
});
