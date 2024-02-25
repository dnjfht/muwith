'use client';

import React, { useEffect, useState } from 'react';
import { CurrentPlayList } from '../types';
import { useRouter } from 'next/navigation';

interface MainContentWrapProps {
  currentPlaylist: CurrentPlayList[];
}

// window 객체에 직접 onYouTubeIframeAPIReady 메소드를 추가하는 부분은 TypeScript에서 에러를 발생시킬 수 있습니다.
// TypeScript는 기본적으로 window 객체에 이와 같은 메소드가 없다고 가정하기 때문입니다.
// 이를 해결하기 위해, window 객체에 대한 커스텀 인터페이스를 선언해야 합니다.
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function WrapContent({ currentPlaylist, children }: React.PropsWithChildren<MainContentWrapProps>) {
  const router = useRouter();

  const [videoId, setVideoId] = useState<string>('');
  const [player, setPlayer] = useState<YT.Player | null>(null);

  useEffect(() => {
    if (!currentPlaylist[0]) {
      console.log('Current playlist is not defined');
      return;
    }

    (async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
            `${currentPlaylist[0]?.artist} ${currentPlaylist[0]?.title} Lyrics`,
          )}&part=snippet&maxResults=1&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
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
  }, [currentPlaylist[0]?.title, currentPlaylist[0]?.artist]);

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

  const childrenWithProps = React.Children.map(children, (child) => {
    // 타입 검사를 통해 React 요소인지 확인합니다.
    if (React.isValidElement(child)) {
      // child에 props를 추가합니다.
      return React.cloneElement(child, { player: player });
    }
    return child;
  });

  return <div>{childrenWithProps}</div>;
}
