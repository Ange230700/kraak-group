import { TestBed } from '@angular/core/testing';
import ContactPage from './contact.page';

describe('ContactPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPage],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(ContactPage);
    fixture.detectChanges();
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading?.textContent).toContain('Contact');
  });
});
