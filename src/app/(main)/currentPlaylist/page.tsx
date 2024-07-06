import CurrentMusic from '@/app/components/currentPlaylist/CurrentMusic';
import NextPlaylist from '@/app/components/currentPlaylist/NextPlaylist';
import MainText from '@/app/components/text/MainText';

export default function CurrentPlaylistPage() {
  return (
    <div className="w-full px-6 box-border">
      <MainText text="재생목록" basicStyle="mb-8" />

      <CurrentMusic />
      <NextPlaylist />
    </div>
  );
}
