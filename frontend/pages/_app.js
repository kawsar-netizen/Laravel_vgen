import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../presentation/mui-theme/mui-theme";
import { useStore } from "../application/store";
// import { Provider } from "react-redux";
import "../presentation/assets/styles/globals.css";
import { ContextProvider } from "../context/UserContext";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from 'next/router'
const progress = new ProgressBar({
  size: 6,
  color: "#31A4DC",
  className: "z-index",
  delay: 100
});

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

export default function MyApp(props) {
  const { Component, pageProps } = props;
  // const store = useStore(pageProps.initialReduxState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
      <ContextProvider>
        <React.Fragment>
          <Head>
            <title>Vgen</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
            <link rel="shortcut icon" href="/Logo.png" />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* <Provider store={store}> */}
  
            <Component {...pageProps} />
  
            {/* </Provider> */}
          </ThemeProvider>
        </React.Fragment>
      </ContextProvider>
  );
}
