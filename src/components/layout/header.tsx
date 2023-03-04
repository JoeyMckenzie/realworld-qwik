import { component$ } from '@builder.io/qwik';
import ActiveLink from './active-link';

export default component$(() => {
  return (
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          conduit
        </a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            {/* <!-- Add "active" class when you're on that page" --> */}
            <ActiveLink activeClass="active" class="nav-link" href="/">
              Home
            </ActiveLink>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">
              {' '}
              <i class="ion-compose"></i>&nbsp;New Article{' '}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">
              {' '}
              <i class="ion-gear-a"></i>&nbsp;Settings{' '}
            </a>
          </li>
          <li class="nav-item">
            <ActiveLink activeClass="active" class="nav-link" href="/login">
              Sign in
            </ActiveLink>
          </li>
          <li class="nav-item">
            <ActiveLink activeClass="active" class="nav-link" href="/register">
              Sign up
            </ActiveLink>
          </li>
        </ul>
      </div>
    </nav>
  );
});
