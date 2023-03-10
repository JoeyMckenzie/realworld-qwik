import { component$, Slot } from '@builder.io/qwik';
import Footer from '~/components/layout/footer';
import Header from '../components/layout/header';

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <Footer />
    </>
  );
});
