import { DefaultNavBar } from "@/components/default-navbar";
import { Provider } from "@/components/provider";
import React, { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider>
      <DefaultNavBar />
      {children}
    </Provider>
  );
};

export default Layout;
