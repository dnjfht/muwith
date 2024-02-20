import OftenListenMusic from '../components/OftenListenMusic';

export default function Home() {
  const date = new Date();
  const hour = date.getHours();

  const time = hour > 6 && hour < 12 ? 'morning' : hour > 12 && hour < 18 ? 'afternoon' : 'evening';

  return (
    <div className="w-full h-full px-6 pt-6 pb-24 box-border overflow-scroll">
      <h1 className="text-[2rem] font-bold">{`${time === 'morning' ? '아침 햇살이 창문을 통해 살며시 들어오는 희망 가득한 아침입니다.' : time === 'afternoon' ? '따뜻한 햇빛이 마음까지 환하게 하는 오후입니다.' : '별이 가득한 하늘 아래, 편안한 밤입니다.'}`}</h1>

      <OftenListenMusic />
    </div>
  );
}
