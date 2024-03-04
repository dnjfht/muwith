'use client';

import { useEffect } from 'react';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { PiHeart, PiHeartFill } from 'react-icons/pi';
import { RiMoreLine } from 'react-icons/ri';
import { useRecoilState } from 'recoil';
import { CurrentPlayListDataState, CurrentTrackDataState, CurrentTrackIndexState } from '../recoil/atoms/atom';
import { fetchSpotifyAlbumDetailData } from '../api/spotify';

interface DetailContentTopType {
  type: string;
  data: { id: string; tracks: TracksType[] };
  artistTopTracksData?: ArtistTopTracksDataType[];
}

interface TracksType {
  id: string;
}

interface ArtistTopTracksDataType {
  id: string;
}

export default function DetailContentTop({ type, data, artistTopTracksData }: DetailContentTopType) {
  const [currentPlaylist, setCurrentPlaylist] = useRecoilState(CurrentPlayListDataState);
  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(CurrentTrackIndexState);
  const [currentTrackData, setCurrentTrackData] = useRecoilState(CurrentTrackDataState);

  const trackIdArr =
    type === 'album' || type === 'playlist'
      ? data?.tracks?.map((track: { id: string }) => track.id)
      : artistTopTracksData?.map((data) => data.id);

  let pushTrackIdArr: string[] = [];
  pushTrackIdArr.push(data.id);

  return (
    <div className="w-full mb-8 flex items-center gap-x-5 text-[2rem] text-white">
      <button
        className="w-14 h-14 bg-[#1d1e22] border-[1px] border-solid border-white rounded-full flex items-center justify-center text-white"
        onClick={() => {
          if (typeof Window !== 'undefined') {
            if (type !== 'track') {
              setCurrentPlaylist(trackIdArr as string[]);
            } else if (type === 'track') {
              setCurrentPlaylist(pushTrackIdArr);
            }
            setCurrentTrackIndex(0);
          }
        }}
      >
        <BsFillPlayFill />
      </button>
      {type !== 'artist' && (
        <>
          <button>
            <PiHeart />
          </button>
          <button className="text-[#a1a1a1]">
            <RiMoreLine />
          </button>
        </>
      )}
    </div>
  );
}
