'use client';

import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

interface HeaderProps {
  currentUserData: {
    id: number;
    loginId: string;
    name: string;
  } | null;
}

export default function Header({ currentUserData }: HeaderProps) {
  const [pageHistory, setPageHistory] = useState<string[]>([]);
  const [currentHistoryCursor, setCurrentHistoryCursor] = useState<number>(0);
  const [navigationTrigger, setNavigationTrigger] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  return (
    <div className="w-full px-6 pb-4 box-border bg-[#ebebeb] flex justify-between items-center">
      <div className="w-full flex gap-x-2">
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

      <div className="cursor-pointer">
        <CustomTooltip title={currentUserData?.name} placement="right" leaveDelay={800}>
          <Image
            width={24}
            height={0}
            className="w-[1.875rem] aspect-square rounded-full shadow-lg"
            src="/image/default_profile_img.jpg"
            alt="profile_img"
          />
        </CustomTooltip>
      </div>
    </div>
  );
}
