import { BadRequestException, type ArgumentsHost } from '@nestjs/common';
import type { HttpAdapterHost } from '@nestjs/core';

import type { ApiLocaleContext } from './api-locale-context';
import { apiMessage } from './api-message';
import {
  LocalizedHttpExceptionFilter,
  localizeHttpExceptionResponse,
} from './localized-http-exception.filter';

describe('LocalizedHttpExceptionFilter', () => {
  it('preserves legacy response strings', () => {
    expect(
      localizeHttpExceptionResponse(
        {
          success: false,
          message: 'Payload invalide.',
          errors: ['Le champ title est requis.'],
        },
        'en-GB',
      ),
    ).toEqual({
      success: false,
      message: 'Payload invalide.',
      errors: ['Le champ title est requis.'],
    });
  });

  it('localizes structured message descriptors', () => {
    expect(
      localizeHttpExceptionResponse(
        {
          success: false,
          message: apiMessage('validation.invalidPayload'),
          errors: [
            apiMessage('validation.requiredField', {
              field: 'title',
            }),
          ],
        },
        'en-GB',
      ),
    ).toEqual({
      success: false,
      message: 'Invalid payload.',
      errors: ['The title field is required.'],
    });
  });

  it('uses the request locale when serializing an HttpException', () => {
    const reply = jest.fn();
    const response = {};

    const localeContext = {
      locale: () => 'en-GB',
    } as ApiLocaleContext;

    const httpAdapterHost = {
      httpAdapter: { reply },
    } as unknown as HttpAdapterHost;

    const filter = new LocalizedHttpExceptionFilter(
      localeContext,
      httpAdapterHost,
    );

    const exception = new BadRequestException({
      success: false,
      message: apiMessage('validation.invalidPayload'),
    });

    const host = {
      switchToHttp: () => ({
        getResponse: () => response,
      }),
    } as ArgumentsHost;

    filter.catch(exception, host);

    expect(reply).toHaveBeenCalledWith(
      response,
      {
        success: false,
        message: 'Invalid payload.',
      },
      400,
    );
  });
});
