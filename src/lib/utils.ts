export type ApiResult<T> = {
  data?: T;
  error?: ApiError;
};

export type ApiError = {
  errors: {
    [key: string]: string[];
  };
};

export function getFriendlyErrors({ errors }: ApiError) {
  return Object.entries(errors)
    .map((entry) => {
      const property = entry[0];
      const errors = entry[1];
      return errors.map((message) => `${property} ${message}`);
    })
    .flat();
}
