import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Image } from '@unpic/qwik';
import ActiveRoute from './active-route';

type HeaderProps = {
  username?: string;
  image?: string;
};

export default component$<HeaderProps>((props) => (
  <nav class="navbar navbar-light">
    <div class="container">
      <Link class="navbar-brand" href="/">
        conduit
      </Link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <ActiveRoute activeClass="active" class="nav-link" href="/">
            Home
          </ActiveRoute>
        </li>

        {!props.username && (
          <>
            <li class="nav-item">
              <ActiveRoute activeClass="active" class="nav-link" href="/login">
                Sign in
              </ActiveRoute>
            </li>
            <li class="nav-item">
              <ActiveRoute
                activeClass="active"
                class="nav-link"
                href="/register"
              >
                Sign up
              </ActiveRoute>
            </li>
          </>
        )}

        {!!props.username && (
          <>
            <li class="nav-item">
              <ActiveRoute activeClass="active" class="nav-link" href="/editor">
                <i class="ion-compose"></i>&nbsp;New Article
              </ActiveRoute>
            </li>
            <li class="nav-item">
              <ActiveRoute
                activeClass="active"
                class="nav-link"
                href="/settings"
              >
                <i class="ion-gear-a"></i>&nbsp;Settings
              </ActiveRoute>
            </li>
            <li class="nav-item">
              <ActiveRoute
                activeClass="active"
                class="nav-link"
                href="/profile/eric-simons"
              >
                <Image
                  layout="constrained"
                  src={props.image}
                  class="user-pic"
                  width={25}
                  height={25}
                />
                Eric Simons
              </ActiveRoute>
            </li>
          </>
        )}
      </ul>
    </div>
  </nav>
));
