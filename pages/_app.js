import "../styles/globals.scss";
import Nav from "../components/Nav";
import { Inter } from "@next/font/google";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kokomi</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css"
          integrity="sha256-TehzF/2QvNKhGQrrNpoOb2Ck4iGZ1J/DI4pkd2oUsBc="
          crossorigin="anonymous"
        />
      </Head>
      <div className="app_wrapper">
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <Nav />
        <Component {...pageProps} />
        <Analytics />
      </div>
    </>
  );
}

export default MyApp;
