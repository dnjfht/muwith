'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CurrentPlayListDataState, CurrentTrackDataState, CurrentTrackIndexState } from '../../../recoil/atoms/atom';
import { useRecoilState } from 'recoil';
import { fetchSpotifyRecommendedTracksData, fetchSpotifyTrackDetailData } from '../../../api/spotify';
import { Track } from '../../../types/api-responses/track';

// window 객체에 직접 onYouTubeIframeAPIReady 메소드를 추가하는 부분은 TypeScript에서 에러를 발생시킬 수 있습니다.
// TypeScript는 기본적으로 window 객체에 이와 같은 메소드가 없다고 가정하기 때문입니다.
// 이를 해결하기 위해, window 객체에 대한 커스텀 인터페이스를 선언해야 합니다.
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function WrapContent({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const params = useParams().searchText;

  const [currentPlaylist, setCurrentPlaylist] = useRecoilState(CurrentPlayListDataState);
  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(CurrentTrackIndexState);
  const [currentTrackData, setCurrentTrackData] = useRecoilState(CurrentTrackDataState);
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [recommendedTracks, setRecommenedTracks] = useState<Omit<Track, 'youtubeUrl'>[]>([]);

  const selectVideoID = currentTrackData?.youtubeUrl?.split('v=')[1];
  const videoId =
    selectVideoID?.indexOf('&') !== -1 ? selectVideoID?.substring(0, selectVideoID?.indexOf('&')) : selectVideoID;

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

  useEffect(() => {
    if (videoId && player && player.loadVideoById) {
      player.loadVideoById(videoId);
    }
  }, [videoId, player]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !params) {
      sessionStorage.setItem('tabState', '0');
    }
  }, [params]);

  useEffect(() => {
    if (typeof Window === 'undefined') return;

    const localStorageCurrentPlaylist = localStorage.getItem('currentPlaylist');
    if (localStorageCurrentPlaylist) {
      setCurrentPlaylist(JSON.parse(localStorageCurrentPlaylist));
    }
  }, [setCurrentPlaylist]);

  useEffect(() => {
    if (typeof Window === 'undefined') return;

    const localStorageCurrentTrackIndex = localStorage.getItem('currentTrackIndex');
    if (localStorageCurrentTrackIndex) {
      setCurrentTrackIndex(JSON.parse(localStorageCurrentTrackIndex));
    }
  }, [setCurrentTrackIndex]);

  useEffect(() => {
    if (typeof Window === 'undefined' || currentPlaylist.length === 0) return;
    localStorage.setItem('currentPlaylist', JSON.stringify(currentPlaylist));
  }, [currentPlaylist]);

  useEffect(() => {
    if (typeof Window === 'undefined' || currentTrackIndex === -1) return;
    localStorage.setItem('currentTrackIndex', JSON.stringify(currentTrackIndex));
  }, [currentTrackIndex]);

  useEffect(() => {
    if (currentTrackIndex !== -1 && currentPlaylist.length > 0) {
      const fetchRecommenedTrackList = async () => {
        setRecommenedTracks(await fetchSpotifyRecommendedTracksData(currentPlaylist[currentTrackIndex], 20));
      };
      fetchRecommenedTrackList();
    }
  }, [currentTrackIndex, currentPlaylist, setRecommenedTracks]);

  const recommenedTracksIdArr = recommendedTracks.map((track: { id: string }) => track.id);

  useEffect(() => {
    if (recommenedTracksIdArr?.length > 0 && currentPlaylist.length - 1 === currentTrackIndex) {
      setCurrentPlaylist((prev) => [...prev, ...recommenedTracksIdArr]);
    }
  }, [recommenedTracksIdArr, currentPlaylist, currentTrackIndex]);

  useEffect(() => {
    const fetchCurrentListenTrackData = async () => {
      const trackId = currentPlaylist[currentTrackIndex];
      if (trackId == null) return;
      setCurrentTrackData(await fetchSpotifyTrackDetailData(trackId));
    };
    fetchCurrentListenTrackData();
  }, [currentTrackIndex, currentPlaylist, setCurrentTrackData]);

  const childrenWithProps = React.Children.map(children, (child) => {
    // 타입 검사를 통해 React 요소인지 확인합니다.
    if (React.isValidElement(child)) {
      // @ts-expect-error Force inject player prop
      return React.cloneElement(child, { player });
    }
    return child;
  });

  return <div className="w-full h-full grid grid-rows-[8fr_1fr]">{childrenWithProps}</div>;
}
