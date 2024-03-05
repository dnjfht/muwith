'use client';

import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PageWidthState } from '../recoil/atoms/atom';

export default function TabContainer() {
  const router = useRouter();
  const params = useParams().searchText;
  const searchType = useParams().searchType;
  const tabState =
    params && !searchType
      ? 0
      : params && searchType === 'albums'
        ? 1
        : params && searchType === 'playlists'
          ? 2
          : params && searchType === 'tracks'
            ? 3
            : params && searchType === 'artists'
              ? 4
              : 0;

  const pageWidth = useRecoilValue(PageWidthState);

  const [isClient, setIsClient] = useState<boolean>(false);
  const [value, setValue] = useState(
    typeof Window !== 'undefined' && sessionStorage.getItem('tabState')
      ? Number(sessionStorage.getItem('tabState'))
      : 0,
  );

  const handleChange = (event: React.SyntheticEvent<Element, Event> | null, newValue: string | number | null) => {
    const text = newValue === 1 ? 'albums' : newValue === 2 ? 'playlists' : newValue === 3 ? 'tracks' : 'artists';
    setValue(newValue as number);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('tabState', String(newValue));
    }

    switch (newValue) {
      case 0:
        router.push(`/search/${params}`);
        break;
      case 1:
        router.push(`/search/${params}/${text}`);
        break;
      case 2:
        router.push(`/search/${params}/${text}`);
        break;
      case 3:
        router.push(`/search/${params}/${text}`);
        break;
      case 4:
        router.push(`/search/${params}/${text}`);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && params) {
      sessionStorage.setItem('tabState', String(tabState));
      setValue(tabState);
    }
  }, [params, tabState]);

  return (
    <>
      {isClient && (
        <div
          className="mx-6 bg-[#ebebeb] border-b-[2px] border-solid border-[#2c3341] fixed top-[100px]"
          style={{ width: `${pageWidth ? `${pageWidth - 48}px` : 'w-[90%]'}` }}
        >
          <Tabs defaultValue={value} onChange={handleChange}>
            <TabsList>
              <Tab value={0}>모두</Tab>
              <Tab value={1}>앨범</Tab>
              <Tab value={2}>플레이리스트</Tab>
              <Tab value={3}>곡</Tab>
              <Tab value={4}>아티스트</Tab>
            </TabsList>
          </Tabs>
        </div>
      )}
    </>
  );
}

const black = {
  50: '#F0F7FF',
  200: '#80BFFF',
  400: '#232426',
  500: '#007FFF',
};

const Tab = styled(BaseTab)`
  color: #232426;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  width: 100%;
  line-height: 1.5;
  padding: 8px 12px;
  margin-top: 10px;
  margin-right: 10px;
  border: 2px dotted #232426;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: center;

  &:hover {
    color: white;
    background-color: ${black[400]};
    transition: all 0.5s;
    transition-duration: 750;
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${black[200]};
  }

  &.${tabClasses.selected} {
    background-color: #232426;
    color: ${black[50]};
    transition: all 0.5s;
    transition-duration: 750;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(BaseTabsList)(
  () => `
  min-width: 400px;
  width:50%;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  outline: none;
  `,
);
