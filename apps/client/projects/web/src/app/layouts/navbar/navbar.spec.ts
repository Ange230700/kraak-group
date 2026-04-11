import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Navbar } from './navbar';

describe('Navbar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render PrimeNG buttons for key navigation actions', () => {
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const buttons = element.querySelectorAll('.p-button');

    expect(buttons.length).toBeGreaterThanOrEqual(2);
    expect(element.querySelector('button.p-button')).toBeTruthy();
    expect(element.textContent).toContain('Nous contacter');
  });
});
