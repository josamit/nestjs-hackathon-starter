import Head from "next/head";
import React, { FC } from "react";

import Navbar from "./navbar";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Hackathon Starter</title>
        <link rel="icon" href="/brand.svg" />
      </Head>
      <Navbar />

      {children}
    </>
  );
};

export default Layout;
