import type { FailReturn } from '@builder.io/qwik-city';

export type AuthContext = 'login' | 'register';

export type FailureFn = <T extends Record<string, any>>(
  status: number,
  returnData: T
) => FailReturn<T>;

export type User = {
  email: string;
  username: string;
  token: string;
  bio: string;
  image: string;
};

export type UserAuthRequest = {
  //* while we could use a nullable password here and leverage `Omit`,
  //* we don't want the user's password exposed anywhere in core logic
  user: Pick<User, 'email' | 'username'> & { password: string };
};

export type UserAuthResponse = {
  user: User;
};

export type ApiError = {
  errors: {
    [key: string]: string[];
  };
};
