export const formatDate = (date: string | undefined) => {
  const d = date ? new Date(date) : null;
  return d?.toLocaleDateString("en-gb", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
