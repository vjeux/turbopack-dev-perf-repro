import Shell from "../components/shell";

export default function RootLayout({ children, aside }) {
  return (
    <html lang="en">
      <body>
        <Shell aside={aside}>{children}</Shell>
      </body>
    </html>
  );
}
