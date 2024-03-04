export const fetchOftenListenData = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/04be41a9-0594-4033-aeb4-6ca1ac8e2e49', {
    cache: 'no-store',
  });
  const result = await res.json();
  return await result.often_listen;
};

export const fetchListenAgainRecommened = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/04be41a9-0594-4033-aeb4-6ca1ac8e2e49', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await res.json();
    return await result.listen_again_recommened;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
};

export const fetchListenAgainRecommened2 = async (title: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/04be41a9-0594-4033-aeb4-6ca1ac8e2e49', {
    cache: 'no-store',
  });
  const result = await res.json();
  return await result[title];
};
