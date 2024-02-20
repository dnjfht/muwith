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

export default function MainRootLayout({ children }: React.PropsWithChildren) {
  const [currentUserData, setCurrentUserData] = useState<CurrentUserData | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<CurrentPlaylistData | null>(null);
  const [openCurrentPlayTrackDetail, setOpenCurrentPlayTrackDetail] = useState<boolean>(false);

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

  return (
    <div className="w-full h-screen bg-[#ebebeb] text-[#282828] font-inter font-[400] leading-normal overflow-hidden">
      <div className="w-full h-full grid grid-rows-[10fr_1fr] gap-y-2 p-2 bg-[rgb(35,36,38)]">
        <div className="w-full flex">
          <Sidebar />
          <div className="w-full py-4 box-border bg-[#ebebeb] rounded-lg shadow-lg overflow-hidden">
            <Header currentUserData={currentUserData} />
            {children}
          </div>
          {openCurrentPlayTrackDetailBoolen && <CurrentPlayDetail />}
        </div>

        <PlayBar
          currentPlayList={current_play_list}
          setOpenCurrentPlayTrackDetail={setOpenCurrentPlayTrackDetail}
          openCurrentPlayTrackDetail={openCurrentPlayTrackDetail}
        />
      </div>
    </div>
  );
}
