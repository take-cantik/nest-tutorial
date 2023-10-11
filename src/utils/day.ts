import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Tokyo');

export const formatToDateFromUnixTime = (unixTime: number) => {
  return dayjs(unixTime * 1000).format('YYYY-MM-DD');
};

export const formatToUnixTimeFromDate = (date: Date) => {
  return dayjs(date).unix();
};

export const now = (): string => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
};

export const formatToStringFromDate = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export const formatToDateFromString = (date: string) => {
  return dayjs(date).toDate();
};
