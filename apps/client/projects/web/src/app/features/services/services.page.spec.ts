import { TestBed } from '@angular/core/testing';
import ServicesPage from './services.page';

describe('ServicesPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesPage],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ServicesPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(ServicesPage);
    fixture.detectChanges();
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading?.textContent).toContain('Nos services');
  });
});
