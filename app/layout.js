App/layout.js


export const metadata = {
  title: 'Chat & Chill',
  description: 'Drop Gifts. Go Live. Earn Daily.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0A0A0F' }}>
        {children}
      </body>
    </html>
  );
}

