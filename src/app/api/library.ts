import { BASE_URL } from './common';

export const fetchLibrarayData = async () => {
  const res = await fetch(BASE_URL + '/04be41a9-0594-4033-aeb4-6ca1ac8e2e49', { cache: 'no-store' });
  const result = await res.json();
  return await result.my_library;
};
