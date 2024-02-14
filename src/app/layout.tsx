import { Suspense } from 'react';
import './globals.css';
import Loading from './loading';
import RecoilRootProvider from './recoil/RecoilRootProvider';

export const metadata = {
  title: 'MUWITH',
  description: 'Now, play music that fits your mood and mood anywhere.',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <body>
        <RecoilRootProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
