import { component$ } from '@builder.io/qwik';

type AuthErrorsProps = {
  errors?: string[];
};

export const AuthErrors = component$<AuthErrorsProps>((props) => {
  return (
    <ul class="error-messages">
      {props.errors?.map((error, index) => (
        <li key={`auth-error-${index}`}>{error}</li>
      ))}
    </ul>
  );
});
