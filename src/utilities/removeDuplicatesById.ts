export const removeDuplicatesById = <T extends { id: number }>(data: T[]) => {
  const ids = data?.map((item) => item.id);
  const filtered = data?.filter(({ id }, i) => !ids?.includes(id, i + 1));
  return filtered;
};
