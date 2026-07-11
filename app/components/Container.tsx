import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-(--container-app) px-5 sm:px-8">
      {children}
    </div>
  );
}