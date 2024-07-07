'use client';

import SnsButton from './SnsButton';

export default function SnsButtonWrap() {
  function doGoogleLogin() {
    const url =
      'https://accounts.google.com/o/oauth2/v2/auth?client_id=307148926373-qbl3e9cpdkddgei9g83q9v0orhac8m6d.apps.googleusercontent.com&redirect_uri=https://muwith.vercel.app/google-auth&response_type=code&scope=email profile';
    // 'https://accounts.google.com/o/oauth2/v2/auth?client_id=307148926373-qbl3e9cpdkddgei9g83q9v0orhac8m6d.apps.googleusercontent.com&redirect_uri=http://localhost:3000/google-auth&response_type=code&scope=email profile';

    window.location.href = url;
  }

  return (
    <>
      <SnsButton onClick={doGoogleLogin} type="button" btnText="Google 로그인" disabled={false} />
      <SnsButton type="button" btnText="Kakao 로그인" disabled={true} />
    </>
  );
}
