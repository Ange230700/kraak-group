import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';

import {
  CONTACT_INTENT_OPTIONS,
  CONTACT_LEAD_GATEWAY,
  CONTACT_SERVICE_OPTIONS,
  getContactIntentLabel,
  getContactServiceLabel,
  parseContactIntentValue,
  parseContactServiceValue,
  type ContactIntentValue,
  type ContactLeadPayload,
  type ContactLeadReceipt,
  type ContactServiceValue,
} from './contact-lead.gateway';

@Component({
  selector: 'kraak-contact-page',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ButtonDirective,
    InputText,
    Textarea,
  ],
  templateUrl: './contact.page.html',
})
export default class ContactPage {
  private readonly route = inject(ActivatedRoute);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly contactLeadGateway = inject(CONTACT_LEAD_GATEWAY);

  readonly serviceOptions = CONTACT_SERVICE_OPTIONS;
  readonly intentOptions = CONTACT_INTENT_OPTIONS;
  readonly submissionState = signal<'idle' | 'pending' | 'success' | 'error'>(
    'idle',
  );
  readonly successReceipt = signal<ContactLeadReceipt | null>(null);
  readonly hasAttemptedSubmit = signal(false);
  readonly source = signal('direct');
  readonly contactForm = this.formBuilder.group({
    fullName: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: this.formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    phone: this.formBuilder.control(''),
    organization: this.formBuilder.control(''),
    service: this.formBuilder.control<ContactServiceValue>('general', [
      Validators.required,
    ]),
    intent: this.formBuilder.control<ContactIntentValue>('information', [
      Validators.required,
    ]),
    message: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(20),
    ]),
    consent: this.formBuilder.control(false, [Validators.requiredTrue]),
  });

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const service = parseContactServiceValue(params.get('service'));
      const intent = parseContactIntentValue(params.get('intent'));
      const source = params.get('source')?.trim() || 'direct';

      this.source.set(source);
      this.contactForm.patchValue(
        {
          service,
          intent,
        },
        { emitEvent: false },
      );
    });
  }

  submit(): void {
    this.hasAttemptedSubmit.set(true);
    this.successReceipt.set(null);

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.submissionState.set('idle');
      return;
    }

    this.submissionState.set('pending');

    this.contactLeadGateway.submit(this.buildPayload()).subscribe({
      next: (receipt) => {
        const { service, intent } = this.contactForm.getRawValue();

        this.submissionState.set('success');
        this.successReceipt.set(receipt);
        this.contactForm.reset({
          fullName: '',
          email: '',
          phone: '',
          organization: '',
          service,
          intent,
          message: '',
          consent: false,
        });
        this.hasAttemptedSubmit.set(false);
      },
      error: () => {
        this.submissionState.set('error');
      },
    });
  }

  showError(controlName: keyof typeof this.contactForm.controls): boolean {
    const control = this.contactForm.controls[controlName];

    return control.invalid && (control.touched || this.hasAttemptedSubmit());
  }

  getContextSummary(): string {
    if (
      this.source() === 'direct' &&
      this.contactForm.controls.service.value === 'general' &&
      this.contactForm.controls.intent.value === 'information'
    ) {
      return '';
    }

    return `${getContactIntentLabel(
      this.contactForm.controls.intent.value,
    )} • ${getContactServiceLabel(this.contactForm.controls.service.value)}`;
  }

  getSelectedServiceDescription(): string {
    return (
      this.serviceOptions.find(
        (option) => option.value === this.contactForm.controls.service.value,
      )?.description ?? this.serviceOptions[0].description
    );
  }

  private buildPayload(): ContactLeadPayload {
    const value = this.contactForm.getRawValue();

    return {
      fullName: value.fullName.trim(),
      email: value.email.trim(),
      phone: value.phone.trim(),
      organization: value.organization.trim(),
      service: value.service,
      intent: value.intent,
      message: value.message.trim(),
      source: this.source(),
    };
  }
}
