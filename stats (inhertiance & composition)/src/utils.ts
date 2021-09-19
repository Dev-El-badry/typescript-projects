export const dataStringToDate = (dateString: string) => {
  const spitDateString = dateString.split('/').map(d => parseInt(d));
  return new Date(spitDateString[2], spitDateString[1] - 1, spitDateString[0]);
};