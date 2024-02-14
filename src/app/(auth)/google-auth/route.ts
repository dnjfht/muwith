import { BASE_URL2 } from '@/app/api/common';
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
      redirect_uri: 'http://localhost:3000/google-auth',
      grant_type: 'authorization_code',
    }),
  })
    .then((res) => res.json())
    .then((result) => result.id_token);

  // 회원가입
  const signUpInfo = await fetch(BASE_URL2 + '/auth/signup-by-sso', {
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
    .then((res) => res.json())
    .then((result) => result);

  // 로그인
  const accessToken = await fetch(BASE_URL2 + '/auth/transfer-sso-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      platform: 'google',
      token: googleIdToken,
    }),
  })
    .then((res) => res.json())
    .then((result) => result.accessToken);

  console.log('get accessToken', accessToken);

  // 쿠키 설정
  cookies().set('accessToken', accessToken);

  redirect('/');
}
