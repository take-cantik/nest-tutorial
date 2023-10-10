import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Tokyo');

export const getDateFromUnixTime = (unixTime: number) => {
  return dayjs(unixTime * 1000).format('YYYY-MM-DD');
};

export const getUnixTimeFromDate = (date: Date) => {
  return dayjs(date).unix();
};

export const now = (): string => {
  return dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]');
};
