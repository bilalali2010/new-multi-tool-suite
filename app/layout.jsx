export const metadata = {
  title: "AI Multi Tool Suite",
  description: "AI powered content tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
