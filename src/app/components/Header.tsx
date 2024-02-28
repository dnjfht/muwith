'use client';

import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import Image from 'next/image';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AppPage } from '../types';

import { GoChevronLeft, GoChevronRight, GoX } from 'react-icons/go';
import { CiSearch } from 'react-icons/ci';

interface HeaderProps {
  currentUserData: {
    id: number;
    loginId: string;
    name: string;
    profileImage: string;
  } | null;
}

export default function Header({ currentUserData }: HeaderProps) {
  const [pageHistory, setPageHistory] = useState<string[]>([]);
  const [currentHistoryCursor, setCurrentHistoryCursor] = useState<number>(0);
  const [navigationTrigger, setNavigationTrigger] = useState(false);
  const [searchText, setSearchText] = useState<string>('');

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchPageBoolean = pathname.includes(AppPage.SEARCH);
  const params = useParams();
  const searchTxt = params.searchText && decodeURIComponent(params?.searchText as string);
  const searchType = useParams()?.searchType;

  console.log(searchTxt);

  useEffect(() => {
    if (navigationTrigger) {
      setNavigationTrigger(false);
    } else {
      const newPageHistory = [...pageHistory].slice(0, currentHistoryCursor);
      setPageHistory([...newPageHistory, `${pathname}${searchParams}`]);
      setCurrentHistoryCursor(currentHistoryCursor + 1);
    }
  }, [pathname, searchParams]);

  const router = useRouter();

  const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      zIndex: 99999,
      backgroundColor: '#232426',
      color: 'white',
      boxShadow: theme.shadows[6],
      maxWidth: 200,
      fontSize: 12,
      border: '1px solid #656565',
    },
  }));

  const buttonDisablePrev = currentHistoryCursor === 1;
  const buttonDisableNext = currentHistoryCursor === pageHistory.length;

  useEffect(() => {
    if (searchTxt) {
      setSearchText(searchTxt);
    } else if (!searchTxt) {
      setSearchText('');
    }
  }, [searchTxt]);

  return (
    <div className="w-full px-6 pt-6 pb-2 box-border">
      <div className="w-full mb-6 bg-[#ebebeb] flex justify-between items-center gap-x-4">
        <div className="flex gap-x-2">
          <button
            onClick={() => {
              setCurrentHistoryCursor((v) => v - 1);
              router.push(pageHistory[currentHistoryCursor - 2]);
              setNavigationTrigger(true);
            }}
            className={`${buttonDisablePrev ? 'bg-[rgba(35,36,38,0.3)] text-[rgba(255,255,255,0.6)]' : 'bg-[#232426] text-white'} w-[1.875rem] h-[1.875rem] rounded-full text-[1.6rem] flex items-center justify-center`}
            disabled={buttonDisablePrev}
          >
            <GoChevronLeft />
          </button>
          <button
            onClick={() => {
              setCurrentHistoryCursor((v) => v + 1);
              router.push(pageHistory[currentHistoryCursor]);
              setNavigationTrigger(true);
            }}
            className={`${buttonDisableNext ? 'bg-[rgba(35,36,38,0.3)] text-[rgba(255,255,255,0.6)]' : 'bg-[#232426] text-white'} w-[1.875rem] h-[1.875rem] rounded-full text-[1.6rem] flex items-center justify-center`}
            disabled={buttonDisableNext}
          >
            <GoChevronRight />
          </button>
        </div>

        <div className={`${!searchPageBoolean && 'hidden'} relative w-full group text-white`}>
          <CiSearch className="absolute top-[28%] left-4 text-[1.4rem]" />
          <input
            className="w-full h-[3rem] px-12 py-5 box-border bg-gradient-to-r from-[#232426] to-transparent border-[2px] border-solid  rounded-3xl text-[0.9375rem] placeholder:text-[#a1a1a1] shadow-[0_3px_6px_2px_rgba(0,0,0,0.2)] outline-none"
            type="text"
            placeholder="어떤 검색어를 입력하고 싶으세요?"
            onChange={(e) => {
              setSearchText(e.target.value);
              router.push(`/search/${e.target.value}`);
            }}
            value={searchText}
          />
          <button
            className="text-[#959597] text-[1.8rem] absolute top-[10px] right-2 opacity-100"
            disabled={searchText?.length === 0}
          >
            <GoX
              onClick={() => {
                setSearchText('');
              }}
              className={`${searchText?.length === 0 ? 'opacity-0' : 'opacity-100'} transition-all duration-700`}
            />
          </button>
        </div>

        <div className="cursor-pointer">
          <CustomTooltip
            title={currentUserData?.name}
            placement={!searchPageBoolean ? 'right' : 'top'}
            leaveDelay={800}
          >
            {currentUserData && currentUserData.profileImage ? (
              <Image
                width={24}
                height={24}
                className="w-[1.875rem] aspect-square rounded-full shadow-lg"
                src={currentUserData.profileImage}
                alt="profile_img"
              />
            ) : (
              <Image
                width={24}
                height={24}
                className="w-[1.875rem] aspect-square rounded-full shadow-lg"
                src="/image/default_profile_img.jpg"
                alt="profile_img"
              />
            )}
          </CustomTooltip>
        </div>
      </div>
    </div>
  );
}
