import "../styles/globals.scss";
import { Theme } from "@twilio-paste/core/theme";
import { Router } from "next/router";
import NProgress from "nprogress";

import { AppStateProvider } from "../core/AppStateContext";

// Configuration
NProgress.configure({ showSpinner: false });

// Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Theme.Provider theme="default">
      <AppStateProvider>
        <Component {...pageProps} />
      </AppStateProvider>
    </Theme.Provider>
  );
}

export default MyApp;
