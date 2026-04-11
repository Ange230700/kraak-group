import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface ContactErrorResponse {
  errors: string[];
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiBaseUrl}/contact`;

  submit(
    payload: ContactPayload,
  ): Observable<ContactResponse | ContactErrorResponse> {
    return this.http.post<ContactResponse | ContactErrorResponse>(
      this.endpoint,
      payload,
    );
  }
}
