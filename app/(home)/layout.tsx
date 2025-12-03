export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="min-h-screen bg-(--background) text-(--foreground) transition-colors">
      {children}
    </body>
  );
}
