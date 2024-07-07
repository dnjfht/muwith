import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const GOOGLE_API_CLIENT_ID = '307148926373-qbl3e9cpdkddgei9g83q9v0orhac8m6d.apps.googleusercontent.com';
  const GOOGLE_API_CLIENT_SECRET = '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';

  const googleAuthCode = searchParams.get('code');

  const googleIdToken = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: GOOGLE_API_CLIENT_ID,
      client_secret: GOOGLE_API_CLIENT_SECRET,
      code: googleAuthCode,
      redirect_uri: 'https://muwith.vercel.app/google-auth',
      //redirect_uri: 'http://localhost:3000/google-auth',
      grant_type: 'authorization_code',
    }),
  })
    .then((res) => res.json())
    .then((result) => result.id_token);

  // 회원가입이 되어 있지 않은 경우에만 회원가입 진행
  await fetch(process.env.NEXT_PUBLIC_BASE_URL2 + '/auth/signup-by-sso', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      platform: 'google',
      token: googleIdToken,
      name: `userName${Math.random()}`,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((result) => result)
    .catch((error) => {
      console.error('회원가입 중 오류 발생', error);
      if (error.status === 400) {
        // 이미 가입한 유저인 경우
        // 이미 가입된 회원이므로 넘어감
      } else {
        console.error('알 수 없는 오류가 발생했습니다.');
      }
    });

  // 로그인
  const accessToken = await fetch(process.env.NEXT_PUBLIC_BASE_URL2 + '/auth/transfer-sso-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      platform: 'google',
      token: googleIdToken,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((result) => result.accessToken)
    .catch((error) => {
      console.error('로그인 중 오류 발생', error);
      if (error.status === 401) {
        // Google 로그인에서 잘못된 토큰이 입력된 경우
        console.error('잘못된 Google ID token입니다.');
      } else if (error.status === 400) {
        // 잘못된 소셜 로그인 유형이 입력된 경우
        console.error('잘못된 SSO platform입니다.');
      } else if (error.status === 403) {
        // 회원가입 하지 않은 유저인 경우
        console.error('회원가입 하지 않은 유저입니다.');
      } else {
        console.error('알 수 없는 오류가 발생했습니다.');
      }
    });

  // 쿠키 설정
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set('accessToken', accessToken, { expires: Date.now() + oneDay });

  redirect('/');
}
