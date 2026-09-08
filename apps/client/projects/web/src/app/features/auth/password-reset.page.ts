import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { logDebugError } from '@kraak/api-client';
import { MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { Message } from 'primeng/message';
import { environment } from '../../../environments/environment';
import {
  WebAuthService,
  resolveAuthErrorMessage,
} from '../../core/auth/web-auth.service';
import {
  normalizeRequiredText,
  normalizeTextControl,
  resolveWebRedirectUrl,
} from './auth-form.utils';

import {
  KraakI18nService,
  KraakTranslatePipe,
} from '../../../../../shared/i18n';
interface PasswordResetFormModel {
  email: FormControl<string>;
}

@Component({
  selector: 'kraak-web-password-reset-page',
  standalone: true,
  imports: [
    KraakTranslatePipe,
    ReactiveFormsModule,
    RouterLink,
    ButtonDirective,
    Message,
  ],
  templateUrl: './password-reset.page.html',
})
export default class PasswordResetPage {
  private readonly i18n = inject(KraakI18nService);

  private readonly authService = inject(WebAuthService);
  private readonly messageService = inject(MessageService);

  readonly form = new FormGroup<PasswordResetFormModel>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });
  readonly successMessage = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly submitting = signal(false);

  async submit(): Promise<void> {
    normalizeTextControl(this.form.controls.email);
    this.form.markAllAsTouched();

    if (this.form.invalid || this.submitting()) {
      return;
    }

    this.submitting.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    try {
      const { email } = this.form.getRawValue();
      const response = await this.authService.requestPasswordReset({
        email: normalizeRequiredText(email),
        redirectTo: resolveWebRedirectUrl('/auth/reset', environment.siteUrl),
      });

      this.successMessage.set(response.message);
      this.messageService.add({
        key: 'app-feedback',
        severity: 'success',
        summary: this.i18n.translate('web.auth.forgotPassword.toastTitle'),
        detail: response.message,
        life: 6000,
      });
    } catch (error) {
      logDebugError('web.auth.password-reset.submit', error, {
        route: '/mot-de-passe-oublie',
      });
      this.errorMessage.set(
        resolveAuthErrorMessage(
          error,
          this.i18n.translate('web.auth.forgotPassword.genericError'),
        ),
      );
    } finally {
      this.submitting.set(false);
    }
  }
}
