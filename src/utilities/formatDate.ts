export const formatDate = (date: string | null | undefined) => {
  if (date) {
    const d = new Date(date);
    return d.toLocaleDateString("en-gb", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return "TBC";
};
