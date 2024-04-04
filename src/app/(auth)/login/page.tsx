import Image from 'next/image';
import ButtonWrap from '@/app/components/ButtonWrap';

export default function Auth() {
  return (
    <div className="w-full h-screen 2xl:px-[92px] sm:px-10 px-10 2xl:py-[120px] sm:py-10 py-10 box-border flex 2xl:flex-row sm:flex-col flex-col items-center 2xk:justify-between gap-x-5 overflow-x-hidden 2xl:overflow-y-hidden">
      <div className="2xl:w-calc_1 2xl:order-1 sm:order-2 order-2 2xl:mt-0 sm:mt-12 mt-8 2xl:text-left sm:text-center text-center">
        <h1 className="md:text-[6.25rem] sm:text-[5.2rem] 2sm:text-[3rem] 3sm:text-[2.5rem] font-[900] leading-snug">
          음악 스트리밍 플렛폼
          <span className="italic">MUWITH.</span>
        </h1>

        <p className="sm:mt-0 mt-2 text-[#707070] md:text-[1.5rem] 2sm:text-[1.2rem] 3sm:text-[0.9rem]">
          언제 어디서나 기분과 분위기에 맞는 음악을 플레이하세요.
        </p>

        <div className="2xl:mt-[108px] sm:mt-16 mt-8 flex flex-col gap-y-3">
          <ButtonWrap />
        </div>
      </div>

      <div className="lg:w-[740px] sm:w-[540px] 2sm:w-[460px] 3sm:w-[250px] relative 2xl:order-2 sm:order-1 order-1">
        <Image width={720} height={720} src="/image/lp_record.png" alt="lp_record" priority />

        <Image
          className="lg:w-[320px] sm:w-[240px] 2sm:w-[200px] 3sm:w-[110px] absolute lg:top-[45%] sm:top-[26%] top-[26%] lg:mt-[-9rem] lg:left-[44%] sm:left-[27%] left-[28%] lg:ml-[-8.1rem] animate-spin"
          width={320}
          height={320}
          src="/image/lp_record_logo2.png"
          alt="lp_record_logo"
        />

        <Image
          className="lg:w-[200px] sm:w-[140px] 2sm:w-[120px] 3sm:w-[70px] absolute top-0 2sm:right-[-2%] 3sm:right-[-5%] rotate-6"
          width={353}
          height={554}
          src="/image/lp_record_2.png"
          alt="lp_record_2"
        />
      </div>
    </div>
  );
}
