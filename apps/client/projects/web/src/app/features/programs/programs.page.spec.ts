import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import ProgramsPage from './programs.page';

describe('ProgramsPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramsPage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProgramsPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(ProgramsPage);
    fixture.detectChanges();
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading?.textContent).toContain('Nos programmes');
  });
});
