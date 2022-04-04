import React from "react";
import Nav from "./Nav";

export type LayoutProps = {};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="min-h-screen min-h-screen-ios pt-14 pb-24">
        <div className="flex flex-col gap-2 max-w-screen-sm mx-auto p-2 sm:p-0">
          {children}
        </div>
        <footer>{/* TODO: 라이선스 및 연락처 작성 필요 */}</footer>
      </div>
    </>
  );
};

export default Layout;
