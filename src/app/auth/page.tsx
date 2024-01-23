import Button from "../Button";

export default function Auth() {
  return (
    <div className="w-full h-screen px-[92px] py-[120px] box-border flex items-center justify-between overflow-hidden">
      <div>
        <h1 className="text-[6.25rem] font-[900] leading-snug">
          음악 스트리밍 플렛폼
          <br />
          <span className="italic">MUWITH.</span>
        </h1>

        <p className="text-[#707070] text-[1.5rem]">
          인제 어디서나 기분과 분위기에 맞는 음악을 플레이하세요.
        </p>

        <div className="mt-[108px] flex flex-col gap-y-3">
          <Button type="button" btnText="Google 로그인" disabled={false} />
          <Button type="button" btnText="Kakao 로그인" disabled={false} />
          <Button
            type="button"
            btnText="아직 계정이 없다면? : MUWOTH 회원가입 하기"
            disabled={false}
          />
        </div>
      </div>

      <div className="relative">
        <div className="animate-spin">
          <img
            className="w-[740px]"
            src="./image/lp_record.png"
            alt="lp_record"
          />

          <img
            className="absolute top-[50%] mt-[-9rem] left-[50%] ml-[-8.3125rem]"
            src="./image/lp_record_logo.png"
            alt="lp_record_logo"
          />
        </div>

        <img
          className="w-[300px] absolute top-[0] right-[-50px] rotate-6"
          src="./image/lp_record_2.png"
          alt="lp_record_2"
        />
      </div>
    </div>
  );
}
