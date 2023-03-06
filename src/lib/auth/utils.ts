export function toApiErrors(entry: [string, string[]]) {
  const property = entry[0];
  const errors = entry[1];

  return errors.map((message) => toErrorMessage(message, property));
}

function toErrorMessage(message: string, property: string) {
  const errorMessage = `${property} ${message}`;
  console.trace(errorMessage);
  return errorMessage;
}
