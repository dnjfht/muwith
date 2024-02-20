'use client';

import '../globals.css';
import Sidebar from '../components/Sidebar';
import { BASE_URL2 } from '../api/common';
import { useCookies } from 'next-client-cookies';
import PlayBar from '../components/PlayBar';
import CurrentPlayDetail from '../components/CurrentPlayDetail';
import { fetchCurrentPlaylist } from '../api/playlist_api';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';

interface CurrentUserData {
  id: number;
  loginId: string;
  name: string;
}

interface CurrentPlaylistData {
  current_playlist_title: string;
  current_play_list: {
    id: string;
    type: string;
    thumbnail: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    isLikeSong: boolean;
  }[];
}

// window 객체에 직접 onYouTubeIframeAPIReady 메소드를 추가하는 부분은 TypeScript에서 에러를 발생시킬 수 있습니다.
// TypeScript는 기본적으로 window 객체에 이와 같은 메소드가 없다고 가정하기 때문입니다.
// 이를 해결하기 위해, window 객체에 대한 커스텀 인터페이스를 선언해야 합니다.
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function MainRootLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();

  const [currentUserData, setCurrentUserData] = useState<CurrentUserData | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<CurrentPlaylistData | null>(null);
  const [openCurrentPlayTrackDetail, setOpenCurrentPlayTrackDetail] = useState<boolean>(false);
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [musicPlayState, setMusicPlayState] = useState<boolean>(false);

  const getCurrentPlayList = async () => {
    setCurrentPlaylist(await fetchCurrentPlaylist());
  };

  useEffect(() => {
    getCurrentPlayList();
  }, []);

  const { current_play_list } = currentPlaylist ?? { current_play_list: [] };

  const cookies = useCookies();
  const accessToken = cookies.get('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(BASE_URL2 + '/user/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      });
      const data = await result.json();
      setCurrentUserData(data);
    };

    fetchData();
  }, [accessToken]);

  const openCurrentPlayTrackDetailBoolen = current_play_list && openCurrentPlayTrackDetail;

  useEffect(() => {
    //youtube API 불러오는 부분
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';

    const firstScriptTag = document.getElementsByTagName('script')[0] as HTMLElement;
    if (firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    //플레이어 변수 설정
    window.onYouTubeIframeAPIReady = () => {
      setPlayer(
        new YT.Player('player', {
          height: '0', //변경가능-영상 높이
          width: '0', //변경가능-영상 너비
          videoId: 'dNDJcSU8Sa4',
          playerVars: {
            rel: 0, //연관동영상 표시여부(0:표시안함)
            controls: 1, //플레이어 컨트롤러 표시여부(0:표시안함)
            autoplay: 0, //자동재생 여부(1:자동재생 함, mute와 함께 설정)
            mute: 0, //음소거여부(1:음소거 함)
            loop: 1, //반복재생여부(1:반복재생 함)
          },
          events: {
            onReady: onPlayerReady, //로딩중에 이벤트 실행한다
            onStateChange: onPlayerStateChange, //플레이어 상태 변화 시 이벤트를 실행한다.
          },
        }),
      );
    };

    const onPlayerReady = (event: YT.PlayerEvent) => {
      //로딩된 후에 실행될 동작을 작성한다(소리 크기,동영상 속도를 미리 지정하는 것등등...)
      event.target.playVideo(); //자동재생
    };

    const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
      if (event.data === YT.PlayerState.ENDED) {
        router.push('/');
      }
    };
  }, [router]);

  return (
    <div className="w-full h-screen bg-[#ebebeb] text-[#282828] font-inter font-[400] leading-normal overflow-hidden">
      <div className="w-full h-full grid grid-rows-[10fr_1fr] gap-y-2 p-2 bg-[rgb(35,36,38)]">
        <div className="w-full flex">
          <Sidebar />
          <div className="w-full py-4 box-border bg-[#ebebeb] rounded-lg shadow-lg overflow-hidden">
            <Header currentUserData={currentUserData} />

            <div id="player">
              <iframe
                id="player"
                src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
              ></iframe>
            </div>
            {children}
          </div>
          {openCurrentPlayTrackDetailBoolen && <CurrentPlayDetail />}
        </div>

        <PlayBar
          currentPlayList={current_play_list}
          setOpenCurrentPlayTrackDetail={setOpenCurrentPlayTrackDetail}
          openCurrentPlayTrackDetail={openCurrentPlayTrackDetail}
          player={player}
          musicPlayState={musicPlayState}
          setMusicPlayState={setMusicPlayState}
        />
      </div>
    </div>
  );
}
