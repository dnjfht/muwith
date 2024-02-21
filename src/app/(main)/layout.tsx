'use client';

import '../globals.css';
import Sidebar from '../components/Sidebar';
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
  const [videoId, setVideoId] = useState<string>('');

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
      const result = await fetch(process.env.NEXT_PUBLIC_BASE_URL2 + '/user/me', {
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
    if (!current_play_list[0]) {
      console.log('Current playlist is not defined');
      return;
    }

    (async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
            `${current_play_list[0]?.artist} ${current_play_list[0]?.title} Lyrics`,
          )}&part=snippet&maxResults=1&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY3}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const videoId = data.items[0].id.videoId;
          setVideoId(videoId);
        } else {
          console.log('No results found');
        }
      } catch (error) {
        console.error('Failed to fetch video ID:', error);
      }
    })();
  }, [current_play_list[0]?.title, current_play_list[0]?.artist]);

  useEffect(() => {
    if (!videoId) return;

    //youtube API 불러오는 부분
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';

    const firstScriptTag = document.getElementsByTagName('script')[0] as HTMLElement;
    if (firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    //플레이어 변수 설정
    window.onYouTubeIframeAPIReady = () => {
      if (!videoId) {
        console.log('Video ID has not been set yet');
        return;
      }

      setPlayer(
        new YT.Player('player', {
          height: '0', //변경가능-영상 높이
          width: '0', //변경가능-영상 너비
          videoId: videoId,
          playerVars: {
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
  }, [router, videoId]);

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
                width={0}
                height={0}
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
        />
      </div>
    </div>
  );
}
