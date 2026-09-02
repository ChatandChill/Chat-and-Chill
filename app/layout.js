export const metadata = {
  title: "Chat and Chill",
  description: "Chat and Chill app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
