export const stringToDate = (string: string | null | undefined) => {
  if (string) {
    return +new Date(string);
  }
  
  return 0;
};
