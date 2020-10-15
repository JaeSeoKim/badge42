export default (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const Difference_In_Time = endDate.getTime() - startDate.getTime();

  return Math.floor(Difference_In_Time / (1000 * 3600 * 24));
};
