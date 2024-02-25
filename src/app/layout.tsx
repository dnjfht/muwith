import './globals.css';

import RecoilRootProvider from './recoil/RecoilRootProvider';
import { CookiesProvider } from 'next-client-cookies/server';

export const metadata = {
  title: 'MUWITH',
  description: 'Now, play music that fits your mood and mood anywhere.',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <body className="overflow-x-hidden">
        <RecoilRootProvider>
          <CookiesProvider>{children}</CookiesProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
