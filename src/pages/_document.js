import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="google-adsense-account" content="ca-pub-8097044169349946"/>
        <link rel="shortcut icon" href="/logo/TeramaFlixpic.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8097044169349946"
     crossOrigin="anonymous"></script>
     <script async custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
      </script>
      </Head>
      <body>
      <amp-auto-ads type="adsense"
        data-ad-client="ca-pub-8097044169349946">
      </amp-auto-ads>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}