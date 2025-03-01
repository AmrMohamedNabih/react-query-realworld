const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const convertToDate = (datetime?: string) => {
  if (!datetime) return 'Invalid Date';
  const [year, month, day] = datetime.split('T')[0].split('-').map(Number);

  return `${months[month - 1]} ${day ? day : datetime.split('T')[0].split(' ')[0][2]}, ${year}`;
};

export default convertToDate;
