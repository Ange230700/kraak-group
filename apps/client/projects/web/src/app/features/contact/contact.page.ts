import { NgClass } from '@angular/common';
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
import { Textarea } from 'primeng/textarea';
import { Message } from 'primeng/message';

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

    this.contactService
      .submit({
        name: this.form.value.name!,
        email: this.form.value.email!,
        subject: this.form.value.subject!,
        message: this.form.value.message!,
      })
      .subscribe({
        next: (res) => {
          this.loading.set(false);
          if ('errors' in res) {
            this.apiErrors.set(res.errors);
          } else {
            this.success.set(true);
            this.form.reset();
            this.submitted.set(false);
          }
        },
        error: () => {
          this.loading.set(false);
          this.apiErrors.set([
            'Une erreur est survenue. Veuillez réessayer plus tard.',
          ]);
        },
      });
  }
}
