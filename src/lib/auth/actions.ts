import { globalAction$, z, zod$ } from '@builder.io/qwik-city';
import {
  sendAuthRequest,
  setUserCookie,
  addValidationFailures,
  handleApiError,
} from './effects';
import type { ApiError, AuthContext, UserAuthResponse } from './types';

/**
 * An action to handle logins and registrations, with successful attempts
 * adding a session cookie to be utilized for all server requests.
 */
export const useAuth = globalAction$(
  async ({ email, password, username }, { cookie, fail, redirect }) => {
    //* since `username` is optional, we'll use it to determine if this is a login or register context
    const authContext = (username ? 'login' : 'register') satisfies AuthContext;
    console.info(`auth context determined as ${authContext}`);

    console.info(`requesting user authentication for user ${username}`);
    const response = await sendAuthRequest(
      authContext,
      username,
      password,
      email
    );

    if (response.ok) {
      console.info(
        'user authentication was successful, overwriting existing session'
      );
      const userResponse = (await response.json()) satisfies UserAuthResponse;
      setUserCookie(userResponse, cookie);
      throw redirect(307, '/');
    }

    console.error(
      `an error occurred while processing the request while processing the request`
    );
    const isValidationFailure = response.status === 422;
    const apiErrors = (await response.json()) satisfies ApiError;
    return isValidationFailure
      ? addValidationFailures(apiErrors, fail)
      : handleApiError(fail);
  },
  zod$({
    email: z.string().email(),
    password: z.string(),
    username: z.string().optional().default(''),
  })
);
