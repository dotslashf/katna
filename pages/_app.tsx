import Script from "next/script";

import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider storageKey="katna:theme" attribute="class">
      <Component {...pageProps} />
      <Script id="track-ga" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GTM-P74SV84');
      `}</Script>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GTM-P74SV84"
        strategy="afterInteractive"
      />
    </ThemeProvider>
  );
}
