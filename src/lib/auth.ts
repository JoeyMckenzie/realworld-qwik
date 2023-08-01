import { ApiError, ApiResult } from './utils';

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

export async function fetchUser(
  token: string
): Promise<ApiResult<UserResponse>> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
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

export type UserResponse = {
  user: {
    username: string;
    email: string;
    token: string;
    bio?: string;
    image?: string;
  };
};
