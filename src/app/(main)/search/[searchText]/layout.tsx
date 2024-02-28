import TabContainer from '@/app/components/TabContainer';

export default function SearchTextLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="w-full py-4">
      <TabContainer />
      {children}
    </div>
  );
}
