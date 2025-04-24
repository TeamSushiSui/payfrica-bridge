import { DefaultNavBar } from "@/components/default-navbar";
// import { Provider } from "@/components/provider";
import React, { FC, ReactNode } from "react";
import { WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    // <Provider>
    <main>
      <DefaultNavBar />
      <div>
        {children}
      </div>
    </main>
    // </Provider>
  );
};

export default Layout;
