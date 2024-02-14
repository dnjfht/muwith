'use client';

import Button from './Button';

export default function ButtonWrap() {
  function doGoogleLogin() {
    const url =
      'https://accounts.google.com/o/oauth2/v2/auth?client_id=307148926373-qbl3e9cpdkddgei9g83q9v0orhac8m6d.apps.googleusercontent.com&redirect_uri=http://localhost:3000/google-auth&response_type=code&scope=email profile';

    window.location.href = url;
  }

  return (
    <>
      <Button onClick={doGoogleLogin} type="button" btnText="Google 로그인" disabled={false} />
      <Button type="button" btnText="Kakao 로그인" disabled={false} />
      <Button type="button" btnText="아직 계정이 없다면? : MUWOTH 회원가입 하기" disabled={false} />
    </>
  );
}
