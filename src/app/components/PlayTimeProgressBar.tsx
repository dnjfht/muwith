export function PlayTimeProgressBar({
  playTimePercent,
  player,
}: {
  playTimePercent: number;
  player: YT.Player | null;
}) {
  const handleProgressBarClick = (clickPercent: number) => {
    if (player) {
      const newTimePosition = (clickPercent / 100) * player.getDuration();
      player.seekTo(newTimePosition, true);
    }
  };

  // TypeScript는 타입 안전성을 보장하기 위해 event.target이 null이 될 수 있다고 경고하고 있습니다.
  // 이는 event.target이 항상 DOM 요소를 가리키지 않을 수 있기 때문입니다.
  // 예를 들어, 이벤트가 버블링되어 상위 요소로 전파되거나, 이벤트 핸들러가 호출된 시점에 해당 요소가 DOM에서 제거된 경우 등에 event.target은 null이 될 수 있습니다.

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = event.currentTarget as HTMLElement;
    const progressBarStart = targetElement.getBoundingClientRect().left;
    const clickPositionInProgressBar = event.clientX - progressBarStart;
    const progressBarWidth = targetElement.clientWidth;
    const clickPercent = (clickPositionInProgressBar / progressBarWidth) * 100;

    handleProgressBarClick(clickPercent);
  };

  return (
    <div onClick={handleClick} className="w-[86%] h-[6px] border-[1px] border-solid border-white rounded-2xl">
      <div className="bg-white h-full rounded-2xl relative" style={{ width: `${playTimePercent}%` }}>
        <div className="w-3 h-3 bg-white rounded-full absolute right-[-6px] top-[-4px] shadow-[-6px_0_6px_2px_rgba(0,0,0,0.2)]" />
      </div>
    </div>
  );
}
