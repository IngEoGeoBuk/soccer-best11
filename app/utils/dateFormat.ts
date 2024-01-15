import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import advanced from 'dayjs/plugin/advancedFormat';

export default function dateFormat(date: Date) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(advanced);
  const yourTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return dayjs(date).tz(yourTz).format('YYYY.MM.DD HH:mm');
}
