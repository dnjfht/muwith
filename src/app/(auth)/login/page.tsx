import Image from 'next/image';
import ButtonWrap from '@/app/components/ButtonWrap';

export default function Auth() {
  return (
    <div className="w-full h-screen px-[92px] py-[120px] box-border flex items-center justify-between overflow-hidden">
      <div className="w-calc_1">
        <h1 className="text-[6.25rem] font-[900] leading-snug">
          음악 스트리밍 플렛폼
          <span className="italic">MUWITH.</span>
        </h1>

        <p className="text-[#707070] text-[1.5rem]">인제 어디서나 기분과 분위기에 맞는 음악을 플레이하세요.</p>

        <div className="mt-[108px] flex flex-col gap-y-3">
          <ButtonWrap />
        </div>
      </div>

      <div className="w-[740px] relative">
        <div className="animate-spin">
          <Image className="w-[740px]" width={740} height={0} src="/image/lp_record.png" alt="lp_record" />

          <Image
            className="absolute top-[50%] mt-[-9rem] left-[50%] ml-[-8.1rem]"
            width={260}
            height={0}
            src="/image/lp_record_logo.png"
            alt="lp_record_logo"
          />
        </div>

        <Image
          className="w-[300px] absolute top-[0] right-[-50px] rotate-6"
          width={353}
          height={0}
          src="/image/lp_record_2.png"
          alt="lp_record_2"
        />
      </div>
    </div>
  );
}
