export const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-gb", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
