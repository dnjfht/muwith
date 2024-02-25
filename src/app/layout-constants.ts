export const MIN_MENU_TITLE_WIDTH: number = 250;

export function convertSecondsToTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let result = '';
  if (hrs > 0) {
    result += `${hrs} : `;
  }
  if (mins >= 0) {
    result += `${mins} : `;
  }

  result += `${secs >= 10 ? Math.floor(secs) : `0${Math.floor(secs)}`}`;

  return result;
}

export function currentPlayTimePercent(currentTime: number, totalTime: number) {
  if (currentTime === 0.0 && totalTime === 0.0) {
    return 0;
  } else {
    return (currentTime / totalTime) * 100;
  }
}

export function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
