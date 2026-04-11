import { TestBed } from '@angular/core/testing';
import AboutPage from './about.page';

describe('AboutPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPage],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AboutPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(AboutPage);
    fixture.detectChanges();
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading?.textContent).toContain('À propos de KRAAK');
  });
});
