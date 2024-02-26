import '../globals.css';
import Sidebar from '../components/Sidebar';
import CurrentPlayDetail from '../components/CurrentPlayDetail';
import { fetchCurrentPlaylist } from '../api/playlist_api';
import { cookies } from 'next/headers';
import { fetchUserData } from '../api/user';
import Header from '../components/Header';
import MainContentWrap from '../components/MainContentWrap';
import { fetchSpotifyAccessToken } from '../api/spotify';
import PlayBar from '../components/PlayBar';
import WrapContent from '../components/WrapContent';

export default async function MainRootLayout({ children }: React.PropsWithChildren) {
  const currentPlaylist = await fetchCurrentPlaylist();
  const { current_play_list } = currentPlaylist ?? { current_play_list: [] };

  const accessToken = cookies().get('accessToken')?.value;
  const currentUserData = await fetchUserData(accessToken as string);
  const spotifyAccessToken = await fetchSpotifyAccessToken();

  return (
    <div className="w-full h-screen bg-[#ebebeb] text-[#282828] font-inter font-[400] leading-normal overflow-hidden">
      <div className="w-full h-full grid grid-rows-[10fr_1fr] gap-y-2 p-2 bg-[rgb(35,36,38)]">
        <WrapContent currentPlaylist={current_play_list}>
          <div className="w-full flex">
            <Sidebar />
            <MainContentWrap>
              <div className="w-full h-full box-border bg-[#ebebeb] rounded-lg shadow-lg overflow-hidden">
                <Header currentUserData={currentUserData} />
                <div id="player">
                  <iframe
                    id="player"
                    width={0}
                    height={0}
                    src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
                  ></iframe>{' '}
                </div>
                {children}
              </div>
            </MainContentWrap>
            <CurrentPlayDetail currentPlayList={currentPlaylist} />
          </div>

          <PlayBar currentPlayList={current_play_list} />
        </WrapContent>
      </div>
    </div>
  );
}
