import TrackLylics from './TrackLylics';

interface DetailModuleContentProps {
  type: string;
  title: string;
  moduleType: string;
}

export default function DetailModuleContent({ type, title, moduleType }: DetailModuleContentProps) {
  const totalType = type === 'track' && moduleType === 'lylics' ? 'trackLylics' : 'trackArtist';

  return (
    <div>
      <h1 className="mb-2 text-[1.5rem] font-semibold text-white">{title}</h1>

      {totalType === 'trackLylics' ? <TrackLylics /> : <div>mmm</div>}
    </div>
  );
}
