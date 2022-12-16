import "../styles/globals.scss";
import Nav from "../components/Nav";
import { Inter } from "@next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kokomi</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="app_wrapper">
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <Nav />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
