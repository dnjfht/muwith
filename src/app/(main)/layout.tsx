import '../globals.css';
import Sidebar from '../components/Sidebar';

export default function MainRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="w-full h-screen bg-[#ebebeb] text-[#282828] font-inter font-[400] leading-normal scrollbar-hide overflow-hidden">
        <div className="w-full h-full grid grid-cols-[min-content_auto] grid-rows-[10fr_1fr] gap-y-2 p-2 bg-[#232426]">
          <Sidebar />
          <div className="bg-neutral-700">{children}</div>
          <div className="col-span-2 bg-neutral-700"> 플레이어 </div>
        </div>
      </body>
    </html>
  );
}
