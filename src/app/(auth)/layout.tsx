import '../globals.css';
import './layout.css';

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="w-full h-screen bg-[#ebebeb] text-[#282828] font-inter font-[400] leading-normal scrollbar-hide overflow-hidden">
        <>{children}</>
      </body>
    </html>
  );
}
