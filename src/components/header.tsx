import { component$ } from '@builder.io/qwik';

type HeaderProps = {
  username?: string;
};

export default component$<HeaderProps>((props) => (
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="/">
        conduit
      </a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          {/* <!-- Add "active" class when you're on that page" --> */}
          <a class="nav-link active" href="/">
            Home
          </a>
        </li>

        {!props.username && (
          <>
            <li class="nav-item">
              <a class="nav-link" href="/login">
                Sign in
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/register">
                Sign up
              </a>
            </li>
          </>
        )}

        {!!props.username && (
          <>
            <li class="nav-item">
              <a class="nav-link" href="/editor">
                {' '}
                <i class="ion-compose"></i>&nbsp;New Article{' '}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/settings">
                {' '}
                <i class="ion-gear-a"></i>&nbsp;Settings{' '}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/profile/eric-simons">
                <img src="" class="user-pic" />
                Eric Simons
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  </nav>
));
