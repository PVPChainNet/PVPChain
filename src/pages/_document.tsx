import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="h-full font-open-sans font-normal leading-relaxed font-base scroll-smooth">
      <Head>
        {/* This is the NextJs way to preload fonts. Suppressing ESLint warning. */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link href="/fonts/fonts.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
