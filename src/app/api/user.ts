export const fetchUserData = async (accessToken: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL2 + '/user/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  });
  const result = await res.json();
  return result;
};
