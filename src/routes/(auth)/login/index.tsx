import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';
import { AuthErrors } from '~/components/auth-errors';
import { fetchAuthentication } from '~/lib/auth';
import { getFriendlyErrors } from '~/lib/utils';

export const userLoginUser = routeAction$(
  async ({ email, password }, { cookie, redirect, fail }) => {
    const { data, error } = await fetchAuthentication(email, password);

    if (data) {
      const buffer = Buffer.from(data.user.token, 'base64');
      const cookieValue = buffer.toString('base64');
      cookie.set(import.meta.env.VITE_USER_TOKEN_COOKIE_KEY, cookieValue, {
        path: '/',
        sameSite: true,
        secure: true,
      });

      redirect(307, '/');
      return;
    }

    return fail(400, {
      validations: getFriendlyErrors(error!),
    });
  },
  zod$({
    email: z.string(),
    password: z.string(),
  })
);

export default component$(() => {
  const action = userLoginUser();

  return (
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign in</h1>
            <p class="text-xs-center">
              <a href="/register">Need an account?</a>
            </p>

            <AuthErrors errors={action.value?.validations} />

            <Form action={action}>
              <fieldset class="form-group">
                <input
                  required
                  name="email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  required
                  name="password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
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
