'use client';

import { BsFillPlayFill } from 'react-icons/bs';
import { PiHeart } from 'react-icons/pi';
import { RiMoreLine } from 'react-icons/ri';
import { useSetRecoilState } from 'recoil';
import { CurrentPlayListDataState, CurrentTrackIndexState } from '../recoil/atoms/atom';
import { MuwithObject, MuwithObjectType } from '../types/api-responses/global';
import { Album } from '../types/api-responses/album';

interface DetailContentTopType {
  type: string;
  data: MuwithObject;
  artistTopTracksData?: ArtistTopTracksDataType[];
}

interface ArtistTopTracksDataType {
  id: string;
}

export default function DetailContentTop({ type, data, artistTopTracksData }: DetailContentTopType) {
  const setCurrentPlaylist = useSetRecoilState(CurrentPlayListDataState);
  const setCurrentTrackIndex = useSetRecoilState(CurrentTrackIndexState);

  const trackIdArr =
    type === MuwithObjectType.ALBUM || type === MuwithObjectType.PLAYLIST
      ? (data as Album).tracks.map((track: { id: string }) => track.id)
      : artistTopTracksData?.map((data) => data.id);

  const pushTrackIdArr: string[] = [];
  pushTrackIdArr.push(data.id);

  return (
    <div className="w-full mb-8 flex items-center gap-x-5 text-[2rem] text-white">
      <button
        className="w-14 h-14 bg-[#1d1e22] border-[1px] border-solid border-white rounded-full flex items-center justify-center text-white"
        onClick={() => {
          if (typeof Window !== 'undefined') {
            if (type !== MuwithObjectType.TRACK) {
              setCurrentPlaylist(trackIdArr ?? []);
            } else if (type === MuwithObjectType.TRACK) {
              setCurrentPlaylist(pushTrackIdArr);
            }
            setCurrentTrackIndex(0);
          }
        }}
      >
        <BsFillPlayFill />
      </button>
      {type !== MuwithObjectType.ARTIST && (
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
