import type { LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Outlet } from '@remix-run/react';

import globalStylesUrl from '~/styles/global.css';
import globalStylesMediumUrl from '~/styles/global-medium.css';
import globalStylesLargeUrl from '~/styles/global-large.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStylesUrl },
  {
    rel: 'stylesheet',
    href: globalStylesMediumUrl,
    media: 'print, (min-width: 640px)',
  },
  {
    rel: 'stylesheet',
    href: globalStylesLargeUrl,
    media: 'print, (min-width: 1024px)',
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Remix is great</title>
        <Links />
      </head>
      <body>
        <Outlet />
        <LiveReload />
      </body>
    </html>
  );
}
