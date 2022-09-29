import React from "react";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <main className="max-w-screen-md mx-auto py-10 px-1">{children}</main>;
};
