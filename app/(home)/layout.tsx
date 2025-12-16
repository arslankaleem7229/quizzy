import Sidebar from "../components/Sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen min-w-screen bg-(--background) text-(--textColor) transition-colors flex">
      <Sidebar />
      {children}
    </div>
  );
}
