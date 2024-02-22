// Youtube 영상의 재생된 시간 / 총 재생 시간 / 재생 상태 얻기 / 볼륨 음소거
export function getPlayerMethodValue(
  player: YT.Player | null,
  methodName: 'getCurrentTime' | 'getDuration' | 'getPlayerState' | 'isMuted',
  defaultValue: number | boolean,
): number | boolean {
  if (player && typeof player[methodName] === 'function') {
    return player[methodName]();
  }
  return defaultValue;
}
