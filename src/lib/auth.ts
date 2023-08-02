import { ApiError, ApiResult } from './utils';

/**
 * Attempts to authenticate the user based on the authentication form from the register and login routes.
 *
 * @param email User's email from the authentication form.
 * @param password User's password from the authentication form.
 * @param username User's username from the authentication form, optional.
 * @returns User data on success.
 */
export async function fetchAuthentication(
  email: string,
  password: string,
  username?: string
): Promise<ApiResult<UserResponse>> {
  let request: UserRequest = {
    email,
    password,
  };

  if (!!username) {
    request = {
      ...request,
      username,
    };
  }

  const url = !!username
    ? `${import.meta.env.VITE_API_BASE_URL}/users`
    : `${import.meta.env.VITE_API_BASE_URL}/users/login`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      user: request,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    const user: UserResponse = data;
    return {
      data: user,
    };
  }

  const error: ApiError = data;
  return {
    error,
  };
}

/**
 * Attempts retrieve the user information based on the current user token from storage.
 *
 * @param encodedToken Stashed token from cookie storage.
 * @returns User data on success.
 */
export async function fetchUser(
  encodedToken: string
): Promise<ApiResult<UserResponse>> {
  const decodedToken = Buffer.from(encodedToken, 'base64').toString('utf8');
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${decodedToken}`,
    },
  });

  if (response.ok) {
    const user: UserResponse = await response.json();
    return {
      data: user,
    };
  }

  return {
    error: {
      errors: {
        user: [response.statusText],
      },
    },
  };
}

type UserRequest = {
  email: string;
  username?: string;
  password: string;
};

export type UserInfo = {
  username: string;
  email: string;
  token: string;
  bio?: string;
  image?: string;
};

export type UserResponse = {
  user: UserInfo;
};
