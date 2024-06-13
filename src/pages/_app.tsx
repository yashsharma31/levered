import "@components/styles/globals.css";
import type { AppProps } from "next/app";
import middleware from "../../middleware";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default middleware(App);
