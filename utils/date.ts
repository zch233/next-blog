import dayjs from 'dayjs';

export const getFullDate = (date:dayjs.ConfigType) => dayjs(date).format('YYYY-MM-DD HH:mm:ss')