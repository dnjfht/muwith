import '../globals.css';
import './layout.css';

export default function AuthRootLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="w-full h-screen bg-[#ebebeb] text-[#282828] font-inter font-[400] leading-normal scrollbar-hide overflow-hidden">
      {children}
    </div>
  );
}
