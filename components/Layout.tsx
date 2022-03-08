import React from "react";

export type LayoutProps = {};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col max-w-screen-sm mx-auto min-h-screen p-2 sm:p-0">
      {children}
    </div>
  );
};

export default Layout;
