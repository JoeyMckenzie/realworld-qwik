import { Slot, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { LinkProps } from '@builder.io/qwik-city';
import { Link, useLocation } from '@builder.io/qwik-city';

type ActiveLinkProps = LinkProps & {
  activeClass: string;
};

export default component$((props: ActiveLinkProps) => {
  const { url } = useLocation();
  const computedClasses = useSignal(props.class);

  useVisibleTask$(({ track }) => {
    track(() => props.href);
    track(() => url.pathname);
    track(() => props.activeClass);
    track(() => props.class);
    track(() => computedClasses.value);

    // Check if the router fields are updated client-side
    // Dynamic route will be matched via props.as
    // Static route will be matched via props.href
    const linkPathname = new URL(props.href as string, location.href).pathname;

    // Using URL().pathname to get rid of query and hash
    let activePathname = new URL(url.pathname, location.href).pathname;

    // Trim the active pathname to remove trailing slashes
    if (activePathname.length > 1) {
      activePathname = activePathname.slice(0, activePathname.length - 1);
    }

    const newClassName =
      linkPathname === activePathname
        ? `${props.class} ${props.activeClass}`.trim()
        : props.class;

    if (newClassName !== computedClasses.value) {
      computedClasses.value = newClassName;
    }
  });

  return (
    <Link class={computedClasses.value} {...props}>
      <Slot />
    </Link>
  );
});
