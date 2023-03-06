import type { Cookie } from '@builder.io/qwik-city';
import type {
  ApiError,
  AuthContext,
  FailureFn,
  UserAuthRequest,
  UserAuthResponse,
} from './types';
import { toApiErrors } from './utils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function sendAuthRequest(
  context: AuthContext,
  username: string,
  password: string,
  email: string
) {
  const endpoint = `${API_BASE_URL}/users${
    context === 'login' ? '/login' : ''
  }`;
  const request = {
    user: {
      email,
      username,
      password,
    },
  } satisfies UserAuthRequest;

  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      user: request,
    }),
  });
}

export function setUserCookie(userResponse: UserAuthResponse, cookie: Cookie) {
  const buffer = Buffer.from(JSON.stringify(userResponse), 'base64');
  const cookieValue = buffer.toString('base64');
  cookie.set('jwt', cookieValue, { path: '/' });
}

export function addValidationFailures(apiErrors: ApiError, fail: FailureFn) {
  console.error('one or more validation errors occurred');
  const validations = Object.entries(apiErrors.errors).map(toApiErrors).flat();
  return fail(500, {
    validations,
  });
}

export function handleApiError(fail: FailureFn) {
  return fail(500, {
    message: 'an unexpected error occured while processing the request',
  });
}
