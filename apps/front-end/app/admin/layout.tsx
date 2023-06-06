import { ReactChildren } from "@open-press/interfaces";
import { ReactNode } from "react";

export default function Layout(
  {
    children,
    dashboard,
    login,
  }: ReactChildren & { dashboard: ReactNode, login: ReactNode },
): JSX.Element {
  const user = {
    email: "john.doe@example.com",
  };

  // const user = null;

  return (
    <main className={"min-h-screen min-w-screen grid grid-cols-2 m-0 p-0 gap-0"}>
      {user ? dashboard : login}
    </main>
  );
}
