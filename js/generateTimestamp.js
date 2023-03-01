const addPadding = date => {
  return date < 10 ? `0${date}` : date.toString();
};

const generateTimestamp = () => {
  const d = new Date();

  // Date
  const year = d.getFullYear();
  const month = addPadding(d.getMonth() + 1);
  const day = addPadding(d.getDate());

  // Time
  const hour = addPadding(d.getHours());
  const minutes = addPadding(d.getMinutes());
  const seconds = addPadding(d.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};
