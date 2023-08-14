export const toDollars = (string: string | number | undefined) => {
  if (string) {
    return `$${string.toLocaleString()}`;
  }

  return null;
};
