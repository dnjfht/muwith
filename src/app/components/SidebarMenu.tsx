import Link from 'next/link';

import { HiOutlineHome, HiHome } from 'react-icons/hi2';
import { GoSearch } from 'react-icons/go';
import { AppPage } from '../types';

interface SidebarMenuProps {
  LinkHref: string;
  menuTitle: string;
  isHiddenMenuTitle: boolean;
  pathname: string;
}

const SidebarMenu = ({ LinkHref, menuTitle, isHiddenMenuTitle, pathname }: SidebarMenuProps) => {
  const isPointLink =
    (menuTitle === '홈' && pathname === AppPage.HOME) || (menuTitle === '검색하기' && pathname === AppPage.SEARCH);
  const linkTextColor = isPointLink ? '' : 'text-[#2828284c]';

  return (
    <Link
      href={LinkHref}
      className={`${linkTextColor} flex items-center gap-x-3 hover:text-[rgba(40,40,40,1)] transition-all duration-500 font-bold`}
    >
      {menuTitle === '홈' && pathname === AppPage.HOME ? (
        <HiHome />
      ) : menuTitle === '홈' && pathname !== AppPage.HOME ? (
        <HiOutlineHome />
      ) : (
        <GoSearch />
      )}

      <p className={`${isHiddenMenuTitle ? 'hidden' : 'block'} text-[1rem]`}>{menuTitle}</p>
    </Link>
  );
};

export default SidebarMenu;
