export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="min-h-screen bg-(--background) text-(--textColor) transition-colors">
      {children}
    </body>
  );
}
