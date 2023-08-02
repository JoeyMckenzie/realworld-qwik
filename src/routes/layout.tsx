import type { Signal } from '@builder.io/qwik';
import { component$, createContextId, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import Footer from '~/components/footer';
import Header from '~/components/header';
import type { UserResponse } from '~/lib/auth';
import { fetchUser } from '~/lib/auth';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const UserContext =
  createContextId<Signal<UserResponse | undefined>>('user');

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const useUser = routeLoader$(async ({ cookie }) => {
  const userToken = cookie.get(import.meta.env.VITE_USER_TOKEN_COOKIE_KEY);

  if (userToken) {
    const { data } = await fetchUser(userToken.value);
    return {
      user: data?.user,
    };
  }
});

export default component$(() => {
  const user = useUser();

  return (
    <>
      <Header
        username={user.value?.user?.username}
        image={user.value?.user?.image}
      />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
