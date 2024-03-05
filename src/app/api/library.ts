import { LibraryResponse } from '../types/api-responses/library';

export const fetchLibrarayData = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/04be41a9-0594-4033-aeb4-6ca1ac8e2e49', {
    cache: 'no-store',
  });
  const result: LibraryResponse = await res.json();
  return result.my_library;
};
