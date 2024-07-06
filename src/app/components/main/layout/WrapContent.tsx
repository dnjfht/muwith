'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  CurrentPlayListDataState,
  CurrentPlaylistRepeatClickNumState,
  CurrentPlaylistTitle,
  CurrentTrackDataState,
  CurrentTrackIndexState,
  OriginalCurrentPlayListDataState,
  TryCurrentPlaylistRandomModeState,
} from '../../../recoil/atoms/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { fetchSpotifyRecommendedTracksData, fetchSpotifyTrackDetailData } from '../../../api/spotify';
import { Track } from '../../../types/api-responses/track';

// window 객체에 직접 onYouTubeIframeAPIReady 메소드를 추가하는 부분은 TypeScript에서 에러를 발생시킬 수.
// TypeScript는 기본적으로 window 객체에 이와 같은 메소드가 없다고 가정하기 때문.
// 이를 해결하기 위해, window 객체에 대한 커스텀 인터페이스를 선언해야.
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
  const setCurrentPlaylistTitle = useSetRecoilState(CurrentPlaylistTitle);
  const currentPlaylistRepeatClickNum = useRecoilValue(CurrentPlaylistRepeatClickNumState);
  const [originalCurrentPlaylist, setOriginalCurrentPlaylist] = useRecoilState(OriginalCurrentPlayListDataState);
  const setTryCurrentPlaylistRandomMode = useSetRecoilState(TryCurrentPlaylistRandomModeState);

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
      setPlayer(
        new YT.Player('player', {
          height: '0', //변경가능-영상 높이
          width: '0', //변경가능-영상 너비
          videoId: videoId,
          playerVars: {
            autoplay: 1, // 자동재생여부
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
      //로딩된 후에 실행될 동작을 작성한다(소리 크기,동영상 속도를 미리 지정하는 것 등)
      event.target.playVideo(); //자동재생
    };

    const onPlayerStateChange = () => {};
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
    const localStorageOriginalCurrentPlaylist = localStorage.getItem('original_currentPlaylist');
    if (localStorageOriginalCurrentPlaylist) {
      setOriginalCurrentPlaylist(JSON.parse(localStorageOriginalCurrentPlaylist));
    }
  }, []);

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

  // 현재 재생 중인 플레이리스트의 맨 마지막 곡과 관련된 20개의 추천 곡
  useEffect(() => {
    if (currentTrackIndex !== -1 && currentPlaylist.length > 0) {
      const fetchRecommenedTrackList = async () => {
        setRecommenedTracks(await fetchSpotifyRecommendedTracksData(currentPlaylist[currentTrackIndex], 20));
      };
      fetchRecommenedTrackList();
    }
  }, [currentTrackIndex, currentPlaylist, setRecommenedTracks]);

  const recommenedTracksIdArr = recommendedTracks.map((track: { id: string }) => track.id);

  // 현재 재생 중인 플레이리스트 관련 로직
  useEffect(() => {
    let shouldUpdate = false;
    let updatedPlaylist = [...currentPlaylist];

    if (currentPlaylist.length - 1 === currentTrackIndex) {
      if (currentPlaylistRepeatClickNum % 3 === 0 && currentPlaylist.length <= 10000) {
        updatedPlaylist = [...updatedPlaylist, ...recommenedTracksIdArr];

        const addRecommended = [
          ...JSON.parse(localStorage.getItem('beforeShuffleCurrentPlaylist')!),
          ...recommenedTracksIdArr,
        ];
        localStorage.setItem('beforeShuffleCurrentPlaylist', JSON.stringify(addRecommended));
      } else if ((currentPlaylistRepeatClickNum - 1) % 3 === 0 || (currentPlaylistRepeatClickNum - 2) % 3 === 0) {
        updatedPlaylist = [...updatedPlaylist, ...originalCurrentPlaylist];

        const addRepeat = [
          ...JSON.parse(localStorage.getItem('beforeShuffleCurrentPlaylist')!),
          ...originalCurrentPlaylist,
        ];
        localStorage.setItem('beforeShuffleCurrentPlaylist', JSON.stringify(addRepeat));
      }
      shouldUpdate = true;
      setTryCurrentPlaylistRandomMode(true);
    }

    if (shouldUpdate) {
      setCurrentPlaylist(updatedPlaylist);
    }
  }, [recommenedTracksIdArr, currentPlaylist, currentTrackIndex, currentPlaylistRepeatClickNum]);
  console.log(currentPlaylist);

  useEffect(() => {
    if (
      ((currentPlaylistRepeatClickNum - 1) % 3 === 0 || (currentPlaylistRepeatClickNum - 2) % 3 === 0) &&
      currentPlaylist.length > 10000
    ) {
      setCurrentPlaylist((prev) => {
        return [...prev.slice(0, originalCurrentPlaylist.length)];
      });

      const sliceBeforeCurrentPlaylist = JSON.parse(localStorage.getItem('beforeShuffleCurrentPlaylist')!).slice(
        0,
        originalCurrentPlaylist.length,
      );
      localStorage.setItem(
        'beforeShuffleCurrentPlaylist',
        JSON.stringify(sliceBeforeCurrentPlaylist.slice(0, originalCurrentPlaylist.length)),
      );

      const arr = Array.from({ length: originalCurrentPlaylist.length }, (_, index) => index);

      arr.forEach((idx) => {
        if (originalCurrentPlaylist[idx] === currentTrackData?.id) {
          setCurrentTrackIndex(idx);
        }
      });
    }
  }, [currentPlaylist, currentTrackIndex, currentPlaylistRepeatClickNum, currentTrackData]);

  const [count, setCount] = useState(0);

  function countConsecutiveRepeats(original: string[], current: string[]) {
    const originalString = original.join(',') + ','; // 구분자를 추가하여 배열의 끝을 명확히 함
    const currentString = current.join(',') + ',';
    let index = 0;
    let count = 0;

    while (true) {
      index = currentString.indexOf(originalString, index);
      if (index === -1) break; // 더 이상 일치하는 부분이 없으면 반복 종료
      count++;
      index += originalString.length; // 다음 검색 시작 위치를 업데이트
    }

    return count;
  }

  useEffect(() => {
    if (currentPlaylist && originalCurrentPlaylist) {
      setCount(countConsecutiveRepeats(originalCurrentPlaylist, currentPlaylist));
    }
  }, [currentPlaylist, originalCurrentPlaylist]);

  useEffect(() => {
    if (
      currentPlaylistRepeatClickNum % 3 === 0 &&
      originalCurrentPlaylist.length - 1 < currentTrackIndex &&
      count > 1
    ) {
      setCurrentPlaylist((prev) => {
        return [...prev.slice(0, originalCurrentPlaylist.length)];
      });

      const arr = Array.from({ length: originalCurrentPlaylist.length }, (_, index) => index);

      arr.forEach((idx) => {
        if (originalCurrentPlaylist[idx] === currentTrackData?.id) {
          setCurrentTrackIndex(idx);
        }
      });
    }
  }, [
    originalCurrentPlaylist,
    currentPlaylist,
    currentTrackIndex,
    currentPlaylistRepeatClickNum,
    currentTrackData,
    count,
  ]);

  useEffect(() => {
    if ((currentPlaylistRepeatClickNum - 1) % 3 === 0 && currentTrackIndex === originalCurrentPlaylist.length - 1) {
      setCurrentPlaylist((prev) => {
        return [...prev.slice(0, originalCurrentPlaylist.length), ...originalCurrentPlaylist];
      });
    }
  }, [setCurrentPlaylist, currentTrackIndex, currentPlaylistRepeatClickNum, originalCurrentPlaylist]);

  useEffect(() => {
    const fetchCurrentListenTrackData = async () => {
      const trackId = currentPlaylist[currentTrackIndex];
      if (trackId == null) return;
      setCurrentTrackData(await fetchSpotifyTrackDetailData(trackId));
    };
    fetchCurrentListenTrackData();
  }, [currentTrackIndex, currentPlaylist, setCurrentTrackData]);

  useEffect(() => {
    if (typeof Window === 'undefined') return;

    const currentPlaylistTitle = localStorage.getItem('currentPlaylistTitle');
    if (currentPlaylistTitle) {
      setCurrentPlaylistTitle(currentPlaylistTitle);
    }
  }, []);

  const childrenWithProps = React.Children.map(children, (child) => {
    // 타입 검사를 통해 React 요소인지 확인.
    if (React.isValidElement(child)) {
      // @ts-expect-error Force inject player prop
      return React.cloneElement(child, { player });
    }
    return child;
  });

  return <div className="w-full h-full grid grid-rows-[8fr_1fr]">{childrenWithProps}</div>;
}
