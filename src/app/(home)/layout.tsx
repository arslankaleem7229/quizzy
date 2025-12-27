import Sidebar from "@/components/layout/Sidebar";
import { Suspense } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen min-w-screen bg-(--background) text-(--textColor) transition-colors flex">
      <Suspense>
        <Sidebar />
      </Suspense>
      {children}
    </div>
  );
}
