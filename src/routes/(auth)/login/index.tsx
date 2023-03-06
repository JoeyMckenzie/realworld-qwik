import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Form, Link } from '@builder.io/qwik-city';
import { useAuth } from '~/lib/auth/actions';

export default component$(() => {
  const action = useAuth();

  return (
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign in</h1>
            <p class="text-xs-center">
              <Link href="/register">Need an account?</Link>
            </p>

            {action.value?.failed && action.value.validations && (
              <ul class="error-messages">
                {action.value.validations.map((validationMessage) => (
                  <li>{validationMessage}</li>
                ))}
              </ul>
            )}

            <Form action={action}>
              <fieldset class="form-group">
                <input
                  name="email"
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  name="password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  required
                />
              </fieldset>
              <button
                type="submit"
                class="btn btn-lg btn-primary pull-xs-right"
              >
                Sign in
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'conduit | login',
  meta: [
    {
      name: 'description',
      content: 'RealWorld Conduit with Qwik',
    },
  ],
};
