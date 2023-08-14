export const toCommaSeperatedNumber = (data: string | number | undefined) => {
  if (data) {
    return `${data.toLocaleString()}`;
  }

  return null;
};
