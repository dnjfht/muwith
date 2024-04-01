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

export const timeString = (durationTime: number) => {
  const totalSeconds = Math.floor(durationTime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedDuration = `${hours > 0 ? `${hours}:` : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return formattedDuration;
};

export const timeString2 = (durationTime: number) => {
  const totalSeconds = Math.floor(durationTime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedDuration = `${hours > 0 ? `${hours}시간 ` : ''}${minutes}분 ${seconds < 10 ? '0' : ''}${seconds}초`;

  return formattedDuration;
};

export function formatDate(dateString?: string) {
  if (dateString == null) return '-';

  const date = new Date(dateString);

  const year = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  return `${year}년 ${month}월 ${day}일`;
}
