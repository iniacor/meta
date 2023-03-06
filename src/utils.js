import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const formatDate = dateStr => {
  const date = new Date(dateStr);
  return format(date, 'HH:mm - dd MMMM yyyy', { locale: ru });
};

export default formatDate;
