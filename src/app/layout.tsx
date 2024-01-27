import Providers from './Providers';
import './globals.css';

export const metadata = {
  title: 'MUWITH',
  description: 'Now, play music that fits your mood and mood anywhere.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
