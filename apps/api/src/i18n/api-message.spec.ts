import { apiMessage, translateApiMessage } from './api-message';

describe('API message localization', () => {
  it('preserves legacy string messages unchanged', () => {
    expect(translateApiMessage('en-GB', 'Legacy API message')).toBe(
      'Legacy API message',
    );
  });

  it('translates a descriptor to English', () => {
    expect(
      translateApiMessage('en-GB', apiMessage('auth.bearerRequired')),
    ).toBe('A Bearer authorization header is required.');
  });

  it('interpolates descriptor parameters', () => {
    expect(
      translateApiMessage(
        'en-GB',
        apiMessage('validation.requiredField', {
          field: 'title',
        }),
      ),
    ).toBe('The title field is required.');
  });

  it('interpolates multiple status-transition parameters', () => {
    expect(
      translateApiMessage(
        'en-GB',
        apiMessage('support.invalidStatusTransition', {
          fromStatus: 'open',
          toStatus: 'closed',
        }),
      ),
    ).toBe('Invalid status transition: open -> closed.');
  });
});
