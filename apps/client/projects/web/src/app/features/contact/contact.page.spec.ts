import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';

import ContactPage from './contact.page';
import {
  CONTACT_LEAD_GATEWAY,
  type ContactLeadGateway,
} from './contact-lead.gateway';

describe('ContactPage', () => {
  let queryParamMap$: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
  let submitCalls: Parameters<ContactLeadGateway['submit']>[];
  let gatewayResult$ = of({
    reference: 'KRAAK-2026-001',
    submittedAt: '2026-04-11T18:30:00.000Z',
  });
  let gateway: ContactLeadGateway;

  beforeEach(async () => {
    queryParamMap$ = new BehaviorSubject(convertToParamMap({}));
    submitCalls = [];
    gatewayResult$ = of({
      reference: 'KRAAK-2026-001',
      submittedAt: '2026-04-11T18:30:00.000Z',
    });
    gateway = {
      submit: (payload) => {
        submitCalls.push([payload]);
        return gatewayResult$;
      },
    };

    await TestBed.configureTestingModule({
      imports: [ContactPage],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: queryParamMap$.asObservable(),
          },
        },
        {
          provide: CONTACT_LEAD_GATEWAY,
          useValue: gateway,
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should prefill the service and intent from CTA query params', () => {
    queryParamMap$.next(
      convertToParamMap({
        service: 'training',
        intent: 'programApplication',
        source: 'programsPage',
      }),
    );

    const fixture = TestBed.createComponent(ContactPage);
    fixture.detectChanges();

    expect(fixture.componentInstance.contactForm.getRawValue()).toEqual(
      expect.objectContaining({
        service: 'training',
        intent: 'programApplication',
      }),
    );

    const element = fixture.nativeElement as HTMLElement;
    expect(
      element.querySelector('[data-testid="contact-context"]')?.textContent,
    ).toContain('Formation');
  });

  it('should prevent invalid submission and render validation feedback', () => {
    const fixture = TestBed.createComponent(ContactPage);
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;

    submitButton.click();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(submitCalls).toHaveLength(0);
    expect(element.textContent).toContain('Veuillez renseigner votre nom complet.');
    expect(element.textContent).toContain('Veuillez saisir une adresse e-mail valide.');
    expect(element.textContent).toContain('Veuillez décrire votre besoin.');
    expect(element.textContent).toContain(
      "Veuillez confirmer que nous pouvons vous recontacter.",
    );
  });

  it('should submit a valid request and show a confirmation panel', () => {
    const fixture = TestBed.createComponent(ContactPage);
    fixture.detectChanges();

    fillValidForm(fixture.nativeElement as HTMLElement);

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;

    submitButton.click();
    fixture.detectChanges();

    expect(submitCalls[0]?.[0]).toEqual({
      fullName: 'Awa Konate',
      email: 'awa@example.com',
      phone: '+2250102030405',
      organization: 'KRAAK Labs',
      service: 'training',
      intent: 'consultation',
      message:
        "Je souhaite échanger sur un accompagnement en leadership pour notre prochaine cohorte.",
      source: 'direct',
    });

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Votre demande a bien été préparée.');
    expect(element.textContent).toContain('KRAAK-2026-001');
  });

  it('should render an error panel when the submission gateway fails', () => {
    gatewayResult$ = throwError(() => new Error('submission failed'));

    const fixture = TestBed.createComponent(ContactPage);
    fixture.detectChanges();

    fillValidForm(fixture.nativeElement as HTMLElement);

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;

    submitButton.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      "Nous n'avons pas pu envoyer votre demande pour le moment.",
    );
  });
});

function fillValidForm(container: HTMLElement): void {
  setInputValue(container, 'fullName', 'Awa Konate');
  setInputValue(container, 'email', 'awa@example.com');
  setInputValue(container, 'phone', '+2250102030405');
  setInputValue(container, 'organization', 'KRAAK Labs');
  setSelectValue(container, 'service', 'training');
  setSelectValue(container, 'intent', 'consultation');
  setTextareaValue(
    container,
    'message',
    "Je souhaite échanger sur un accompagnement en leadership pour notre prochaine cohorte.",
  );
  setCheckboxValue(container, 'consent', true);
}

function setInputValue(
  container: HTMLElement,
  controlName: string,
  value: string,
): void {
  const element = container.querySelector(
    `[formControlName="${controlName}"]`,
  ) as HTMLInputElement | null;

  if (!element) {
    throw new Error(`Input introuvable pour ${controlName}`);
  }

  element.value = value;
  element.dispatchEvent(new Event('input'));
}

function setTextareaValue(
  container: HTMLElement,
  controlName: string,
  value: string,
): void {
  const element = container.querySelector(
    `[formControlName="${controlName}"]`,
  ) as HTMLTextAreaElement | null;

  if (!element) {
    throw new Error(`Textarea introuvable pour ${controlName}`);
  }

  element.value = value;
  element.dispatchEvent(new Event('input'));
}

function setSelectValue(
  container: HTMLElement,
  controlName: string,
  value: string,
): void {
  const element = container.querySelector(
    `[formControlName="${controlName}"]`,
  ) as HTMLSelectElement | null;

  if (!element) {
    throw new Error(`Select introuvable pour ${controlName}`);
  }

  element.value = value;
  element.dispatchEvent(new Event('change'));
}

function setCheckboxValue(
  container: HTMLElement,
  controlName: string,
  value: boolean,
): void {
  const element = container.querySelector(
    `[formControlName="${controlName}"]`,
  ) as HTMLInputElement | null;

  if (!element) {
    throw new Error(`Checkbox introuvable pour ${controlName}`);
  }

  element.checked = value;
  element.dispatchEvent(new Event('change'));
}
