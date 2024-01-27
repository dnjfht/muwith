'use client';

import Link from 'next/link';

import { HiOutlineHome, HiHome } from 'react-icons/hi2';
import { GoSearch } from 'react-icons/go';
import { usePathname } from 'next/navigation';

interface Props {
  LinkHref: string;
  menuTitle: string;
  width: number;
}

const SidebarMenu = ({ LinkHref, menuTitle, width }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={LinkHref}
      className={`${(menuTitle === '홈' && pathname === '/') || (menuTitle === '검색하기' && pathname === '/search') ? '' : 'text-[rgba(40,40,40,0.3)]'} flex items-center gap-x-3 hover:text-[rgba(40,40,40,1)] transition-all duration-500 font-bold`}
    >
      {menuTitle === '홈' && pathname === '/' ? (
        <HiHome />
      ) : menuTitle === '홈' && pathname !== '/' ? (
        <HiOutlineHome />
      ) : (
        <GoSearch />
      )}

      <p className={`${width > 250 ? 'block' : 'hidden'} text-[1rem]`}>{menuTitle}</p>
    </Link>
  );
};

export default SidebarMenu;
