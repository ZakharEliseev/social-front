/* eslint-disable no-restricted-imports */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';


dayjs.extend(relativeTime);
dayjs.locale('ru');

class DateService {
  public static formatRelative(isoString: string | undefined): string {
    return dayjs(isoString).fromNow();
  }
}

export default DateService;