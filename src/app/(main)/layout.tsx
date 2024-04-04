import './layout.css';
import Sidebar from '../components/Sidebar';
import CurrentPlayDetail from '../components/CurrentPlayDetail';
import { fetchCurrentPlaylist } from '../api/playlist_api';
import { cookies } from 'next/headers';
import { fetchUserData } from '../api/user';
import Header from '../components/Header';
import MainContentWrap from '../components/MainContentWrap';
import PlayBar from '../components/PlayBar';
import WrapContent from '../components/WrapContent';

export default async function MainRootLayout({ children }: React.PropsWithChildren) {
  const accessToken = cookies().get('accessToken')?.value;
  const currentUserData = accessToken && (await fetchUserData(accessToken));
  console.log('currentUserData', currentUserData, 'accessToken', accessToken);

  const currentPlaylist = await fetchCurrentPlaylist();

  return (
    <div className="w-full h-screen text-[#282828] font-inter font-[400] leading-normal overflow-hidden">
      <div className="w-full h-full gap-y-2 p-2 bg-[rgb(35,36,38)]">
        <WrapContent>
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
                <div className="w-full h-[70vh] overflow-x-hidden overflow-y-scroll">{children}</div>
              </div>
            </MainContentWrap>
            <CurrentPlayDetail currentPlayList={currentPlaylist} />
          </div>

          <PlayBar player={null} />
        </WrapContent>
      </div>
    </div>
  );
}
