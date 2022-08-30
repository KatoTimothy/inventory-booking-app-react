export const shiftDate = (date, daysToShift) => {
  const clone = new Date(date.getTime());
  clone.setDate(clone.getDate() + daysToShift);
  return clone;
};

export const getWeek = (forDate, daysOffset = 0) => {
  const date = shiftDate(forDate, daysOffset);
  const day = date.getDay();

  return {
    date,
    start: shiftDate(date, -day),
    end: shiftDate(date, 6 - day),
  };
};
