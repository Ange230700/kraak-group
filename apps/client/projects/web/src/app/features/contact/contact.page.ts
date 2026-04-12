import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Textarea } from 'primeng/textarea';

import { CtaBanner } from '../../shared/cta-banner/cta-banner';
import { ContactService } from './contact.service';

@Component({
  selector: 'kraak-contact-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    ButtonDirective,
    InputText,
    Textarea,
    Message,
    CtaBanner,
  ],
  templateUrl: './contact.page.html',
})
export default class ContactPage {
  private readonly contactService = inject(ContactService);

  readonly form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  readonly loading = signal(false);
  readonly submitted = signal(false);
  readonly success = signal(false);
  readonly apiErrors = signal<string[]>([]);

  get name(): AbstractControl {
    return this.form.get('name')!;
  }
  get email(): AbstractControl {
    return this.form.get('email')!;
  }
  get subject(): AbstractControl {
    return this.form.get('subject')!;
  }
  get message(): AbstractControl {
    return this.form.get('message')!;
  }

  isInvalid(control: AbstractControl): boolean {
    return (
      control.invalid && (control.dirty || control.touched || this.submitted())
    );
  }

  onSubmit(): void {
    this.submitted.set(true);
    this.apiErrors.set([]);

    if (this.form.invalid) {
      return;
    }

    this.loading.set(true);
    this.success.set(false);

    this.contactService
      .submit({
        name: this.form.value.name!,
        email: this.form.value.email!,
        subject: this.form.value.subject!,
        message: this.form.value.message!,
      })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.success.set(true);
          this.form.reset();
          this.submitted.set(false);
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.loading.set(false);
          this.apiErrors.set(this.extractApiErrors(errorResponse));
        },
      });
  }

  private extractApiErrors(errorResponse: HttpErrorResponse): string[] {
    const rawErrors = (errorResponse.error as { errors?: unknown })?.errors;

    if (
      Array.isArray(rawErrors) &&
      rawErrors.every((error) => typeof error === 'string') &&
      rawErrors.length > 0
    ) {
      return rawErrors;
    }

    return ['Une erreur est survenue. Veuillez réessayer plus tard.'];
  }
}
